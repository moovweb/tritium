require 'nokogiri'
require 'logger'
require_relative '../base'
require_relative '../../parser/legacy/reader'
require_relative '../../parser/legacy/expansion_reader'
require_relative '../../parser/legacy/preprocess'

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
      
      def processed_script
        script_to_run = @script_string.clone
        if ENV["PARSER"]
          script_to_run = Parser::Parser.new(@script_string, filename: @script_name, path: @script_path).parse.to_s
          if ENV["SCRIPT"]
            puts script_to_run
          end
        end
        processed = Parser::Preprocess.run(script_to_run, @script_path, @script_name)
      end
      
      def to_script
        @root_instruction.to_script
      end
    end
  end
end
