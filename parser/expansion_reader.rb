require_relative 'reader'

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
        if !set_value.is_a?(Instruction)
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
    
    def html(set_to = nil, &block)
      if set_to
        cmd('html') do |this|
          this.cmd("set", set_to);
          block.call(this) if block
        end
      else
        cmd('html', &block)
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
    
    def move_to(selector, position_val = 'bottom', &block)
      eval("var('position', #{position_val.inspect})")
      cmd('move_to', *[selector], &block)
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
          attribute(name.to_s, val.to_s)
        end
        block.call if block
      end
    end
    
    def replace(matcher, value = nil, &block)
      cmd("replace", Regexp.new(matcher)) do
        if value
          set(value)
        end
        block.call if block
      end
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