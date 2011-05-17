module Larry
  class DebugSession < Sequel::Model
    one_to_many :steps
    
    def slowest_searches
      Step.filter(:debug_session_id => self.id).order(:search_time_ns).reverse.limit(10)
    end
  end
end