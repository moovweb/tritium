require 'yajl'
require 'sinatra/base'
require 'sinatra/reloader'
require 'sass'

module Larry
  class Server < Sinatra::Base
    set :views, File.dirname(__FILE__) + '/views'

    get '/' do
      load_data
      haml :index
    end

    get '/main.css' do
      sass :main
    end
    
    def load_data
      @data = Yajl::Parser.parse(File.read($PROJECT_PATH + "/tmp/debug.json"))
    end
  end
end