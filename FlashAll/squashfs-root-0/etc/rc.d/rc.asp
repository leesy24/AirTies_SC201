#!/bin/sh

/usr/bin/configconvert

#Start manager
if [ -x /usr/bin/pc ]; then
	echo "Starting ASP Framework..."
	/usr/bin/pc &
fi


