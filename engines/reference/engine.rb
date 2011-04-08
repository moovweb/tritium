
module Tritium
  module Engines
    require_relative '../base'

    class Reference < Engines::Base
      require_relative 'scope'
      
      def run(xhtml_file, options = {})
        # Setup options
        env = options["env"] || options[:env] || {}
        start = Time.now

        root_scope = Scope::Text.new(xhtml_file)
        root_scope.logger = @logger
        root_scope.env.merge! env
        root_scope.instance_eval(processed_script)

        took = Time.now - start
        @logger.info("Script took #{took} sec to process")
        root_scope.text
      rescue StandardError => e
        e.message.gsub!(/$/, " on script line #{@_line.to_s}")
        raise e
      end
    end
  end
end