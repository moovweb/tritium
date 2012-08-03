#!/bin/bash

##############################################################################
# Source jenkins-env to get some common vars setup
#
source "$HOME/gobuilds/tools/jenkins-env.sh"
[ ! -d $MOOV_HOME ] && mkdir -p "$MOOV_HOME/src"

# Link the clibs so that we can compile our projects against them.
[ ! -d $MOOV_HOME/clibs ] && ln -s -f $CLIBS_HOME "$MOOV_HOME/clibs"

# Build tritium since we'll use it to create the lib package
python -u "$TOOLS_DIR/build.py" tritium/tritium $GIT_BRANCH
[ $? != 0 ] && exit 1

# Run tritium tests
[ "$OS_NAME" == "linux" ] && export LD_LIBRARY_PATH="$MOOV_HOME/clibs/lib"
[ "$OS_NAME" == "darwin" ] && export DYLD_LIBRARY_PATH="$MOOV_HOME/clibs/lib"
if [ "$OS_NAME" == "windows" ]; then
	clean_libs=`echo "$MOOV_HOME/clibs/bin" | awk '{sub(/^C:/,"/c"); print}'`
	export PATH="$clean_libs:$PATH"
fi

export TRITIUM_PATH="$MOOV_HOME/src/tritium"
python -u "$TOOLS_DIR/tests.py" tritium/tritium
[ $? != 0 ] && exit 1

# Push to master node for funsies.
MASTER_TRITIUM_PATH="$MASTER_BIN/tritium/$GIT_BRANCH/$OS_NAME-$ARCH/$BUILD_NUMBER-tritium"
MASTER_MANIFEST_PATH="$MASTER_BIN/tritium/$GIT_BRANCH/$OS_NAME-$ARCH/$BUILD_NUMBER-MANIFEST.MF"
LOCAL_TRITIUM_PATH="$MOOV_HOME/bin/$BUILD_NUMBER-tritium"
LOCAL_MANIFEST_PATH="$MOOV_HOME/bin/$BUILD_NUMBER-tritium.MF"

if [ $OS_NAME == "windows" ]; then
	LOCAL_TRITIUM_PATH=`echo "$LOCAL_TRITIUM_PATH" | awk '{sub(/^C:/,"/c"); print}'`
	LOCAL_MANIFEST_PATH=`echo "$LOCAL_MANIFEST_PATH" | awk '{sub(/^C:/,"/c"); print}'`
fi

ssh $MASTER_URL "rm $MASTER_TRITIUM_PATH"  # If fails, just means this is the first job for this num.
ssh $MASTER_URL "rm $MASTER_MANIFEST_PATH" # If fails, just means this is the first job for this num.

ssh $MASTER_URL "mkdir -p $( dirname "$MASTER_TRITIUM_PATH" )"
[ $? != 0 ] && exit 1

rsync -rae ssh "$LOCAL_TRITIUM_PATH" "$MASTER_URL:$MASTER_TRITIUM_PATH"
[ $? != 0 ] && exit 1

rsync -rae ssh "$LOCAL_MANIFEST_PATH" "$MASTER_URL:$MASTER_MANIFEST_PATH"
[ $? != 0 ] && exit 1


#  We need this echo here in order to end our script with a exit status of zero
echo "Obligatory redundant acknowledgment of succesful build process, ya!"
