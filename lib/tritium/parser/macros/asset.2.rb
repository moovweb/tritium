# This is a deprecation macro

->(args) do
  file_name, type = args
  location = ""
  output = []
  output << "log('DEPRECATION WARNING: Do not use asset.2 anymore! Will be gone in 1.0')"
  
  if type.value == "stylesheet"
    location = "stylesheets/.css/"
    if file_name.respond_to?("value")
      output << "log('DEPRECATION WARNING: Please use sass(\"#{file_name.value[0..-5]}\") instead')" #unless ENV["TEST"]
    end
  elsif type.value == "js"
    location = "javascript/"
    if file_name.respond_to?("value")
      output << "log('DEPRECATION WARNING: Please use asset(\"javascripts/#{file_name.value}\") instead')" #unless ENV["TEST"]
    end
  elsif type.value == "image"
    location = "images/"
    if file_name.respond_to?("value")
      output << "log('DEPRECATION WARNING: Please use asset(\"images/#{file_name.value}\") instead')" #unless ENV["TEST"]
    end
  end
  #puts output.join("\n")
  "asset(concat(#{location.inspect}, #{file_name.to_script})) { yield() }"
end