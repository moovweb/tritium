->(args) do
  text = args.first
  text.split(" ").collect do |word|
    first_letter = word[0]
    word[0..0] = ""
    word << " #{first_letter}ay"
  end
  "#{text.inspect}"
end