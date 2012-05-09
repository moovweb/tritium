#!/bin/bash -x

export GOPATH=$WORKSPACE/build-sandbox                   # for go commands
export MOOV_HOME=$WORKSPACE/build-sandbox                # for build script
export LD_LIBRARY_PATH=$HOME/clibs/lib:$LD_LIBRARY_PATH  # for running tests

# Make my build sandbox where all code will go
[ ! -d $MOOV_HOME ] && mkdir -p $MOOV_HOME

# for compiling and linking, the clibs *need* to be in this location
# relative to the go source, otherwise compiling/linking will fail.
[ ! -d $MOOV_HOME/clibs ] && ln -s "$HOME/clibs" "$MOOV_HOME/clibs"

#hash=`git show-ref | head -n 1 | awk '{print $1}'`
python -u "$HOME/bin/build.py" tritium $GIT_BRANCH



