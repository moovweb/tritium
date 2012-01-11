// Looks up a global variable
@func var(Text %name) //Text,Text
@func var(Text %name, Text %value) //Text,Text

// If given a block, it returns the time-to-execute as a string (time units vary by implementation)
@func time() //Text

// Placeholder function for any engine-specific debug duties.
@func debug(Text %debug_id) //Text

// Opens up a matcher case
@func match(Text %match_target) //Text

// Writes out a string to the console and debug log
@func log(Text %log_message) //Text,Text

// Used with match($var) {not('hi')}
@func not(Text %text) //Text

// Used with match($var) {not(/hi/)}
@func not(Regexp %regexp) //Text

// Used with match($var, 'hi')
@func with(Text %text) //Text

// Used with match($var, /hi/)
@func with(Regexp %regexp) //Text

// Always matches
@func else() //Text

// Only used in Functions
@func yield()
@func Text.yield() //Text

// Any value passed into this function will return a regex --- ready for fancy replace() or match() usage. NOTE! Use hard-coded regex if you can. This is much slower than hard-coding regex!
@func regexp(Text %expression) //Regexp,Text

// A function for concatenating strings. Can accept 2 or more args
@func concat(Text %first_value, Text %second_value) //Text,Text

// This is a the way that we have Tritium communicate variables back to its execution environment. That sounds complicated, but in most uses of Tritium, it would be something like export("Content-Type", "application/js") to tell the app to change the content-type. Look at the reference for your server for more information on what you can export.
@func export(Text %key_name) //Text,Text
@func export(Text %key_name, Text %value) //Text,Text

// Returns the input argument in ALL CAPS
@func upcase(Text %input_string) //Text

// Returns the input argument in lower case
@func downcase(Text %input_string) //Text

// Returns the current text scope as a string. Useful to pass the current Text as an argument
@func Text.text() //Text,Text

// Replace the entire current text with what you pass in
@func Text.set(Text %value) //Text

// Replace all instances of the first argument with the second argument. This yields to a Text scope that allows you to set the Replacement string. Very powerful stuff. Look at the examples.
@func Text.replace(Regexp %search) //Text,Text
@func Text.replace(Text %search) //Text,Text

// Prepend the string to the front of the text area
@func Text.prepend(Text %text_to_prepend) //Text

// Append the string to the front of the text area
@func Text.append(Text %text_to_append) //Text