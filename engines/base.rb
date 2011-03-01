require 'nokogiri'

module Tritium
  module Engines
    class Base
      XML_PARSERS = {"xml" =>  Nokogiri::XML, "html" =>  Nokogiri::HTML, "xhtml" => Nokogiri::XML}

      def initialize(script_string, options = {})
        xml_parser_name = options["xml_parser"] || options[:xml_parser]
        @script_path = options["path"] || options[:path] || File.dirname(__FILE__)
        @script_string = script_string
        @xml_parser = XML_PARSERS[xml_parser_name || "xml"] || throw("Invalid parser")
      end

    end
  end
end
