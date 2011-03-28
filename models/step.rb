module Larry
  class Step < Sequel::Model
    many_to_one :instruction
    one_to_many :children, :key => "parent_id", :class => self
    many_to_one :parent, :key => "parent_id", :class => self
  end
end