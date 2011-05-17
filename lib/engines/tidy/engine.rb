require "tidy_ffi"


module Tritium
  module Engines
    require_relative "../debug/engine"
    class Tidy < Engines::Debug
      TidyFFI::Tidy.default_options.char_encoding = 'utf8' #encoding for both input and output
      TidyFFI::Tidy.default_options.show_warnings = 0
      TidyFFI::Tidy.default_options.show_errors = 0
      TidyFFI::Tidy.default_options.force_output = 1
      TidyFFI::Tidy.default_options.output_xhtml = 1
      TidyFFI::Tidy.default_options.input_xml = 0
      #TidyFFI::Tidy.default_options.indent = 1

      #Tidy, as it is now, is insufficient; we have enhance it to meet our needs
      #We must set input_xml = 0, so Tidy does not mess up the inline javascripts (mainly the chars that should have been escaped, like "<")
      #However, in case that a http response is not a complete HTML page, e.g. some ajax responses miss <html>, <head>, and <body> tags,
      #Tidy adds them, which cause problems.
      #To get around it, we add these tags before cleaning, and remove them after.
      def run(xhtml_file, options={})
        env = options["env"] || options[:env] || {}
        content_type_key = "content_type"
        content_type_key = "Content_Type" if env.has_key?("Content_Type")
        content_type_key = "Content_type" if env.has_key?("Content_type")
        content_type = env[content_type_key] or nil
        add_body = false
        add_head = false
        add_html = false
        if content_type != nil and content_type.start_with?("text/html")
          start_t = Time.now.to_f
          orig_xhtml_file = xhtml_file
          if ! xhtml_file.include?("<body")
            xhtml = "<body>%s</body>" % xhtml
            add_body = true
          end
          if ! xhtml_file.include?("<head")
            xhtml= "<head><title></title><head>%s" % xhtml
            add_head = true
          end
          if ! xhtml_file.include?("<html")
            xhtml = "<html>%s</html>" % xhtml
            add_html = true
          end
          begin
            xhtml_file = TidyFFI::Tidy.new(orig_xhtml_file).clean
          rescue Exception => msg
            @logger.info "revert clean due to #{msg}"
            xhtml_file = orig_xhtml_file
          end
          if add_html
            xhtml_file.gsub!(/<\!DOCTYPE .*\.dtd">/m, "")
            xhtml_file.gsub!(/<html.*>/, "")
            xhtml_file.gsub!(/<\/html>/, "")
          end
          if add_head
            xhtml_file.gsub!(/<head>.*<\/head>/m, "")
          end
          if add_body
            xhtml_file.gsub!(/<body>/, "")
            xhtml_file.gsub!(/<\/body>/, "")
            #xhtml_file.gsub!(/<br.*\/>/, "") #some <br> may be added; but this may be a problem if it inteneds to be in JSON format
          end
          #xhtml_file.gsub!(/\n/, "") #this is needed when json content is received as html; we should ask our customers to set the content-type header correctly
          xhtml_file.strip!
          end_t = Time.now.to_f
          @logger.info "tidy clean took #{end_t-start_t} sec"
        end
        super(xhtml_file, options)
      end
    end
  end
end
