require 'nokogiri'
require 'logger'
require_relative '../parser/reader'
require_relative '../parser/expansion_reader'
require_relative '../parser/preprocess'

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
        xml_parser_name = options["parse_as"] || options[:parse_as]
        @script_path = options["path"] || options[:path] || File.dirname(__FILE__)
        @script_string = script_string
        @xml_parser = xml_parser_name || "xml"
        @logger = options[:logger] || options["logger"] || Logger.new(STDOUT)
        @script_name = options[:script_name] || options["script_name"] || "MAIN"
        @root_instruction = reader_klass.new(@logger).read(processed_script)
      end
      
      def reader_klass
        Tritium::Parser::ExpansionReader
      end
      
      def check_syntax
        Parser::Parser.new(@script_string, filename: @script_name, path: @script_path).parse
      end
      
      def processed_script
        #parsed_output = Parser::Parser.new(@script_string, filename: @script_name, path: @script_path).parse.to_s
        #puts parsed_output
        processed = Parser::Preprocess.run(@script_string, @script_path, @script_name)
      end
      
      def to_script
        @root_instruction.to_script
      end
    end
  end
end
