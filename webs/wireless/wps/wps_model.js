var wirelessWpsModel =
{
	eventHandler: function(args)
	{
		switch(args.id)
		{
			case "wirelessWpsModel.parseAirTouchQuery":
				wirelessWpsModel.parseAirTouchQuery();
				break;
			case "wirelessWpsModel.parseCapabilitiesQuery":
				wirelessWpsModel.parseCapabilitiesQuery();
				break;
			case "wirelessWpsModel.parseFreqQuery":
				wirelessWpsModel.parseFreqQuery();
				break;
			case "wirelessWpsModel.parseInstListQuery":
				wirelessWpsModel.parseInstListQuery();
				break;
			case "wirelessWpsModel.parseOpModeQuery":
				wirelessWpsModel.parseOpModeQuery();
				break;
			case "wirelessWpsModel.parseWpsPinQuery":
				wirelessWpsModel.parseWpsPinQuery();
		}
	},
	
	instances: [],
	
	parseAirTouchQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].parseAirTouchQuery();
		}
	},
	
	parseCapabilitiesQuery: function()
	{
		global.log({functionName: "wirelessWpsModel.parseCapabilitiesQuery", message: "called!", level: 100});
		try
		{
			for(var i = 0; i < wirelessWpsModel.instances.length; i++)
			{
				wirelessWpsModel.instances[i].parseCapabilitiesQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessWpsModel.parseCapabilitiesQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
	},

	parseFreqQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].parseFreqQuery();
		}
	},
	
	parseInstListQuery: function()
	{
		wirelessWpsModel.instances = [];
		if(top.xmlResponseObject["devmgr-0"]["wireless_core.inst0"]) wirelessWpsModel.instances.push(new wirelessCore("wireless_core-0"));
		var i = 0;
		while(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i])
		{
			wirelessWpsModel.instances.push(new wirelessNg(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i]));
			i++;
		}
	},
	
	parseOpModeQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].parseOpModeQuery();
		}
	},

	
	parseWpsPinQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].parseWpsPinQuery();
		}
	},
	
	sendAirTouchQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].sendAirTouchQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseAirTouchQuery"});
	},
	
	sendCapabilitiesQuery: function()
	{
		global.log({functionName: "wirelessWpsModel.sendCapabilitiesQuery", message: "called!", level: 100});

		try
		{
			for(var i = 0; i < wirelessWpsModel.instances.length; i++)
			{
				wirelessWpsModel.instances[i].sendCapabilitiesQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessWpsModel.sendCapabilitiesQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}

		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseCapabilitiesQuery"});
	},

	sendFreqQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].sendFreqQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseFreqQuery"});
	},
	
	sendInstListQuery: function()
	{
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_core"});
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless"});
		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseInstListQuery"});
	},
	
	sendOpModeQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].sendOpModeQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseOpModeQuery"});
	},
	
	sendWpsPinQuery: function()
	{
		for(var i = 0; i < wirelessWpsModel.instances.length; i++)
		{
			wirelessWpsModel.instances[i].sendWpsPinQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessWpsModel", id: "wirelessWpsModel.parseWpsPinQuery"});
	}
}