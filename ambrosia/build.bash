#!/bin/bash

# Export data path so the build process can find the tritium package(s)
# -- this will probably differ locally versus jenkins

export GOHATTAN_DATA="$HOME/.manhattan"

mkdir -p tmp
ambrosia=`pwd`
echo ""

for set in "internal external"
do

	mixers=`find $set -d 1`

	for mixer in $mixers
	do
		echo $mixer

		echo "Building $mixer" > tmp/build.log
		echo -n "    Building ... "

		#hermes build <mixer lib path> <mixer name> <output dir>
		hermes build $ambrosia $mixer $mixer &> tmp/build.log
		echo " done."

		mixerFile=`find $mixer/*.mxr`
		echo "    Output: $mixerFile"
		# Hook in tritium test command here. Something like:
		# tritium test --mixer-path=$mixerFile

		echo ""
	done

done

echo "Output build log to tmp/build.log"