require 'nokogiri'
require 'logger'
require_relative '../base'
require_relative 'context'
require_relative 'run'

module Tritium
  module Engines
    class Standard < Base
      
      # TODO: consider having a project configuration that specifies
      # which encodings should be guessed. It is possible for an encoding
      # to be 'valid' but wrong.
      GUESS_ENCODINGS = [Encoding::UTF_8, Encoding::ISO_8859_1]
      # NOTE: The reason that 'ascii' is invalid is because tritium might
      # add UTF-8 characters to the page, and we wouldn't be able to
      # convert the page back to ASCII
      INVALID_ENCODINGS = [Encoding::ASCII_8BIT, Encoding::ASCII]


      def run(input, options = {})
        input = input.dup
        if INVALID_ENCODINGS.include?(input.encoding) || !input.valid_encoding?
          fix_encoding(input)
        end

        run = Run.new(@logger, options)
        ctx = Context[@root_instruction, input]
        run.process(@root_instruction, ctx)
        [ctx.value, run.export_vars]
      end

      #
      # This is last-resort encoding detection:
      # Guess a few encodings and see if the result is valid
      #
      def fix_encoding(input)
        encoding = nil
        GUESS_ENCODINGS.each do |e|
          input.force_encoding(e)
          if input.valid_encoding?
            encoding = e
            break
          end
        end

        raise Exception.new("Failed to guess an encoding") unless encoding
        @logger.warn("Missing or invalid encoding guessed as '#{encoding}'")
        return nil
      end

    end
  end
end
