# Note:  In order to be compatible with the latest code from
# code.google.com/p/goprotobuf, you will have to clone the goprotobuf repo
# and compile the binary protoc-gen-go.  You will need to add this new binary
# to your PATH before running this script, as 'protoc' will simply check your 
# PATH for its existence.  
#
protoc -I ./pb --go_out . ./pb/*.proto
