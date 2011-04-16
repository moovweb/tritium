require "tidy_ffi"
require_relative "../debug/engine"

module Tritium
  module Engines
    class Tidy < Debug
      TidyFFI::Tidy.default_options.char_encoding = 'utf8'
      TidyFFI::Tidy.default_options.show_warnings = 1
      TidyFFI::Tidy.default_options.show_errors = 1
      TidyFFI::Tidy.default_options.force_output = 1
      TidyFFI::Tidy.default_options.output_xhtml = 1

      def run(xhtml_file, options={})
        env = options["env"] || options[:env] || {}
        content_type_key = "content_type"
        content_type_key = "Content_Type" if env.has_key?("Content_Type")
        content_type_key = "Content_type" if env.has_key?("Content_type")
        content_type = env[content_type_key] or nil
        #x_requested_with = env["X-Requested-With"] or nil
        ### TODO we need to check if the request has "X-Requested-With" in the header
        if content_type.start_with?("text/html") #and x_requested_with != "XMLHttpRequest"
          start_t = Time.now.to_f
          orig_xhtml_file = xhtml_file
          xhtml_file = TidyFFI::Tidy.new(orig_xhtml_file).clean
          end_t = Time.now.to_f
          puts "tidy clean took", (end_t-start_t), "milisec"
        end
        super(xhtml_file, options)
      end
    end
  end
end
