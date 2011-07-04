module Larry
  class ReaderInstruction < Sequel::Model
    one_to_many :steps
    one_to_many :children, :key => "parent_id", :class => self
    many_to_one :parent, :key => "parent_id", :class => self
    
    def to_s
      "#{self.name}(#{args_list.join(', ')})"
    end
    
    def args_list
      require 'json'
      JSON::parse(args).collect do |arg|
        split = arg.to_s.split("_")
        if split[0] == "INSTRUCTION"
          arg_iid = split[1..-1].join("_")
          ReaderInstruction.filter(:iid => arg_iid).first
        else
          arg.inspect
        end
      end
    end
  end
end