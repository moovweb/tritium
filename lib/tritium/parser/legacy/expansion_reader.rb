require_relative 'reader'
require_relative '../../extensions/matcher'

module Tritium::Parser
  class ExpansionReader < Reader
    
    # If we are passed an ./@attribute selector, then automatically
    # open the attribute block
    # If we are passed a text() selector, then automatically open html()
    def select(selector, &block)
      # not truly comprehensive, but good enough
      attr_rgx = /@[a-zA-Z_:][-\w:.]*\z/
      text_rgx = /text\s*\(\s*\)\z/
      html_rgx = /html\s*\(\s*\)\z/

      # This will behave badly if @attr, text(), or html() is preceded by '//'
      # But who's gonna' do that?
      if attr = selector[attr_rgx] then
        path = selector.sub(attr_rgx, "")
        if path.empty? or path == "./" then
          attribute(attr[1..-1], &block)
        else
          add_cmd("select", path[0..-2]) {
            attribute(attr[1..-1], &block)
          }
        end
      elsif txt = selector[text_rgx] then
        path = selector.sub(text_rgx, "")
        if path.empty? or path == "./" then
          text(&block)
        else
          add_cmd("select", path[0..-2]) {
            text(&block)
          }
        end
      elsif htm = selector[html_rgx] then
        path = selector.sub(html_rgx, "")
        if path.empty? or path == "./" then
          inner(&block)
        else
          add_cmd("select", path[0..-2]) {
            inner(&block)
          }
        end
      else
        add_cmd("select", selector, &block)
      end
    end
    
    def value(set_value = nil, &block)
      if set_value
         add_cmd('value', &(Proc.new { |this|
           set(set_value)
           block.call(this) if block
         }))
      else
        add_cmd('value', &block)
      end
    end
    
    def attribute(name, set_value = nil, &block)
      if set_value
        if !set_value.is_a?(ReaderInstruction)
          set_value = set_value.to_s
        end
        add_cmd('attribute', name) do
          value(set_value)
          block.call(this) if block
        end
      else
        add_cmd('attribute', *[name], &block)
      end
    end
    
    def attributes(options = {})
      options.each do |key, value|
        attribute(key.to_s, value)
      end
    end
    
    def var(name, set_to = nil, &block)
      if set_to
        add_cmd("var", name) do
          add_cmd('set', set_to)
          block.call if block
        end
      else
        add_cmd("var", name, &block)
      end
    end
    
    def not_matcher(matcher)
      matcher = "#{matcher}" unless matcher.is_a?(Regexp) || matcher.is_a?(String)
      matcher.opposite = true
      return matcher
    end
    
    def match(what, one_matcher = nil, &block)
      @last_matcher = add_cmd("match", what) do
        if one_matcher
          with(one_matcher, &block)
        else
          block.call
        end
      end
    end
    
    def with(matcher, &block)
      matcher = "#{matcher}" unless matcher.is_a?(Regexp) || matcher.is_a?(String)
      add_cmd("with", matcher, &block)
    end
    
    def else_do(&block)
      with(/.*/, &block)
    end
    
    def html(value = nil, &block)
      if @stack.last.opens == "Text"
        add_cmd("html", &block)
      else
        add_cmd("inner") {
          set(value) if value
          block.call if block
        }
      end
    end
    
    def text(value = nil, &block)
      add_cmd("text") {
        set(value) if value
        block.call if block
      }
    end
    
    def insert_tag(tag_name, contents = nil, attributes = {}, &block)
      if contents.is_a? Hash
        attributes = contents
        contents = nil
      end
      
      add_cmd("insert_tag", tag_name) do
        if contents
          inner do
            set(contents)
          end
        end
        attributes.each do |name, val|
          if name.is_a? Symbol
            name = name.to_s
          end
          attribute(name, val)
        end
        block.call if block
      end
    end
    
    def insert(*args, &block)
      if args.size > 1 || (args.first.is_a?(String) && !args.first.include?("<"))
        insert_tag(*args, &block)
      else
        inject(*args, &block)
      end
    end
    
    def read(filename)
      File.read(File.join(@path, filename)).to_s
    end
    
    def wrap(name, attributes = {}, &block)
      before {
        insert_tag(name, attributes)
      }
      move_to("preceding-sibling::#{name}[1]", "top") do
        block.call if block
      end
    end
    
    def inner_wrap(name, attributes = {}, &block)
      if name.is_a?(ReaderInstruction)
        throw "Cannot use dynamic tag names with inner_wrap(). See documentation for details."
      end

      attribute_list = attributes.collect do |k, v|
        # We are statically building the tag that we will wrap the contents with, therefore we can't support
        # dynamic attributes or tag names
        if k.is_a?(ReaderInstruction) || v.is_a?(ReaderInstruction)
          throw "Cannot use dynamic attributes with inner_wrap(). See documentation for details."
        end
        
        "#{k.to_s}=#{v.to_s.inspect}"
      end
      inner() {
        prepend("<#{name} #{attribute_list.join(' ')}>")
        append("</#{name}>")
      }
      if block
        select("./*[1]") {
          block.call
        }
      end
    end
    
    def asset(name, type, &block)
      var("tmp") {
        set(name)
        prepend(var(type.to_s + "_asset_location"))

        # If we don't start with http, then add on the asset host
        # Really though, this should be done by the server before we ever get here
        match(var(type.to_s + "_asset_location")) {
          with(not_matcher(/(http:|)\/\//)) {
            prepend(var("asset_host"))
          }
        }
        block.call if block
      }
    end
    
    def debug(name = "untitled", &block)
      var("debug_depth", @stack.size + 1)
      var("debug", name)
      block.call if block
      var("debug", "")
    end
    
    def replace(matcher, value = nil, &block)
      add_cmd("replace", Regexp.new(matcher)) do
        if value
          set(value)
        end
        block.call if block
      end
    end
    
    %w(top bottom before after).each do |position|
      %w(insert inject).each do |method|
        eval("def #{method}_#{position}(*args, &block); var('position', #{position.inspect}); insert(*args, &block); end")
      end
      #eval("def insert_#{position}(*args, &block); insert_tag_#{position}(*args, &block); end")
    end

    def name(set_name = nil, &block)
      if set_name
        add_cmd("name") do 
          set(set_name)
          block.call if block
        end
      else
        add_cmd("name", &block)
      end
    end
    
    def insert_javascript(script, &block)
      insert_tag("script", type: "text/javascript") do
        add_cmd("inject", cdata(concat("//<![CDATA[\n", script, "\\n//]]>")))
        block.call if block
      end
    end
  end
end
