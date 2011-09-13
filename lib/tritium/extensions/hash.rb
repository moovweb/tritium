class Hash
  def to_script
    return nil if self.keys.size == 0
    (self.collect {|k,v| "#{k}: #{v.to_script}"}).join(", ")
  end
end