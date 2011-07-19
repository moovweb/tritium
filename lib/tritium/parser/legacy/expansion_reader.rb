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
    
    # Since its the inner-block that gets children added to it... this wont work in macros
    def match(what, one_matcher = nil, &block)
      @last_matcher = add_cmd("match", what) do
        if one_matcher
          with(one_matcher, &block)
        else
          block.call
        end
      end
    end
    
    # Since htis is inline aka me(src: asset()) the old fella's dont like the expanded version
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
      var("debug_depth") {
        set(@stack.size + 1)
      }
      var("debug"){ set(name) }
      block.call if block
      var("debug") { set("") }
    end
    
    def inner(text = nil, &block)
      if text
        add_cmd("inner") do
          set(text)
          block.call if block
        end
      else
        add_cmd("inner", &block)
      end
    end
  end
end
