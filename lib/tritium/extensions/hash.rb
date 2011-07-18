class Hash
  def to_tritium
    return nil if self.keys.size == 0
    (self.collect {|k,v| "#{k}: #{v.inspect}"}).join(", ")
  end
end