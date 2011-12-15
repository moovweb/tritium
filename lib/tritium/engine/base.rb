require 'logger'
require_relative '../parser/parser'

class Nokogiri::HTML::DocumentFragment
  alias :to_html_fragment :to_html
end
module Tritium
  module Engine
    
    def self.xml_parsers
      {"xml" =>  Nokogiri::XML, "html" =>  Nokogiri::HTML, "html_fragment" => Nokogiri::HTML::DocumentFragment}
    end
    
    class Base
      attr :root_instruction
      attr :script_name
      
      def self.name
        to_s.split("::").last
      end
      
      def initialize(script_string, options = {})
        if script_string.is_a?(Hash)
          options = script_string
        else
          @script_string = script_string
        end
      
        @script_path   = options[:path]        || options["path"]        || ""
        @logger        = options[:logger]      || options["logger"]      || Logger.new(STDOUT)
        @script_name   = options[:script_name] || options["script_name"] || "main.ts"
        @script_location = File.join(@script_path, @script_name)
        @script_path = File.expand_path(@script_path)
        
        # Load the script if we don't have it loaded already
        if @script_string.nil?
          @script_string = File.read(@script_location)
        end
        
        @root_instruction = parse!
      end
      
      def parse!
        root_instruction = build_parser.parse
        root_instruction.each do |instruction|
          instruction.valid?
        end
        root_instruction
      end
      
      def to_script(depth = 0)
        @root_instruction.to_script(depth)
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
      
      # Closing callback if your engine needs to be notified when its done
      def close
      end
    end
  end
end
