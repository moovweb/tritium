$encode_me = "any + old & data"
$encoded = encode64($encode_me)
$decoded = decode64($encoded)

match($encoded, "YW55ICsgb2xkICYgZGF0YQ==") {
  append("succ")
  match($decoded, $encode_me) {
    append("ess")
  }
}
