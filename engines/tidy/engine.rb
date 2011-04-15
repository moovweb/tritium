require "tidy_ffi"
require_relative "../debug/engine"

module Tritium
  module Engines
    class Tidy < Debug
      TidyFFI::Tidy.default_options.char_encoding = 'utf8'
      TidyFFI::Tidy.default_options.show_warnings = 1
      TidyFFI::Tidy.default_options.show_errors = 1

      def run(xhtml_file, options={})
        env = options["env"] || options[:env] || {}
        content_type_key = "content_type"
        content_type_key = "Content_Type" if env.has_key?("Content_Type")
        content_type_key = "Content_type" if env.has_key?("Content_type")
        content_type = env[content_type_key] or nil
        if content_type.start_with?("text/html")
          orig_xhtml_file = xhtml_file
          xhtml_file = TidyFFI::Tidy.new(orig_xhtml_file).clean
        end
        super(xhtml_file, options)
      end
    end
  end
end
