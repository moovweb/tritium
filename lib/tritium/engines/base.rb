require 'nokogiri'
require 'logger'
require_relative '../parser/parser'

class Nokogiri::HTML::DocumentFragment
  alias :to_html_fragment :to_html
end
module Tritium
  module Engines
    
    def self.xml_parsers
      {"xml" =>  Nokogiri::XML, "html" =>  Nokogiri::HTML, "html_fragment" => Nokogiri::HTML::DocumentFragment}
    end
    
    class Base
      attr :root_instruction
      
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
        @xml_parser    = options[:parse_as]    || options["parse_as"]    || "xml"
        @logger        = options[:logger]      || options["logger"]      || Logger.new(STDOUT)
        @script_name   = options[:script_name] || options["script_name"] || "main.ts"
        
        # Load the script if we don't have it loaded already
        if @script_string.nil?
          @script_string = File.read(File.join(@script_path, @script_name))
        end
        
        @script_path = File.expand_path(@script_path)
        @compiled_script = File.join(@script_path, "#{@script_name}.bin")

        if !options[:compile] && File.exists?(@compiled_script)
          #@logger.debug("Loading compiled script...")
          @root_instruction = Marshal.load(File.read(@compiled_script))
        else
          #@logger.debug("Compiling script...")
          @root_instruction = parse!
        end

        if options[:compile]
          File.open(@compiled_script, 'w') {|f| f.write(Marshal.dump(@root_instruction)) }
        end
        @root_instruction
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
