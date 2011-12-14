module Tritium
  module Serializer
    require_relative 'instruction.pb'
    require_relative 'function.pb'
    require_relative 'object.pb'
    require_relative 'package.pb'
    require_relative 'tritium.pb'
    require 'pp'
    require_relative 'object'
    
    def self.script(filename)
      obj = Tritium::Serializer::ObjectSerializer.new(filename)
      obj.process
      obj.encode
    end

    
    def process!
      process_file(@ts_file)
    end

    def process_file(ts_file)
      scope_name = @import_scopes[@imports.index(ts_file)]
      filename = ts_file.split("/").last
      path = ts_file.split("/")[0..-2].join("/")
      parser = Tritium::Parser::Parser.new(:filename => filename, :path => path, :skip_imports => true, :starting_scope => scope_name)
      root_instruction = parser.parse
      @instructions << root_instruction # Keep the instructions around for debug
      script = Script.new(:name => ts_file.dup.force_encoding("BINARY"), :root => convert_block(root_instruction))
      scope_const_name = (root_instruction.scope.name.to_s.upcase + "_SCOPE").to_sym
      script.scope = Script::Scope.const_get(scope_const_name)
      @transform.scripts << script
      @processed << ts_file
      #puts "processed file #{ts_file}"
      #puts "need to process #{(@imports - @processed).size}"
      while (import = (@imports - @processed).first) do 
        process_file(import)
      end
    end
    
    
  end
end