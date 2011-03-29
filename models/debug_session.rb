module Larry
  class DebugSession < Sequel::Model
    one_to_many :steps
  end
end