#!/bin/bash

if [ -z $MIXER_NAME ]; then
	echo "No mixer name was provided."
	echo "Don't know what you're trying to pull, but where I'm from,"
	echo "we remember the names of the mixers we wanna 'deploy'"
	exit 1
fi

if [ -z $VERSION ]; then
	echo "No version was specified."
	echo "Need a version to know which mixer to deploy."
	echo "Exiting..."
	exit 1
fi

##############################################################################
# Source jenkins-env to get some common vars setup
#
source $HOME/gobuilds/tools/jenkins-env.sh
[ ! -d $MOOV_HOME ] && mkdir -p $MOOV_HOME


FILENAME="$MIXER_NAME-$VERSION.mxr"

NOSAKA_SERVER="filesrv@nosakafs01-int"
NOSAKA_FILEPATH="/opt/nosaka/mixer"
scp "$MASTER_MIXERS/$FILENAME" "$NOSAKA_SERVER:$NOSAKA_FILEPATH/$FILENAME"
[ $? != 0 ] && exit 1

APOLLO_URL="http://apollo.moovweb.com/sdk/versions/register?"
curl "$APOLLO_URL?version=$VERSION&product=$MIXER_NAME"
[ $? != 0 ] && exit 1

#  We need this echo here in order to end our script with a exit status of zero
echo "Obligatory redundant acknowledgment of succesful deployment process, ya!"
