require 'nokogiri'
require 'logger'
require_relative '../base'
require_relative 'context'
require_relative 'run'

module Tritium
  module Engine
    class Standard < Base
      
      def run(input, options = {})
        input = input.dup
        run = Run.new(@logger, options)
        ctx = Context[@root_instruction, input]
        run.process(@root_instruction, ctx)
        [ctx.value, run.export_vars]
      end

    end
  end
end
