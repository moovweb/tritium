
# set("hi")

module Tritium
  module Engines
    class Standard < Base
      class Run
        include Tritium::Parser::Instructions

        def initialize(options = {})
          @env = options["env"] || options[:env] || {}
        end
        
        def process(ins, ctx)
          if ins.is_a?(Invocation)
            # Collect and evaluate the pos_args
            pos_args, kwd_args = process_args(ins, ctx)
            if ctx.is_a?(String)
              ctx = text_invocation(ins, ctx, pos_args, kwd_args)
            end
          end
          
          if ins.is_a?(Literal)
            ctx = ins.value
          end
          # we are a block of somesort!
          if ins.respond_to?("statements")
            ins.statements.each do |statement|
              ctx = process(statement, ctx)
            end
          end
          return ctx
        end
        
        def process_args(ins, ctx)
          pos_args = ins.pos_args.collect do |arg|
            if arg.is_a?(Instruction)
              process(arg, ctx)
            else
              arg
            end
          end
          
          kwd_args = {}
          ins.kwd_args.each do |key, value|
            if value.is_a?(Instruction)
              value = process(arg, ctx)
            end
            kwd_args[key] = value
          end
          [pos_args, kwd_args]
        end
        
        def text_invocation(ins, ctx, args, kwds)
          case ins.name
          when :set
            return args.first
          end
        end
      end
    end
  end
end