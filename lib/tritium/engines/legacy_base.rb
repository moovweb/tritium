require 'nokogiri'
require 'logger'
require_relative 'base'
require_relative '../parser/legacy/reader'
require_relative '../parser/legacy/expansion_reader'
require_relative '../parser/legacy/preprocess'

class Nokogiri::HTML::DocumentFragment
  alias :to_html_fragment :to_html
end
module Tritium
  module Engines
    class LegacyBase < Base
      
      def parse!
        reader_klass.new(@logger)._read(processed_script, @script_path)
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
