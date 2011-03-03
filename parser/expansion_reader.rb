require_relative 'reader'

module Tritium::Parser
  class ExpansionReader < Reader
    
    def set_position(set_to, &block)
      # Set the position value the standard way and move on
      eval("var('position', #{set_to.inspect})")

      method_missing('position', &block)
    end
    def bottom(&block); set_position("bottom", &block); end
    def top(&block);    set_position("top",    &block); end
    def after(&block);  set_position("after",  &block); end
    def before(&block); set_position("before", &block); end
    
    def value(set_value = nil, &block)
      if set_value
         method_missing('value', &(Proc.new { |this|
           set(set_value)
           block.call(this) if block
         }))
      else
        method_missing('value', &block)
      end
    end
    
    def attribute(name, set_value = nil, &block)
      if set_value
        method_missing('attribute', name) do
          value(set_value)
          block.call(this) if block
        end
      else
        method_missing('attribute', *[name], &block)
      end
    end
    
    def html(set_to = nil, &block)
      if set_to
        method_missing('html') do |this|
          this.method_missing("set", set_to);
          block.call(this) if block
        end
      else
        method_missing('html', &block)
      end
    end
    
    def var(name, set_to = nil, &block)
      if set_to
        method_missing("var", name) do |this|
          this.method_missing('set', set_to)
          block.call if block
        end
      else
        method_missing("var", name, &block)
      end
    end
    
    def move_to(selector, position_val = 'bottom', &block)
      eval("var('position', #{position_val.inspect})")
      method_missing('move_to', *[selector], &block)
    end

    def name(set_name = nil, &block)
      if set_name
        method_missing("name") do 
          set(set_name)
          block.call if block
        end
      else
        method_missing("name", &block)
      end
    end
  end
end