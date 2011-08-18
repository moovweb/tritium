class String

  def fix_encoding
    if self.valid_encoding?
      self
    else
      #ic = Iconv.new('UTF-8', 'UTF-8//IGNORE')
      #self.unpack('C*').pack('U*')
      #ic.discard_ilseq = "?!?"
      #ic.conv(self + "    ")[0..-4]
      self.chars.map{|c| c.valid_encoding? ? c : '_?_'}.join
    end
  end
end