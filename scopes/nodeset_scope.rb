require_relative '../scope'
require_relative 'nodeset_modules/action_methods'
require_relative 'nodeset_modules/selection_methods'
require_relative 'nodeset_modules/positioning_methods'

module Tritium
  module Scope
    class Nodeset < Base
      def initialize(nodeset, root = nil, parent = nil)
        @nodeset = nodeset
        @root = root || nodeset
        super
      end
      
      include NodesetModules::SelectionMethods
      include NodesetModules::ActionMethods
      include NodesetModules::PositioningMethods
    end
  end
end