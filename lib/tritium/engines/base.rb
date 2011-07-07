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
      attr :root_instruction
      
      def initialize(script_string, options = {})
        @script_string = script_string
        @script_path   = options["path"]       || options[:path]         || ""
        @xml_parser    = options["parse_as"]   || options[:parse_as]     || "xml"
        @logger        = options["logger"]     || options[:logger]       || Logger.new(STDOUT)
        @script_name   = options[:script_name] || options["script_name"] || "MAIN"
        
        @root_instruction = parse!
      end
      
      def parse!
        Tritium::Parser::Parser.new(@script_string, 
                                    :path     => @script_path, 
                                    :logger   => @logger,
                                    :filename => @script_name)
      end
    end
  end
end