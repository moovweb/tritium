require 'yajl'
require 'sinatra/base'
require 'sinatra/reloader'

module Larry
  class Server < Sinatra::Base
    set :views, File.dirname(__FILE__) + '/views'

    get '/' do
      load_data
      haml :index
    end
    
    def load_data
      @data = Yajl::Parser.parse(File.open($PROJECT_PATH + "/tmp/debug.json"))
    end
  end
end