class String

  def fix_encoding
    if self.valid_encoding?
      self
    else
      ic = Iconv.new('UTF-8', 'UTF-8//IGNORE')
      #self.unpack('C*').pack('U*')
      ic.discard_ilseq = true
      ic.conv(self + "    ")[0..-4]
    end
  end
end