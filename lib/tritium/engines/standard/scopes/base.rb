require_relative '../../../extensions/matcher'
module Tritium
  module Engines
    class Standard < Base
      module BaseFunctions
        def base_invocation(ins, ctx, args, kwds)
          case ins.name
          when :var
            value = @env[args.first] || ""
            value_ctx = Context[ins, value]
            run_children(ins, value_ctx)
            @env[args.first] = value_ctx.value
            return value_ctx.value
          when :match
            @matchers.push(args.first)
            run_children(ins, ctx)
            @matchers.pop
          when :not
            regex = Regexp.new(args.first)
            regex.opposite = true
            return regex
          when :with
            matcher = @matchers.last
            with = args.first
            with = Regexp.new(with) unless with.is_a?(Regexp)
            if with.match?(matcher)
              run_children(ins, ctx)
              return false # signal to stop!
            end
          when :dump
            return ctx.value.to_s
          when :debug
            # Ignore this
            run_children(ins, ctx)
          else
            throw "Method #{ins.name} not implemented in Base scope"
          end
        end
      end
    end
  end
end