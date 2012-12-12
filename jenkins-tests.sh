#!/bin/bash -x

# This script runs our tests for our mixers for all older versions of mixers.
# You'd only want to run this script if there were changes to the tritium
# engine and you wanted to verify that you didn't break any existing mixers
# out there.

if [ -z $MIXER_NAME ]; then
	echo "No mixer name was provided."
	echo "Don't know what you're trying to pull, but where I'm from,"
	echo "we remember the names of the mixers we wanna 'build'"
	exit 1
fi

##############################################################################
# Source jenkins-env to get some common vars setup
#
source $HOME/gobuilds/tools/jenkins-env.sh
[ ! -d $MOOV_HOME ] && mkdir -p $MOOV_HOME


# Apollo returns the versions in json format.  We pass them through
# our python scripts which searches for the "version" key and prints out
# each value in a new line.  Then we collapse all the lines into one line
# with ':' as the token.  tr leaves a trailing ':' so we strip it off with sed.
# We also don't include any version that starts with 0, since we don't test
# that far back.
MIXER_API_URL="http://apollo-vc01/api/internal/versions/$MIXER_NAME"
VERSIONS=`curl $MIXER_API_URL 2>/dev/null | python -u $TOOLS_DIR/jsonip.py version 2>/dev/null | sed '/^0.*/d' | tr '\n' ':' | sed 's/:$//'`

if [ -z "$VERSIONS" ]; then
	echo "No mixer versions found for $MIXER_NAME."
	echo "Not running any tests."
	exit 1
fi


# Skipping these versions because their testing frameworks do not happily
# compile with the latest code.  This should be relatively safe as their
# lifespan in the wild was very short (1 day for simple, a week for omni).
# and they're also super old (July/August of 2012)
if [ $MIXER_NAME == "simple-mobile" ]; then
	SKIP_VERSION="1.0.67"
elif [ $MIXER_NAME == "omni-mobile" ]; then
	SKIP_VERSION="1.0.110"
fi


echo -e "\n\n\nTesting $MIXER_NAME versions:  $VERSIONS\n\n\n"

# Link the clibs so that we can compile our projects against them.
[ ! -d $MOOV_HOME/clibs ] && ln -s -f $CLIBS_HOME $MOOV_HOME/clibs
export LD_LIBRARY_PATH=$MOOV_HOME/clibs/lib

# Build everything, it'll clone all our required packages.
python -u $TOOLS_DIR/build.py manhattan/targets/powermoov $GIT_BRANCH
[ $? != 0 ] && exit 1

# Create our data directory where all our stuff we'll be generated in.
export GOHATTAN_DATA=$WORKSPACE/.moovweb
[ ! -d "$GOHATTAN_DATA/mixers" ] && mkdir -p $GOHATTAN_DATA/mixers


# We also have to copy our current directory into moovweb, otherwise go doesn't
# know where the "ambrosia/transform" import is....
rm -rf $MOOV_HOME/src/ambrosia
cd $MOOV_HOME/src
git clone git@github.com:moovweb/ambrosia
[ $? != 0 ] && exit 1
cd ambrosia


export GOPATH=$MOOV_HOME

(IFS=:
	version_list=($VERSIONS)
	count=${#version_list[@]}

	for (( i=0;i<$count;i++ ))
	do
		if [ ${version_list[$i]} == $SKIP_VERSION ]; then
			echo "Skipping version ${version_list[$i]}...."
			continue
		fi

		rm -rf $GOHATTAN_DATA/mixers/*
		if [ $? != 0 ]; then
			echo "Couldn't delete old mixers!  This is a problem....halting testing."
			exit 1
		fi

		echo -e "\n\n\n"
		echo "Running tests for $MIXER_NAME-${version_list[$i]}..."
		
		# Copy mixer over
		cp "$MASTER_MIXERS/$MIXER_NAME-${version_list[$i]}.mxr" "$GOHATTAN_DATA/mixers/"
		if [ $? != 0 ]; then
			echo "Couldn't find mixer in jenkins, does it exist?"
			fail="$fail\nFailed to test mixer: $MIXER_NAME-${version_list[$i]}"
			continue
		fi
		
		# Just for debug info:
		ls -al "$GOHATTAN_DATA/mixers/"

		git checkout $MIXER_NAME-${version_list[$i]}
		if [ $? != 0 ]; then
			echo "Couldn't checkout version."
			fail="$fail\nFailed to checkout tag: $MIXER_NAME-${version_list[$i]}"
			continue
		fi

		# More debug info
		git describe --tags

		# Start testing, run the test from the master checkout of ambrosia, but use
		# the test data from the version checked out.
		go test $WORKSPACE/test -test.v --mixer=$MIXER_NAME --test-data=$MOOV_HOME/src/ambrosia/transform
		if [ $? != 0 ]; then
			echo "Test failures found!"
			fail="$fail\nTest failures found in $MIXER_NAME-${version_list[$i]}"
			continue
		fi

		echo "Test run for $MIXER_NAME-${version_list[$i]} was successful!"
	done

	echo -e "\n\n\n"
	if [ ! -z "$fail" ]; then
		echo -e "\n\nFailures found!\n"
		echo -e "$fail"
		exit 1
	fi
	
	# The above if statement will exit with status 1 if the check is false, 
	# or if it's true, so we need to add a statement that exits with zero if
	# we succeeded our checks, hence this echo.
	echo -e "\nFinished testing $MIXER_NAME"
)

[ $? != 0 ] && exit 1

#  We need this echo here in order to end our script with a exit status of zero
echo "Obligatory redundant acknowledgment of succesful build process, ya!"
