#!/bin/sh

while [ 1 ]
do
	cat /proc/meminfo
	echo -e "\n"
	ps wwww
	echo -e "\n"
	sleep 5
done
