require_relative 'base'

module Tritium
  class Spec
    class Argument < Base

      def self.defaults
        {:arguments => {},
         :hide => false,
         :returns => true,
         :deprecated => false, #string otherwise
         :alias => nil,        #string otherwise
         :doc => "",
         :positional => false }
      end
    end
  end
end