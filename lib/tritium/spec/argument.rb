require_relative 'base'

module Tritium
  class Spec
    class Argument < Base

      def self.defaults
        {:hide => false,
         :returns => true,
         :default => nil,
         :deprecated => false, #string otherwise
         :alias => nil,        #string otherwise
         :doc => "",
         :positional => false }
      end
    end
  end
end