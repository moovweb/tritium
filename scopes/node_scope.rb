require_relative '../scope'
require_relative 'node_modules/action_methods'
require_relative 'node_modules/selection_methods'
require_relative 'node_modules/positioning_methods'

module Tritium
  module Scope
    class Node < Base
      attr :node, false
      attr :root, false
      
      # @private
      def initialize(node, root = nil, parent = nil)
        @node = node
        @root = root || node
        super
      end
      
      include NodeModules::SelectionMethods
      include NodeModules::ActionMethods
      include NodeModules::PositioningMethods
    end
  end
end