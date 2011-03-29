require 'yajl'
require 'sinatra/base'
require 'sinatra/reloader'
require 'json'
require 'sass'

DB = Sequel.sqlite(File.join(ENV["PROJECT_PATH"], "tmp/debug.sqlite"))

require_relative 'models/debug_session'
require_relative 'models/instruction'
require_relative 'models/step'

module Larry
  class Server < Sinatra::Base
    include ::Larry
    set :views, File.dirname(__FILE__) + '/views'
    set :public, File.dirname(__FILE__) + '/public'
    set :logging, true

    get '/' do
      haml :debug
    end

    get '/step/:id' do
      step = Step.filter(:id => params[:id]).first
      data = step.values
      data[:children] = step.children.collect &:id
      data.to_json
    end
    
    get '/instruction/:id' do
      ins = Instruction.filter(:id => params[:id]).first
      data = ins.values
      data[:children] = ins.children.collect &:id
      data.to_json
    end
    
    get '/sessions' do
      if DebugSession.count > 0
        redirect '/sessions/' + DebugSession.first.id.to_s
      end
      haml :no_session
    end
    
    get '/sessions/:id' do
      @session = DebugSession.filter(:id => params[:id]).first
      if @session.nil?
        redirect '/sessions'
      else
        @steps = @session.steps
        haml :index
      end
    end
    
    get '/instructions' do
      @instructions = Instruction.eager(:children).all
      haml :instructions
    end

    get '/main.css' do
      sass :main
    end
    
    def load_data
      @data = Yajl::Parser.parse(File.read($PROJECT_PATH + "/tmp/debug.json"))
    end
  end
end