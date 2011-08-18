require 'nokogiri'
require 'logger'
require_relative '../parser/parser'
require_relative '../extensions/string'

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
        if script_string.is_a?(Hash)
          options = script_string
        else
          @script_string = script_string
        end
      
        @script_path   = options[:path]        || options["path"]        || ""
        @xml_parser    = options[:parse_as]    || options["parse_as"]    || "xml"
        @logger        = options[:logger]      || options["logger"]      || Logger.new(STDOUT)
        @script_name   = options[:script_name] || options["script_name"] || "MAIN"
        
        # Load the script if we don't have it loaded already
        if @script_string.nil?
          @script_string = File.read(File.join(@script_path, @script_name))
        end
        
        @script_path = File.expand_path(@script_path)
        
        @root_instruction = parse!
      end
      
      def parse!
        build_parser.parse
      end
      
      def to_script
        @root_instruction.to_s
      end
      
      def build_parser
        Tritium::Parser::Parser.new(@script_string, 
                                    :path     => @script_path, 
                                    :logger   => @logger,
                                    :filename => @script_name)
      end
      
      def check_syntax
        build_parser.parse
      end
    end
  end
end