require_relative 'reader'
require_relative '../../extensions/matcher'

module Tritium::Parser
  class ExpansionReader < Reader
    
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
