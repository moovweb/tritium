#!/bin/bash

# Export data path so the build process can find the tritium package(s)
# -- this will probably differ locally versus jenkins

export GOHATTAN_DATA="$HOME/.manhattan"

ambrosia=`pwd`

mixers=`find internal -d 1`

mkdir -p tmp/mixers

for mixer in $mixers
do
		echo "    Building ... $mixer"
		echo "Building $mixer" > tmp/build.log
		hermes build $ambrosia $mixer tmp/mixers &> tmp/build.log
		
		# Hook in tritium test command here. Something like:
		# tritium test --mixer-path=tmp/mixers/
		
done

#mkdir -p tmp/mixers
#hermes build . omni-mobile tmp/mixers

# Now that I've built each mixer, I can use the mixer and run its tests