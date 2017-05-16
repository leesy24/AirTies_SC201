#!/bin/sh

PATH=/bin:/sbin:/usr/bin:/usr/sbin
export PATH

echo "Running $0";

mount -t proc proc /proc
mount -t sysfs sysfs /sys
mount -a

mkdir /var/socks /var/tmp /var/run /var/lib /var/fyi /var/asd /var/cache /var/log /var/mnt /var/unpacked

#Load also when lzma compressed
if [ -e /lib/modules/airties/air_msg.ko* ]; then
	insmod /lib/modules/airties/air_msg.ko
fi

if [ -e /lib/modules/airties/air_mcast_early_drop.ko* ]; then
	insmod /lib/modules/airties/air_mcast_early_drop.ko
fi

if [ -e /lib/modules/wireless/automesh.ko* ]; then
	insmod /lib/modules/wireless/automesh.ko
fi

for f in /*.tar.lzma; do
if [ -e $f ]; then
	echo unpacking $f;
	(cd /var/unpacked; cat /$f|unlzma|tar x);
fi
done

# Need to call before loading air_env 
if [ -x /etc/rc.d/rc.preenv ]; then
	. /etc/rc.d/rc.preenv
fi

insmod /lib/modules/airties/air_env.ko
insmod /lib/modules/airties/air_led.ko
insmod /lib/modules/airties/air_ethstats.ko

if [ -x /etc/rc.d/rc.tr069 ]; then
	. /etc/rc.d/rc.tr069
fi

if [ -x /etc/rc.d/rc.platform ]; then
	. /etc/rc.d/rc.platform
fi

if [ -x /etc/rc.d/rc.product ]; then
	/etc/rc.d/rc.product
fi

if [ -x /usr/bin/nand2nor_uboot_update ]; then
	/usr/bin/nand2nor_uboot_update
fi

if [ -x /usr/bin/check_cfg_reset ]; then
	/usr/bin/check_cfg_reset
fi

if [ -x /usr/bin/configconvert ]; then
	/usr/bin/configconvert
fi

if [ -x /usr/bin/dualimage ]; then
	/usr/bin/dualimage
fi

if [ -x /etc/rc.d/rc.opmode ]; then
	. /etc/rc.d/rc.opmode
fi

#if [ -x /etc/rc.d/rc.asp ]; then
	. /etc/rc.d/rc.asp
#fi

ln -s /var/log/log /dev/log
