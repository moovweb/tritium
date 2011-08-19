class String

  def fix_encoding
    if self.encoding.to_s == "UTF-8"
      if !self.valid_encoding?
        return self.chars.map{|c| c.valid_encoding? ? c : '_?_'}.join
      end
    else
      ic = Iconv.new('UTF-8', self.encoding.to_s + '//IGNORE')
      return ic.conv(self + "    ")[0..-5]
    end
    self
  end
end