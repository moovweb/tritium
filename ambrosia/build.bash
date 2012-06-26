#!/bin/bash

# Export data path so the build process can find the tritium package(s)
# -- this will probably differ locally versus jenkins

export GOHATTAN_DATA="$HOME/.manhattan"

mkdir -p tmp
ambrosia=`pwd`
echo ""

sets="internal external"

for set in $sets
do
	mixers=`find $set -d 1`

	for mixer in $mixers
	do
		
		if [[ $mixer == "$set/.DS_Store" ]]
		then
			# Invalid path
			continue
		fi	

		echo $mixer

		echo "Building $mixer" > tmp/build.log
		echo -n "    Building ... "

		# Only want one local *.mxr per mixer
		rm $mixer/*.mxr
		#hermes build <mixer lib path> <mixer name> <output dir>
		hermes build $ambrosia $mixer $mixer &> tmp/build.log
		echo " done."

		mixerFile=`find $mixer/*.mxr`
		echo "    Output: $mixerFile"

		echo -n "    Testing ... "
		tritium test $mixer/package $mixerFile &> $mixer/tests.log
		
		if [[ ! $? -eq 0 ]]
		then
			echo "FAIL!"
			echo "    Look in $mixer/tests.log for details."
		else
			echo "PASS"
		fi
		
		echo ""
	done

done

echo "Output build log to tmp/build.log"