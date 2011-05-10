version = File.read("VERSION").strip
if File.exists?"JENKINS"
  version += "."
  version += File.read("JENKINS").strip
end

buildf = File.open("BUILD_VERSION", 'w')
buildf.puts version
buildf.close

Gem::Specification.new do |s|
  s.name        = 'tritium'
  s.version     = version
  s.platform    = Gem::Platform::RUBY
  s.summary     = "A scripting language for document transformations"
  s.description = ""

  s.authors     = ["Hampton Catlin"]
  s.email       = ["hcatlin@moovweb.com"]
  s.homepage    = "https://github.com/moovweb/tritium"

  s.files        = Dir['README.md', 'BUILD_VERSION', 'Gemfile', 'Rakefile', 'spec.yml', '{bin,lib,default,command}/**/*']
  s.executables  = []
  s.test_files   = Dir['test/**/*']
  s.require_path = 'lib'

  s.add_dependency('yajl-ruby')
  s.add_dependency('bundler')
end
