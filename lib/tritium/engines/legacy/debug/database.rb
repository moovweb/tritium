require 'json'
require 'sequel'

module Tritium
  module Engines
    class Debug
      class Database
        def initialize(db_location, root_instruction)
          if File.exists?(db_location)
            @db = Sequel.sqlite(db_location)
            @db.synchronous=:off #turn off sync writes to speed up DB inserts
          else
            @db = Sequel.sqlite(db_location)
            @db.create_table :instructions do
              primary_key :id
              String :name
              String :args
              String :parent_iid
              index :parent_iid
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
              String :request_id
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
              String :instruction_iid
              index :instruction_iid
              String :parent_sid
              index :parent_sid
              String :log
              Integer :total_time_cs
              Integer :search_time_ns
              Integer :time_cs
            end
            @db.synchronous=:off #turn off sync writes to speed up DB inserts
            insert_instruction(root_instruction)
          end
        end
        
        def insert_instruction(instruction, parent_iid = nil)
          all_instructions = collect_instruction(instruction, parent_iid)
          @db[:instructions].multi_insert(all_instructions)
        end

        def collect_instruction(instruction, parent_iid = nil)
          data = instruction.to_hash
          args = data[:args].collect do |arg|
            if arg.is_a?(::Tritium::Parser::ReaderInstruction)
              ins = @db[:instructions].filter(:iid => arg.iid).update(:parent_iid => nil, :arg_for_iid => instruction.iid)
              "INSTRUCTION_#{arg.iid}"
            elsif arg.is_a?(Regexp)
              arg.inspect[1..-2]
            else
              arg
            end
          end
          data[:args] = args.to_json
          data[:iid] = instruction.iid
          if parent_iid
            data[:parent_iid] = parent_iid
          end
          ret = [data]
          instruction.children.each do |child|
            ret.concat(collect_instruction(child, instruction.iid))
          end
          ret
        end
        
        def process_debug(debug_list, request_id=nil)
          debug_list.each do |name, step|
            insert_debug_session(name, step, request_id)
          end
        end
        
        def insert_debug_session(name, steps, request_id=nil)
          data = {:name => name, 
                  :start_env => steps.first.debug[:start_env].to_json, 
                  :last_env => steps.last.debug[:last_env].to_json,
                  :path => steps.first.debug[:start_env]['path'],
                  :content_type => steps.first.debug[:start_env]['content_type'],
                  :created_at => Time.now,
                  :request_id => request_id.to_s
          }
          debug_session_id = @db[:debug_sessions].insert(data)
          steps.each_with_index do |step, index|
            insert_step(step, index, debug_session_id)
          end
          debug_session_id
        end
       
        def collect_step(step, group_id = 0, debug_session_id = nil, parent_sid = nil)
          data = {}
          data[:sid] = step.debug[:step_id]
          data[:log] = step.debug[:log].to_json
          data[:total_time_cs] = step.debug[:total_time_cs] 
          data[:debug_session_id] = debug_session_id
          data[:instruction_iid] = step.instruction.iid
          data[:search_time_ns] = step.debug[:search_time_ns]
          data[:group_name] = step.debug[:group_name]
          data[:parent_sid] = parent_sid
          data[:time_cs] = step.debug[:time_cs]
          #data[:env] = step.debug[:env].to_json
          data[:group_id] = group_id

          ret = [data]

          sid = step.debug[:step_id]
          step.children.each_with_index do |child_set, index|
            child_set.each do |child|
              ret.concat(collect_step(child, index, debug_session_id, sid))
            end
          end
          ret
        end
 
        def insert_step(step, group_id = 0, debug_session_id = nil, parent_sid = nil)
          all_steps = collect_step(step, group_id, debug_session_id, parent_sid)
          @db[:steps].multi_insert(all_steps)
        end
      end
    end
  end
end
