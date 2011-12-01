version = File.read("VERSION").strip
if File.exists?("JENKINS")
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
  s.description = "A scripting language for document transformations"

  s.authors     = ["Hampton Catlin"]
  s.email       = ["hcatlin@moovweb.com"]
  s.homepage    = "https://github.com/moovweb/tritium"

  s.files        = Dir['README.md', 'BUILD_VERSION', 'Gemfile', 'Gemfile.lock', 'Rakefile', 'spec.1-1.yml', 'spec.2.yml', 'lib/**/*', 'bin/ts2tb']
  s.executables  = ['ts2tsb', 'ts2pkg']
  s.test_files   = Dir['test/**/*']
  s.require_path = 'lib'

  s.add_dependency('nokogiri')
  s.add_dependency('bundler')
  s.add_dependency('beefcake')
  s.add_dependency('diff-lcs', ['~> 1.1.2'])
  s.add_development_dependency('moov_build_tasks', ['~> 0.2.24'])
end
