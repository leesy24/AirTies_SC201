#!/bin/sh
# - Bahadir Dogan
#
# Revert LAN Settings for an AP device
# ====================================
# We assume AP devices are in DHCP Client mode by default.
# If it is needed to reset LAN settings, we set the LAN type as dhcpc again as it is in factory settings.

TYPE=`get_config lan-0 settings | grep settings.type | grep static`

# check if lan type is static
if [ -n "$TYPE" ]; then
	DHCPC_INST=`cli command devmgr-0:create_inst dhcpc | grep "dhcpc-[0-9]" -o`
	if [ -n "$DHCPC_INST" ]; then
		cli command cfgmgr-0:commit $DHCPC_INST
		cli command cfgmgr-0:end_transaction $DHCPC_INST

		
		set_config lan-0 type dhcpc
		set_config lan-0 dhcpc $DHCPC_INST

		STATIC_INST=`get_config lan-0 settings | grep "static-[0-9]" -o`
		cli command devmgr-0:stop_inst $STATIC_INST	
		cli command devmgr-0:delete_inst $STATIC_INST

		cli command cfgmgr-0:begin_transaction lan-0
		cli set lan-0:static
		cli command cfgmgr-0:commit lan-0
		cli command cfgmgr-0:end_transaction lan-0

		cli command devmgr-0:start_inst $DHCPC_INST
		cli command $DHCPC_INST:apply
	fi
else
	echo "Device is already in default mode(dhcpc)."
	dhcpc_inst_list=`cli query devmgr-0:inst_list dhcpc | grep dhcpc-[0-9] -o`
	for i in $dhcpc_inst_list;
	do
		cli command $i:apply
	done
fi
