module Tritium
  class Serializer
    require_relative 'tritium.pb'
    require 'pp'
    
    def initialize(main_file)
      @main_file = main_file
      @set = Transformer.new(:scripts => [])
      @processed = []
      @imports = [main_file]
    end
    
    def encode
      @set.encode
    end
    
    def process!
      process_file(@main_file)
    end

    def process_file(ts_file)
      filename = ts_file.split("/").last
      path = ts_file.split("/")[0..-2].join("/")
      parser = Tritium::Parser::Parser.new(:filename => filename, :path => path, :skip_imports => true)
      root_instruction = parser.parse
      script = Transformer::Script.new(:name => ts_file.dup.force_encoding("BINARY"), :root => convert_block(root_instruction))
      @set.scripts << script
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
      function_call = Transformer::Script::Instruction::FunctionCall.new(
        :function => Transformer::Script::Instruction::FunctionCall::Function::BLOCK,
        :children => convert_instructions(ins.statements))
      Transformer::Script::Instruction.new(:type => Transformer::Script::Instruction::Type::BLOCK,
                              :function_call => function_call)
    end
    
    def convert_function_call(ins)
      func = Transformer::Script::Instruction::FunctionCall.new
      obj = Transformer::Script::Instruction.new(
                                    :type => Transformer::Script::Instruction::Type::FUNCTION_CALL,
                                    :function_call => func)
      const_name = ins.name.to_s.upcase.to_sym
      func.function = Transformer::Script::Instruction::FunctionCall::Function.const_get(const_name)
      
      func.children = convert_instructions(ins.statements)
      if ins.spec.positional
        func.arguments = convert_instructions(ins.pos_args[1..-1])
        pos_const = ins.pos_args.first.value.upcase.to_sym
        func.position = Transformer::Script::Instruction::FunctionCall::Position.const_get(pos_const)
      else
        func.arguments = convert_instructions(ins.pos_args)
      end
      obj
    end
    
    def convert_literal(ins)
      obj = Transformer::Script::Instruction.new
      if ins.regexp?
        obj['type'] =  Transformer::Script::Instruction::Type::REGEXP
      else
        obj['type'] =  Transformer::Script::Instruction::Type::TEXT
      end
      obj.value = ins.value.to_s.force_encoding("BINARY")
      obj
    end
    
    def convert_import(ins)
      if !@imports.include?(ins.location)
        @imports << ins.location
      end
      Transformer::Script::Instruction.new(:type => Transformer::Script::Instruction::Type::IMPORT,
                              :import_index => @imports.index(ins.location))
    end
  end
end