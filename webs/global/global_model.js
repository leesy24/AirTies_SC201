top.xmlResponseObject = {};

var globalModel =
{
	events: [],
	xmlCommands: [],
	xmlAfterSaveCommands: [],
	xmlFooter: "</xmlrequest>",
	xmlHeader: "<xmlrequest version='1.0.1'>\n",
	xmlResponse: "",
	xmlTransactions: {},
	xmlHasSetCommand: false,
	beginTransaction: true,

	addCommand: function(args)
	{
		args.commandType = "command";
		globalModel.addXML(args);
	},

	addAfterSaveCommand: function(args)
	{
		args.afterSave = true;
		globalModel.addCommand(args);
	},

	addAfterSaveQuery: function(args)
	{
		args.afterSave = true;
		globalModel.addQuery(args);
	},

	addEvent: function(args)
	{
		globalModel.events.push(args);
	},

	addGet: function(args)
	{
		args.transaction = args.instance;
		args.commandType = "get";
		globalModel.addXML(args);
	},

	addQuery: function(args)
	{
		args.commandType = "query";
		globalModel.addXML(args);
	},

	addSet: function(args)
	{
		args.transaction = args.instance
		args.commandType = "set";
		globalModel.addXML(args);
		globalModel.xmlHasSetCommand = true;
	},

	addSetForNewInstance: function(args)
	{
		args.transaction = args.instance
		args.commandType = "set";
		globalModel.addXML(args);
		globalModel.xmlHasSetCommand = true;
		globalModel.beginTransaction = false;
	},

	addXML: function(args)
	{
		if(args.transaction)
		{
			globalModel.xmlTransactions[args.transaction] = {};
		}

		args.value = args.value || "";

		if(args.afterSave)
		{
			globalModel.xmlAfterSaveCommands.push(args);
		}
		else
		{
			globalModel.xmlCommands.push(args);
		}
	},

	getValue: function(args)
	{
		args = args || {};
		args.instance = args.instance || "";
		args.key = args.key || "";


		var x;
		var i;
		var j;
		var found;

		if(typeof(globalModel.xmlResponse) != "object") return "";

		x = globalModel.xmlResponse.getElementsByTagName(args.instance);


		try
		{
			for(j=0;j<x.length;j++)
			{

				found = 0;
				for(i=0;i<x[j].childNodes.length;i++)
				{

					if(x[j].childNodes[i].nodeName == "key")
					{
						if(x[j].childNodes[i].childNodes[0].nodeValue == args.key)
							found = 1;
					}

					if(found)
					{
						if(x[j].childNodes[i].nodeName == "value")
							return x[j].childNodes[i].childNodes[0].nodeValue;
					}

				}
				if(found == 1)
					return "";
			}
		}

		catch(err)
		{
			return "";
		}

		return "";
	},

	getXmlBody: function()
	{
		var xmlBody = "";

		if(globalModel.beginTransaction)
		{
			for(var i in globalModel.xmlTransactions)
			{
				xmlBody += global.replaceAll({text: '<«commandType» inst="«instance»"><key>«key»</key><value>«value»</value></«commandType»>\n', search: "«commandType»", replace: "command"}).replace("«instance»", "cfgmgr-0").replace("«key»", "begin_transaction").replace("«value»", i);
			}
		}

		for(var i = 0; i < globalModel.xmlCommands.length; i++)
		{
			xmlBody += global.replaceAll({text: '<«commandType» inst="«instance»"><key>«key»</key><value>«value»</value></«commandType»>\n', search: "«commandType»", replace: globalModel.xmlCommands[i].commandType}).replace("«instance»", globalModel.xmlCommands[i].instance).replace("«key»", globalModel.xmlCommands[i].key).replace("«value»", globalModel.xmlCommands[i].value);
		}

		for(var i in globalModel.xmlTransactions)
		{
			xmlBody += global.replaceAll({text: '<«commandType» inst="«instance»"><key>«key»</key><value>«value»</value></«commandType»>\n', search: "«commandType»", replace: "command"}).replace("«instance»", "cfgmgr-0").replace("«key»", "commit").replace("«value»", i);
		}

		for(var i in globalModel.xmlTransactions)
		{
			xmlBody += global.replaceAll({text: '<«commandType» inst="«instance»"><key>«key»</key><value>«value»</value></«commandType»>\n', search: "«commandType»", replace: "command"}).replace("«instance»", "cfgmgr-0").replace("«key»", "end_transaction").replace("«value»", i);
		}

		if(globalModel.xmlHasSetCommand) xmlBody += global.replaceAll({text: '<«commandType» inst="«instance»"><key>«key»</key><value>«value»</value></«commandType»>\n', search: "«commandType»", replace: "command"}).replace("«instance»", "cfgmgr-0").replace("«key»", "save").replace("«value»", "");

		for(var i = 0; i < globalModel.xmlAfterSaveCommands.length; i++)
		{
			xmlBody += global.replaceAll({text: '<«commandType» inst="«instance»"><key>«key»</key><value>«value»</value></«commandType»>\n', search: "«commandType»", replace: globalModel.xmlAfterSaveCommands[i].commandType}).replace("«instance»", globalModel.xmlAfterSaveCommands[i].instance).replace("«key»", globalModel.xmlAfterSaveCommands[i].key).replace("«value»", globalModel.xmlAfterSaveCommands[i].value);
		}

		return xmlBody;
	},

	getXmlDoc: function()
	{
		var xmlDoc;
		if(window.ActiveXObject)
		{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(globalModel.getXmlString());
		}
		else if(document.implementation.createDocument)
		{
			var parser = new DOMParser();
			xmlDoc = parser.parseFromString(globalModel.getXmlString(), "text/xml");
		}
		return xmlDoc;
	},

	getXmlString: function()
	{
		return "<header><body><footer>".replace("<header>", globalModel.xmlHeader).replace("<body>", globalModel.getXmlBody()).replace("<footer>", globalModel.xmlFooter);
	},

	init: function()
	{
		globalModel.events = [];
		globalModel.xmlCommands = [];
		globalModel.xmlAfterSaveCommands = [];
		globalModel.xmlTransactions = {};
		globalModel.xmlHasSetCommand = false;
		globalModel.beginTransaction = true;
	},

	logRequest: function()
	{
		global.log({functionName: "globalModel.logRequest", message: globalModel.getXmlString(), level: 100});
	},

	logResponse: function()
	{
		if(global.logMode != "NONE")
		{
			var serializer = new XMLSerializer();
			var xml = serializer.serializeToString(globalModel.xmlResponse);

			var arr = [{search: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n", replace: ""}, {search: "<response version=\"1.0.1\">\n", replace: ""}, {search: "</response>", replace: ""}, {search: "&lt;", replace: "<"}, {search: "&gt;", replace: ">"}, {search: "<br>", replace: "\n"}, /*{search: ">", replace: "»\n\t\t"}, {search: "»", replace: ">"}, */{search: "><", replace: ">\n\t <"}];
			for(var i = 0; i < arr.length; i++)
			{
				xml = global.replaceAll({text: xml, search: arr[i].search, replace: arr[i].replace});
			}
			xml = "\n" + xml;
			global.log({functionName: "globalModel.logResponse", message: xml, level: 100});
		}
	},

	parseXmlResponse: function()
	{
			top.xmlResponseObject = {};
			var keys = globalModel.xmlResponse.getElementsByTagName("key");
			var values = globalModel.xmlResponse.getElementsByTagName("value");

			for(var i = 0; i < keys.length; i++)
			{
				top.xmlResponseObject[keys[i].parentNode.nodeName] = top.xmlResponseObject[keys[i].parentNode.nodeName] || {};
				top.xmlResponseObject[keys[i].parentNode.nodeName][keys[i].childNodes[0].nodeValue.toString()] = (values[i].childNodes.length > 0) ? values[i].childNodes[0].nodeValue.toString() : "";
			}
	},

	sendAjax: function()
	{
// 		globalModel.logRequest();
		var xmlDoc = globalModel.getXmlDoc();
		$.ajax({
			url: "/cgi-bin/webapp",
			type: "POST",
			processData: false,
			data: xmlDoc,
			dataType: "xml",
			success: function(data)
			{


				queryStatus = 0;
				globalModel.xmlResponse = data;
				globalModel.parseXmlResponse();
// 				alert("success");
				var chkSession = globalModel.getValue({instance: "webapp", key: "error"});
				var sessionError = false;
				var forceToChangePassword = false;
				if(chkSession != "")
				{
					switch(chkSession)
					{
						case "1":
							sessionError = true;
							break;
						case "23":
							forceToChangePassword = true;
							break;
						default:
							sessionError = false;
							break ;
					}
				}
				else
				{
					sessionError = false;
				}
				if(sessionError)
				{
					top.location.href = "/login.html";
				}
				else if(forceToChangePassword)
				{
					if(typeof top.frames["mainFrame"] === "undefined")
						top.location.href = "/management/ui_password.html";
					else
						top.frames["mainFrame"].location = "/management/ui_password.html";
				}
				else
				{
					var eventArray = globalModel.events.slice();
					globalModel.init();
					global.raiseEvents(eventArray);
				}
			}
		});
	}
}