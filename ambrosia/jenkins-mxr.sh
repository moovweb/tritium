#!/bin/bash

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

# Used by hermes build to generate the version of the mixer
echo $BUILD_NUMBER > $WORKSPACE/JENKINS

# Link the clibs so that we can compile our projects against them.
[ ! -d $MOOV_HOME/clibs ] && ln -s -f $CLIBS_HOME $MOOV_HOME/clibs

# Build tritium since we'll use it to create the lib package
$TOOLS_DIR/build.py tritium/tritium $GIT_BRANCH
[ $? != 0 ] && exit 1

# Build hermes to create the mixer
$TOOLS_DIR/build.py hermes/hermes $GIT_BRANCH
[ $? != 0 ] && exit 1

# Create our data directory where all our stuff we'll be generated in.
export GOHATTAN_DATA=$WORKSPACE/.manhattan
[ ! -d $GOHATTAN_DATA ] && mkdir -p $GOHATTAN_DATA

# Generate the mixer using data.py, we don't want the keys though, so avoid those.
LD_LIBRARY_PATH=$MOOV_HOME/clibs/lib python -u $TOOLS_DIR/data.py . $MIXER_NAME --nokeys
[ $? != 0 ] && exit 1

[ ! -d $MASTER_MIXERS ] && mkdir -p $MASTER_MIXERS
mv $GOHATTAN_DATA/mixers/*.mxr $MASTER_MIXERS
[ $? != 0 ] && exit 1

#  We need this echo here in order to end our script with a exit status of zero
echo "Obligatory redundant acknowledgment of succesful build process, ya!"
