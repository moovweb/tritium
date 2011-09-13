class Array
  def to_script
    self.collect do |item|
      if item.respond_to?("to_script")
        item.to_script
      else
        item.inspect
      end
    end.compact.join(", ")
  end
end