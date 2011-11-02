# This is a deprecation macro

->(args) do
  file_name, type = args
  location = ""
  puts "DEPRECATION WARNING: Don't use asset.2 anymore! Will be gone in 1.0"
  
  if type.value == "stylesheet"
    location = "stylesheets/.css/"
    if file_name.respond_to?("value")
      puts "DEPRECATION WARNING: Please use sass('#{file_name.value[0..-5]}') instead" unless ENV["TEST"]
    end
  elsif type.value == "js"
    location = "javascript/"
    if file_name.respond_to?("value")
      puts "DEPRECATION WARNING: Please use asset(\"javascripts/#{file_name.value}\") instead" unless ENV["TEST"]
    end
  elsif type.value == "image"
    location = "images/"
    if file_name.respond_to?("value")
      puts "DEPRECATION WARNING: Please use asset(\"images/#{file_name.value}\") instead" unless ENV["TEST"]
    end
  end
  "asset(concat(#{location.inspect}, #{file_name.to_script})) { yield() }"
end