require_relative 'reader'
require_relative '../extensions/regexp'

module Tritium::Parser
  class ExpansionReader < Reader
    
    def set_position(set_to, &block)
      # Set the position value the standard way and move on
      eval("var('position', #{set_to.inspect})")

      cmd('position', &block)
    end
    def bottom(&block); set_position("bottom", &block); end
    def top(&block);    set_position("top",    &block); end
    def after(&block);  set_position("after",  &block); end
    def before(&block); set_position("before", &block); end
    
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
          cmd("select", path[0..-2]) {
            attribute(attr[1..-1], &block)
          }
        end
      elsif txt = selector[text_rgx] then
        path = selector.sub(text_rgx, "")
        if path.empty? or path == "./" then
          text(&block)
        else
          cmd("select", path[0..-2]) {
            text(&block)
          }
        end
      elsif htm = selector[html_rgx] then
        path = selector.sub(html_rgx, "")
        if path.empty? or path == "./" then
          html(&block)
        else
          cmd("select", path[0..-2]) {
            html(&block)
          }
        end
      else
        cmd("select", selector, &block)
      end
    end
    
    def value(set_value = nil, &block)
      if set_value
         cmd('value', &(Proc.new { |this|
           set(set_value)
           block.call(this) if block
         }))
      else
        cmd('value', &block)
      end
    end
    
    def attribute(name, set_value = nil, &block)
      if set_value
        if !set_value.is_a?(ReaderInstruction)
          set_value = set_value.to_s
        end
        cmd('attribute', name) do
          value(set_value)
          block.call(this) if block
        end
      else
        cmd('attribute', *[name], &block)
      end
    end
    
    def var(name, set_to = nil, &block)
      if set_to
        cmd("var", name) do |this|
          this.cmd('set', set_to)
          block.call if block
        end
      else
        cmd("var", name, &block)
      end
    end
    
    def not_matcher(matcher)
      r = Regexp.new(matcher)
      r.opposite = true
      return r
    end
    
    def match(what, one_matcher = nil, &block)
      @last_matcher = cmd("match", what) do
        if one_matcher
          with(one_matcher, &block)
        else
          block.call
        end
      end
    end
    
    def with(matcher, &block)
      matcher = Regexp.new(matcher) unless matcher.is_a?(Regexp)
      cmd("with", matcher, &block)
    end
    
    def else_do(&block)
      with(".*", &block)
    end
    
    def html(value = nil, &block)
      cmd("html") {
        set(value) if value
        block.call if block
      }
    end
    
    def text(value = nil, &block)
      cmd("text") {
        set(value) if value
        block.call if block
      }
    end
    
    def insert_tag(tag_name, contents = nil, attributes = {}, &block)
      if contents.is_a? Hash
        attributes = contents
        contents = nil
      end
      
      cmd("insert_tag", tag_name) do
        if contents
          html do
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
      html() {
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
          with(not_matcher("(http:|)\/\/")) {
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
      cmd("replace", Regexp.new(matcher)) do
        if value
          set(value)
        end
        block.call if block
      end
    end
    
    
    def add_class(class_name, &block)
      cmd("attribute", "class") {
        value() {
          append(" ")
          append(class_name)
        }
        block.call if block
      }
    end

    def name(set_name = nil, &block)
      if set_name
        cmd("name") do 
          set(set_name)
          block.call if block
        end
      else
        cmd("name", &block)
      end
    end
  end
end
