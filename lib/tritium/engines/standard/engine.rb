require 'nokogiri'
require 'logger'
require_relative '../base'
require_relative 'context'
require_relative 'run'

module Tritium
  module Engines
    class Standard < Base
      
      def run(input, options = {})
        if input.encoding == Encoding::ASCII_8BIT
          input.force_encoding(guess_encoding(input))
        end

        run = Run.new(@logger, options)
        ctx = Context[@root_instruction, input.dup]
        run.process(@root_instruction, ctx)
        [ctx.value, run.export_vars]
      end

      def guess_encoding(input)
        s = Time.now
        guess = Nokogiri::HTML.parse(input).encoding
        x = Nokogiri::HTML.parse(input).to_html
        raise Exception.new("Could not determine encoding") unless guess
        @logger.warn("Spent #{(Time.now - s)*1000}ms figuring out the encoding: '#{guess}'")
        guess
      end

    end
  end
end
