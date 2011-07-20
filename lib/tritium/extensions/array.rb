class Array
  def to_tritium
    self.collect do |item|
      if item.respond_to?("to_tritium")
        item.to_tritium
      else
        item.inspect
      end
    end.compact.join(", ")
  end
end