var wirelessStatusModel =
{
	eventHandler: function(args)
	{
		switch(args.id)
		{
			case "wirelessStatusModel.parseApSecModeQuery":
				wirelessStatusModel.parseApSecModeQuery();
				break;
			case "wirelessStatusModel.parseApEnabledQuery":
				wirelessStatusModel.parseApEnabledQuery();
				break;
			case "wirelessStatusModel.parseApStaListQuery":
				wirelessStatusModel.parseApStaListQuery();
				break;
			case "wirelessStatusModel.parseAPListQuery":
				wirelessStatusModel.parseAPListQuery();
				break;
			case "wirelessStatusModel.parseCapabilitiesQuery":
				wirelessStatusModel.parseCapabilitiesQuery();
				break;
			case "wirelessStatusModel.parseLanSettingsQuery":
				wirelessStatusModel.parseLanSettingsQuery();
				break;
			case "wirelessStatusModel.parseEnabledQuery":
				wirelessStatusModel.parseEnabledQuery();
				break;
			case "wirelessStatusModel.parseFreqQuery":
				wirelessStatusModel.parseFreqQuery();
				break;
			case "wirelessStatusModel.parseInstListQuery":
				wirelessStatusModel.parseInstListQuery();
				break;
			case "wirelessStatusModel.parseSSIDQuery":
				wirelessStatusModel.parseSSIDQuery();
				break;
			case "wirelessStatusModel.runApQuery":
				wirelessStatusModel.runApQuery();
				break;
		}
	},
	
	instances: [],
	
	parseApSecModeQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.parseApSecModeQuery", message: "called!", level: 100});
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseApSecModeQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.parseApSecModeQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
	},
	
	parseApEnabledQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.parseApEnabledQuery", message: "called!", level: 100});
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseApEnabledQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.parseApEnabledQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
	},
	
	parseApStaListQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.parseApStaListQuery", message: "called!", level: 100});
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseApStaListQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.parseApStaListQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
	},

	parseAPListQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.parseAPListQuery", message: "called!", level: 100});
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseAPListQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.parseAPListQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
	},

	parseCapabilitiesQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.parseCapabilitiesQuery", message: "called!", level: 100});
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseCapabilitiesQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.parseCapabilitiesQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
	},
	
	parseLanSettingsQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.parseLanSettingsQuery", message: "called!", level: 100});
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseLanSettingsQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.parseLanSettingsQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
	},

	parseEnabledQuery: function()
	{
		for(var i = 0; i < wirelessStatusModel.instances.length; i++)
		{
			wirelessStatusModel.instances[i].parseEnabledQuery();
		}
	},
	
	parseFreqQuery: function()
	{
		for(var i = 0; i < wirelessStatusModel.instances.length; i++)
		{
			wirelessStatusModel.instances[i].parseFreqQuery();
		}
	},
	
	parseInstListQuery: function()
	{
		wirelessStatusModel.instances = [];
		if(top.xmlResponseObject["devmgr-0"]["wireless_core.inst0"]) wirelessStatusModel.instances.push(new wirelessCore("wireless_core-0"));
		var i = 0;
		while(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i])
		{
			wirelessStatusModel.instances.push(new wirelessNg(top.xmlResponseObject["devmgr-0"]["wireless.inst" + i]));
			i++;
		}
	},
	
	parseSSIDQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.parseSSIDQuery", message: "called!", level: 100});
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].parseSSIDQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.parseSSIDQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
	},
	
	sendApSecModeQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.sendApSecModeQuery", message: "called!", level: 100});
		
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendApSecModeQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.sendApSecModeQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseApSecModeQuery"});
	},
	
	sendApEnabledQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.sendApEnabledQuery", message: "called!", level: 100});
		
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendApEnabledQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.sendApEnabledQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseApEnabledQuery"});
	},
	
	sendApStaListQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.sendApStaListQuery", message: "called!", level: 100});
		
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendApStaListQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.sendApStaListQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseApStaListQuery"});
	},
	
	sendAPListQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.sendAPListQuery", message: "called!", level: 100});
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_ap"});
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseAPListQuery"});
	},
	
	sendCapabilitiesQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.sendCapabilitiesQuery", message: "called!", level: 100});
		
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendCapabilitiesQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.sendCapabilitiesQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseCapabilitiesQuery"});
	},
	
	sendLanSettingsQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.sendLanSettingsQuery", message: "called!", level: 100});
		
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendLanSettingsQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.sendLanSettingsQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseLanSettingsQuery"});
	},
	
	sendEnabledQuery: function()
	{
		for(var i = 0; i < wirelessStatusModel.instances.length; i++)
		{
			wirelessStatusModel.instances[i].sendEnabledQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseEnabledQuery"});
	},
	
	sendFreqQuery: function()
	{
		for(var i = 0; i < wirelessStatusModel.instances.length; i++)
		{
			wirelessStatusModel.instances[i].sendFreqQuery();
		}
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseFreqQuery"});
	},
	
	sendInstListQuery: function()
	{
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless_core"});
		globalModel.addQuery({instance: "devmgr-0", key: "inst_list", value: "wireless"});
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseInstListQuery"});
	},
	
	sendSSIDQuery: function()
	{
		global.log({functionName: "wirelessStatusModel.sendSSIDQuery", message: "called!", level: 100});
		
		try
		{
			for(var i = 0; i < wirelessStatusModel.instances.length; i++)
			{
				wirelessStatusModel.instances[i].sendSSIDQuery();
			}
		}
		catch(e)
		{
			global.log({functionName: "wirelessStatusModel.sendSSIDQuery", message: "ERROR!<error>".replace("<error>", e.message), level: 100});
		}
		
		globalModel.addEvent({eventHandler: "wirelessStatusModel", id: "wirelessStatusModel.parseSSIDQuery"});
	}
}