# This is a deprecation macro

->(args) do
  file_name, type = args
  location = ""
  
  if type.value == "stylesheet"
    location = "/stylesheets/.css/"
    puts "DEPRECATION WARNING: Please use sass('#{file_name.value[0..-5]}') instead" unless ENV["TEST"]
  elsif type.value == "js"
    location = "/javascript/"
    puts "DEPRECATION WARNING: Please use asset(\"javascripts/#{file_name.value}\") instead" unless ENV["TEST"]
  elsif type.value == "image"
    location = "/images/"
    puts "DEPRECATION WARNING: Please use asset(\"images/#{file_name.value}\") instead" unless ENV["TEST"]
  end
  "asset(concat(#{location.inspect}, #{file_name.to_script})) { yield() }"
end