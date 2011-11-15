# Backdoor that sets cookie and sends user to homepage

# Remove the 404 contents
remove()
  
# append the backdoor html that adds the cookie and redirects to the homepage
inject_top(read("backdoor.html"))
log("--> Backdoor.ts")