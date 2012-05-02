## Go install ##

[Textmate bundle](https://github.com/AlanQuatermain/go-tmbundle)

1. Install Go


golang site wants you to build it from scratch:

    easy_install Mercurial
	hg clone -u release https://go.googlecode.com/hg/ go
	cd go/src/
	./all.bash 

But we need to be on the same version (so that gb behaves the same)

    sudo brew install go


Set env variables:

$GOROOT
$GOBIN
$GOPATH ?


2. Install libraries:

(this guy need $GOPATH set, but that breaks a later installation ...)

    brew install bzr
    goinstall launchpad.net/goyaml


### Install [go-builder](http://code.google.com/p/go-gb/) ###

Don't do it this way ... we want to be on the same version of gb:
    goinstall github.com/skelterjohn/go-gb/gb

For now, do this:

    git clone git@github.com:skelterjohn/go-gb
    cd go-gb/gb
    git checkout d0358f0821968285da6454ae84e5af3c6b491bd2
    make install


### Install protoc ###

    brew install protobuf

### Install proto-buffer modules ###

[Go](http://code.google.com/p/goprotobuf/):

  (Having $GOPATH set will fuck this shit up ...)

    goinstall goprotobuf.googlecode.com/hg/proto
    cd $GOROOT/src/pkg/goprotobuf.googlecode.com/hg/compiler
    make install

Ruby:

    gem install beefcake


## Install our libraries ##

### log4go ###

    git clone git@github.com:moovweb/log4go
    cd log4go
    make
    make install

### Install gokogiri ###

    clone gokogiri
	gokogiri/
		./build clean
		./build
		./build install
		
		
### Install rubex ###

  (Last working version: fd388b83092ccdb75a2a8911b105860d4671d2f4)

	clone rubex
	/rubex
		./make onig_install
		./make install		


## Tritium build process ##

Build proto buffers:

    cd tritium/
    ./proto/build

Build the proto / packager / linker components:

    gb -cbi

(I seem to have to be in the /src directory to make this work. It seems like other people can do it in the root directory)


-----

ignore the following:


tritium/src

/proto

    gb -cbi

/packages 

    gb -cbi

/linker
    gb -cbi




