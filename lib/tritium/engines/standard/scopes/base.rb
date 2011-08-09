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
            if args.size == 2
              matcher = args.first
              with = args.last
              with = Regexp.new(with) unless with.is_a?(Regexp)
              if with.match?(matcher)
                run_children(ins, ctx)
              end
            else
              @matchers.push(args.first)
              run_children(ins, ctx)
              @matchers.pop
            end
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
          when :index
            ctxorgin = ctx
            begin
              ctx = @stack[@stack.index(ctx) - 1]
              if ctx.nil? or ctx == ctxorgin
                throw "Only use index nested inside of a Select"
              end
            end while (ctx.index == nil)
            return ctx.index.to_s
          when :fetch
            # We need to find a parent who has a Node!
            selector = args.first
            ctxorgin = ctx
            while !ctx.value.respond_to?("xpath") || ctx.value.is_a?(Nokogiri::XML::Attr) do
              ctx = @stack[@stack.index(ctx) - 1]
              if ctx.nil? or ctx == ctxorgin
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
          when :asset
            file_name, type = args
            location = @env["#{type}_asset_location"]
            if location.nil?
              @logger.warn("No env variable #{type}_asset_location found!")
            elsif (location[0..6] == "http://") || (location[0..1] == "//")
              return File.join(location.clone, file_name)
            else
              return File.join(@env["asset_host"].clone, location.clone, file_name)
            end
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