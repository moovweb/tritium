require 'json'
require 'sequel'
require_relative '../../parser/instruction'

module Tritium
  module Engines
    class Debug
      class Database
        def initialize(db_location)
          if File.exists?(db_location)
            `rm #{File.absolute_path(db_location)}`
          end

          @db = Sequel.sqlite(db_location)
          
          @db.create_table :instructions do
            primary_key :id
            String :name
            String :args
            Integer :parent_id
            index :parent_id
            String :scope
            String :iid
            index :iid
            String :arg_for_iid
            index :arg_for_iid
            Integer :line_number
            String :script_name
            String :line
            String :processed_line
            String :stub
          end
          
          @db.create_table :debug_sessions do
            primary_key :id
            String :name
            String :content_type
            String :path
            Text :start_env
            Text :last_env
            DateTime :created_at
          end
          
          @db.create_table :steps do
            primary_key :id
            String :sid
            index :sid
            Integer :debug_session_id
            index :debug_session_id
            Integer :group_id
            index :group_id
            String :group_name # optional... normally something like the XPath result for a group.
            Integer :instruction_id
            index :instruction_id
            Integer :parent_id
            index :parent_id
            String :log
            Integer :total_time_cs
            Integer :search_time_ns
            Integer :time_cs
          end
        end
        
        def insert_instruction(instruction, parent_id = nil)
          data = instruction.to_hash
          args = data[:args].collect do |arg|
            if arg.is_a?(::Tritium::Parser::Instruction)
              ins = @db[:instructions].filter(:iid => arg.iid).update(:parent_id => nil, :arg_for_iid => instruction.iid)
              "INSTRUCTION_#{arg.iid}"
            elsif arg.is_a?(Regexp)
              arg.inspect[1..-2]
            else
              arg
            end
          end
          data[:args] = args.to_json
          data[:iid] = instruction.iid
          if parent_id
            data[:parent_id] = parent_id
          end
          id = @db[:instructions].insert(data)
          instruction.children.each do |child|
            insert_instruction(child, id)
          end
        end
        
        def process_debug(debug_list)
          debug_list.each do |name, step|
            insert_debug_session(name, step)
          end
        end
        
        def insert_debug_session(name, steps)
          data = {:name => name, 
                  :start_env => steps.first.debug[:start_env].to_json, 
                  :last_env => steps.last.debug[:last_env].to_json,
                  :path => steps.first.debug[:start_env]['path'],
                  :content_type => steps.first.debug[:start_env]['content_type'],
                  :created_at => Time.now}
          debug_session_id = @db[:debug_sessions].insert(data)
          root_ids = []
          steps.each_with_index do |step, index|
            root_ids << insert_step(step, index, debug_session_id)
          end
          debug_session_id
        end
        
        def insert_step(step, group_id = 0, debug_session_id = nil, parent_id = nil)
          data = {}
          data[:sid] = step.debug[:step_id]
          data[:log] = step.debug[:log].to_json
          data[:total_time_cs] = step.debug[:total_time_cs] 
          data[:debug_session_id] = debug_session_id
          data[:instruction_id] = @db[:instructions].select(:id).filter(:iid => step.instruction.iid).first[:id]
          data[:search_time_ns] = step.debug[:search_time_ns]
          data[:group_name] = step.debug[:group_name]
          data[:parent_id] = parent_id
          data[:time_cs] = step.debug[:time_cs]
          #data[:env] = step.debug[:env].to_json
          data[:group_id] = group_id
          
          id = @db[:steps].insert(data)
          step.children.each_with_index do |child_set, index|
            child_set.each do |child|
              insert_step(child, index, debug_session_id, id)
            end
          end
          id
        end
      end
    end
  end
end
