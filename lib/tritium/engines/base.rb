require 'nokogiri'
require 'logger'
require_relative '../parser/parser'

class Nokogiri::HTML::DocumentFragment
  alias :to_html_fragment :to_html
end
module Tritium
  module Engines
    
    def self.xml_parsers
      {"xml" =>  Nokogiri::XML, "html" =>  Nokogiri::HTML, "xhtml" => Nokogiri::XML, "html_fragment" => Nokogiri::HTML::DocumentFragment}
    end
    
    class Base
      def initialize(script_file, options = {})
        xml_parser_name = options["parse_as"] || options[:parse_as]
        @xml_parser = xml_parser_name || "xml"
        
        @script_file
        @script_path = options["path"] || options[:path] || File.dirname(__FILE__)
        @script_string = script_string
       
      end
    end
  end
end