require_relative "../debug/engine"

module Tritium
  module Engines
    class Tidy < Debug

      def run(xhtml_file, options={})
        #TODO: run tidy on this first
        super(xhtml_file, options)
      end
    end
  end
end
