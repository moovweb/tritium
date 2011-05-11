desc 'all of the stuff we want jenkins to do'
task :jenkins => [:test, :build_gem, :upload_gem, :gem_update, :clean_up] do
  puts "Go Go Jenkins"
end
