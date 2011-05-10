desc 'build the production gem'
task :build_gem do
  puts `gem build tritium.gemspec`
end

desc 'upload the gem to the production gemserver'
task :upload_gem do
  puts `scp *.gem gemserver@50.19.39.205:/mnt/gems/public/gems`
end

desc 'kick the production gemserver'
task :gem_update do
  puts `ssh gemserver@50.19.39.205 /mnt/gems/genit`
end

desc 'clean up after ourselves'
task :clean_up do
  puts `rm *.gem`
  puts `rm -rf vendor`
end
