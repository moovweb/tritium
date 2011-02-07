require_relative 'preprocess'

module Tritium
  EXPECTED_ENVIRONMENT_VARIABLES = {
    "PROXY_DOMAIN" => "Set in the config file, this should be something like '.getmoov1.com'",
    "SOURCE_DOMAIN" => "Domain of the site we are modifying",
    "REWRITE_LINK_MATCHER" => "A regular expression used to match links that need to be rewritten",
    "REWRITE_LINK_TO" => "Related to REWRITE_LINK_MATCHER, as this is the format it should be written into"
  }
  
  class Engine
    PARSERS = {"xml" =>  Nokogiri::XML, "html" =>  Nokogiri::HTML}
    
    def initialize(script_string, parser_name = nil)
      @script_string = Preprocess::run(script_string)
      @parser = PARSERS[parser_name || "xml"] || throw("Invalid parser")
    end

    def run(xhtml_file, options = {})
      # Setup options
      encoding = options["encoding"] || options[:encoding]
      env = options["env"] || options[:env] || {}

      doc = @parser.parse(xhtml_file, nil, encoding)
      
      root_scope = Scope::Nodeset.new(doc)
      root_scope.env.merge! env
      root_scope.instance_eval(@script_string)
      doc
    rescue StandardError => e
      e.message.gsub!(/$/, " on script line #{$line}")
      raise e
    end
    
   private

  end
end