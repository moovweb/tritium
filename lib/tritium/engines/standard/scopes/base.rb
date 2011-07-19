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
          when :concat
            return args.join("")
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
          when :fetch
            # We need to find a parent who has a Node!
            selector = args.first
            
            while !ctx.value.respond_to?("xpath") || ctx.value.is_a?(Nokogiri::XML::Attr) do
              ctx = @stack[@stack.index(ctx) - 1]
              if ctx.nil?
                throw "Only use fetch nested inside of a Node scope"
              end
            end
            node = ctx.value
  
            result = node.xpath(selector.to_s).first
            if result.is_a?(Nokogiri::XML::Attr)
              result = result.value
            end
            fetch_ctx = Context[ins, result.to_s]
            run_children(ins, fetch_ctx)
            return fetch_ctx.value
          when :export
            @export_vars << [args[0], args[1]]
          when :dump
            value = ctx.value.to_s
            @logger.info(value)
            return value
          when :log
            text = Context[ins, args.join(" ")]
            run_children(ins, text)
            @logger.info(text.value)
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