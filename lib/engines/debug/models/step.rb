module Larry
  class Step < Sequel::Model
    many_to_one :instruction
    many_to_one :debug_session
    one_to_many :children, :key => "parent_id", :class => self
    many_to_one :parent, :key => "parent_id", :class => self
    
    def children_groups
      Step.filter(:parent_id => self.id).group_by(:group_id).all
    end
  end
end