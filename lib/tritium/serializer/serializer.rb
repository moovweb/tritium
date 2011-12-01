module Tritium
  class Serializer
    require_relative 'tritium.pb'
    require 'pp'
    attr :instructions
    attr :transform
    
    def self.package(directory)
      set = TransformPackage.new(:transforms => [])
      scripts = %w(request response_pre body response_post)
      scripts.each do |script|
        file = File.join(directory, script + ".ts")
        if !File.exist?(file)
          raise "Expected there to be a file #{file}"
        end
      end
      scripts.each do |script|
        puts "Starting #{script}"
        file_path = File.join(directory, script + ".ts")
        serializer = Serializer.new(file_path, script)
        serializer.process!
        set.transforms << serializer.transform
      end
      set
    end
    
    def initialize(main_file, name = "")
      @main_file = main_file
      @transform = TransformScript.new(:scripts => [], :name => name.force_encoding("BINARY"))
      @processed = []
      @instructions = []
      @imports = [main_file]
      @import_scopes = ["Text"]
    end
    
    def encode
      @transform.encode
    end
    
    def process!
      process_file(@main_file)
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
    
    def convert_instructions(ins_set)
      (ins_set.collect do |ins|
        convert_instruction(ins)
      end).flatten
    end
    
    def convert_instruction(ins)
      if ins.is_a? Tritium::Parser::Instructions::Invocation
        convert_function_call(ins)
      elsif ins.is_a? Tritium::Parser::Instructions::Literal
        convert_literal(ins)
      elsif ins.is_a? Tritium::Parser::Instructions::Import
        convert_import(ins)
      else 
        convert_block(ins)
      end
    end
    
    def convert_block(ins)
      obj = Script::Instruction.new(:type => Script::InstructionType::BLOCK,
                              :children => convert_instructions(ins.statements))
      #set_scope(ins, obj)
      obj
    end
    
    def convert_function_call(ins)
      obj = Script::Instruction.new(:type => Script::InstructionType::FUNCTION_CALL)

      func = obj
      const_name = (ins.name.to_s.upcase + "_FUNC").to_sym
      func.function = Script::Function.const_get(const_name)
      
      func.children = convert_instructions(ins.statements)
      func.arguments = convert_instructions(ins.pos_args)

      ins.spec.arguments.values.each_with_index do |arg, index|
        if arg.type == "Position"
          obj_arg = func.arguments[index]
          obj_arg['type'] = Script::InstructionType::POSITION
          constant_name = obj_arg.value.to_s.upcase.to_sym
          obj_arg.position = Script::Position.const_get(constant_name)
          obj_arg.value = nil
        end
      end

      obj
    end
    
    def convert_literal(ins)
      obj = Script::Instruction.new
      if ins.regexp?
        obj['type'] =  Script::InstructionType::REGEXP
      else
        obj['type'] =  Script::InstructionType::TEXT
      end
      obj.value = ins.value.to_s.force_encoding("BINARY")
      obj
    end
    
    def convert_import(ins)
      if !@imports.include?(ins.location)
        @imports << ins.location
        @import_scopes << ins.scope.name
      end
      obj = Script::Instruction.new(:type => Script::InstructionType::IMPORT,
                              :import_index => @imports.index(ins.location))
      
    end
  end
end