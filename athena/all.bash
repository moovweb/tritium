#!/bin/bash -x

# This will use whatever protoc-gen-go binary is found within $PATH.  If 
# the protobuffs are outdated given our latest code from 
# code.google.com/p/goprotobuf, then you need to call make inside the
# code.google.com/p/goprotobuf directory and move the outputted protoc-gen-go
# binary to a path that is in your PATH.
#


protoc --proto_path proto/ --go_out . proto/*.proto
