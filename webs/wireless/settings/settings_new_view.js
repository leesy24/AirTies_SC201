var wirelessSettingsView =
{
	managerTab:
	{
		managerTab: "",
		managerTabId: "",
		topTable: "",
		apTables: [],
		timeOutObj: "",

		addRow:
		{
			wpsPin: function(index)
			{
				if(__DEF_WirelessWpsSupport == "1")
				{
					var instance = wirelessSettingsView.instances[index];
					var mt = wirelessSettingsView.managerTab;
	
					instance.wpsPinControlId = mt.getId.wpsPinControlId(index);
					instance.wpsPinLabelId = mt.getId.wpsPinLabelId(index);
	
					var wpsPinSpanTemplate = "<span id='<id>' ml='__ML_WPS_PIN'></span>";
					var wpsPinControlTemplate = "<span id='<id>'></span>";
	
	
					var row = $("<tr></tr>").appendTo(wirelessSettingsView.managerTab.topTable);
	
					$("<td></td>").append(wpsPinSpanTemplate.replace("<id>", instance.wpsPinLabelId)).appendTo(row);
	
					var wpsPinCell = $("<td></td>").appendTo(row);
	
					wpsPinCell.append(wpsPinControlTemplate.replace("<id>", instance.wpsPinControlId));
				}
			},

			airTouch: function(index)
			{
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;

				instance.airTouchControlId = mt.getId.airTouchControlId(index);
				instance.airTouchLabelId = mt.getId.airTouchLabelId(index);

				var airTouchSpanTemplate = "<span id='<id>' ml='__ML_touch_caption'></span>";
				var airTouchControlTemplate = "<input type='checkbox' id='<id>'/>";


				var row = $("<tr></tr>").appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(airTouchSpanTemplate.replace("<id>", instance.airTouchLabelId)).appendTo(row);

				var airTouchCell = $("<td></td>").appendTo(row);

				airTouchCell.append(airTouchControlTemplate.replace("<id>", instance.airTouchControlId));
			},

			chanbw: function(index)
			{
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;

				instance.chanbwControlId = mt.getId.chanbwControlId(index);
				instance.chanbwLabelId = mt.getId.chanbwLabelId(index);

				var chanbwSpanTemplate = "<span id='<id>' ml='__ML_bandwith'></span>";
				var chanbwComboTemplate = "<select id='<id>' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.chanbw_changed\"});'></select>";


				var row = $("<tr></tr>").appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(chanbwSpanTemplate.replace("<id>", instance.chanbwLabelId)).appendTo(row);

				var chanbwCell = $("<td></td>").appendTo(row);

				chanbwCell.append(chanbwComboTemplate.replace("<id>", instance.chanbwControlId).replace("<index>", index));
			},
			channel: function(index)
			{
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;

				instance.channelControlId = mt.getId.channelControlId(index);
				instance.channelLabelId = mt.getId.channelLabelId(index);

				var channelSpanTemplate = "<span id='<id>' ml='__ML_freq_channel_caption'></span>";
				var channelComboTemplate = "<select id='<id>'></select>";


				var row = $("<tr></tr>").appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(channelSpanTemplate.replace("<id>", instance.channelLabelId)).appendTo(row);

				var channelCell = $("<td></td>").appendTo(row);

				channelCell.append(channelComboTemplate.replace("<id>", instance.channelControlId));
			},
			freq: function(index)
			{
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;


				instance.freqSpanId = mt.getId.freqLabel(index);
				instance.freqControlId = mt.getId.freqControl(index);
				instance.freqSpanValueId = mt.getId.freqSpanValue(index);
				instance.freqComboOptionIdTemplate = mt.getTemplate.freqComboOptionId(index);

				var freqSpanTemplate = "<span id='<id>' ml='__ML_frequency'></span>";
				var freqComboTemplate = "<select id='<id>' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.freq_changed\", index: <index>});'></select>";
				var freqComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";
				var freqSpanValueTemplate = "<span id='<id>'><text></span>";

				var row = $("<tr></tr>").appendTo(mt.topTable);

				$("<td></td>").append(freqSpanTemplate.replace("<id>", instance.getFreqLabelId)).appendTo(row);

				var freqCell = $("<td></td>").appendTo(row);
				freqCell.append(global.replaceAll({text: freqComboTemplate.replace("<id>", instance.freqControlId), search: "<index>", replace: index.toString()}));

				var counter = 0;
				for(var freq in instance.freqs)
				{
					if(counter == 0) freqCell.append(freqSpanValueTemplate.replace("<id>", instance.freqSpanValueId).replace("<text>", instance.freqs[freq].text));
					var freqComboOptionId = instance.freqComboOptionIdTemplate.replace("<freq>", freq);
					$("#" + instance.freqControlId).append(freqComboOptionTemplate.replace("<value>", freq).replace("<id>", freqComboOptionId).replace("<text>", instance.freqs[freq].text));
					counter++;
				}

				if(counter > 1)
				{
					$("#" + wirelessSettingsView.instances[index].freqSpanValueId).hide();
				}
				else
				{
					$("#" + wirelessSettingsView.instances[index].freqControlId).hide();
				}
			},
			mode: function(index)
			{
				var modeSpanId = "span_mode";
				wirelessSettingsView.instances[index].modeControlId = wirelessSettingsView.managerTab.getId.modeControl(index);


				if(index > 0)
				{
					modeSpanId = "span_mode_<index>".replace("<index>", index);
				}

				var modeSpanTemplate = "<span id='<id>' ml='__ML_freq_mode_caption'></span>";
				var modeComboTemplate = "<select id='<id>' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.mode_changed\", index: <index>});'></select>";

				var row = $("<tr></tr>").appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(modeSpanTemplate.replace("<id>", modeSpanId)).appendTo(row);

				var modeCell = $("<td></td>").appendTo(row);

				modeCell.append(global.replaceAll({text: modeComboTemplate, search: "<index>", replace: index.toString()}).replace("<id>", wirelessSettingsView.instances[index].modeControlId));
			},

			rate: function(index)
			{
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;

				instance.rateSpanId = mt.getId.rateLabelId(index);
				instance.rateControlId = mt.getId.rateControlId(index);

				var rateSpanTemplate = "<span id='<id>' ml='__ML_rates_caption'></span>";
				var rateComboTemplate = "<select id='<id>'></select>";


				var row = $("<tr></tr>").appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(rateSpanTemplate.replace("<id>", instance.rateSpanId)).appendTo(row);

				var rateCell = $("<td></td>").appendTo(row);

				rateCell.append(rateComboTemplate.replace("<id>", instance.rateControlId));
			},

			txpower: function(index)
			{
				var instance = wirelessSettingsView.instances[index];
				var mt = wirelessSettingsView.managerTab;

				instance.txpowerSpanId = mt.getId.txpowerLabelId(index);
				instance.txpowerControlId = mt.getId.txpowerControlId(index);

				var txpowerSpanTemplate = "<span id='<id>' ml='__ML_freq_power_caption'></span>";
				var txpowerComboTemplate = "<select id='<id>'></select>";


				var row = $("<tr></tr>").appendTo(wirelessSettingsView.managerTab.topTable);

				$("<td></td>").append(txpowerSpanTemplate.replace("<id>", instance.txpowerSpanId)).appendTo(row);

				var txpowerCell = $("<td></td>").appendTo(row);

				txpowerCell.append(txpowerComboTemplate.replace("<id>", instance.txpowerControlId));
			}
		},
		setOptions: {
			chanbw: function(index)
			{
				var chanbwComboOptionIdTemplate = "opt_chanbw_<chanbw>";
				var chanbwComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";
				var chanbwComboId = "cmb_chanbw";

				if(index > 0)
				{
					chanbwComboOptionIdTemplate = "opt_chanbw_<index>_<chanbw>".replace("<index>", index);
					chanbwComboId = "cmb_chanbw_<index>".replace("<index>", index);
				}

				$("#" + chanbwComboId).html("");

				var selectedMode = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)].modes[wirelessSettingsView.managerTab.get.mode(index)];

				for(var chanbw in selectedMode.chanbws)
				{
					$("#" + chanbwComboId).append(chanbwComboOptionTemplate.replace("<value>", chanbw).replace("<id>", chanbwComboOptionIdTemplate.replace("<chanbw>", chanbw)).replace("<text>", selectedMode.chanbws[chanbw].text));
				}

				$("#" + chanbwComboId).val(selectedMode.defaultChannelBw);
			},

			channel: function(index)
			{
				var channelComboOptionIdTemplate = "opt_channel_<channel>";
				var channelComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";
				var channelComboId = "cmb_channel";

				if(index > 0)
				{
					channelComboOptionIdTemplate = "opt_channel_<index>_<channel>".replace("<index>", index);
					channelComboId = "cmb_channel_<index>".replace("<index>", index);
				}

				$("#" + channelComboId).html("");
				var selectedFreq = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)];
				for(var i = 0; i < selectedFreq.channels.length; i++)
				{
					$("#" + channelComboId).append(channelComboOptionTemplate.replace("<value>", selectedFreq.channels[i].code).replace("<id>", channelComboOptionIdTemplate.replace("<channel>", selectedFreq.channels[i].code)).replace("<text>", selectedFreq.channels[i].text));

					if(!isNaN(selectedFreq.channels[i].code))
					{
						if(selectedFreq.minChannel == undefined || parseInt(selectedFreq.minChannel) > parseInt(selectedFreq.channels[i].code)) selectedFreq.minChannel = selectedFreq.channels[i].code;
						if(selectedFreq.maxChannel == undefined || parseInt(selectedFreq.maxChannel) < parseInt(selectedFreq.channels[i].code)) selectedFreq.maxChannel = selectedFreq.channels[i].code;
					}
				}

				$("#" + channelComboId).val(selectedFreq.defaultChannel);

			},
			mode: function(index)
			{
				var modeComboOptionIdTemplate = "opt_mode_<mode>";
				var modeComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";


				if(index > 0)
				{
					modeComboOptionIdTemplate = "opt_mode_<index>_<mode>".replace("<index>", index);
				}


				$("#" + wirelessSettingsView.instances[index].modeControlId).html("");

				var selectedFreq = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)];

				for(var i in selectedFreq.modes)
				{
					$("#" + wirelessSettingsView.instances[index].modeControlId).append(modeComboOptionTemplate.replace("<value>", i).replace("<id>", modeComboOptionIdTemplate.replace("<mode>", i)).replace("<text>", selectedFreq.modes[i].text));
				}
				wirelessSettingsView.managerTab.set.mode(index, selectedFreq.defaultMode);
			},

			rate: function(index)
			{
				var chanbwComboId = "cmb_chanbw";
				var rateComboOptionIdTemplate = "opt_rate_<rate>";
				var rateComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";
				var rateComboId = "cmb_rate";

				if(index > 0)
				{
					chanbwComboId = "cmb_chanbw_<index>".replace("<index>", index);
					rateComboOptionIdTemplate = "opt_rate_<index>_<rate>".replace("<index>", index);
					rateComboId = "cmb_rate_<index>".replace("<index>", index);
				}

				var chanbw = $("#" + chanbwComboId).val();

				$("#" + rateComboId).html("");
				var selectedChanbw = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)].modes[wirelessSettingsView.managerTab.get.mode(index)].chanbws[chanbw];
				for(var rate in selectedChanbw.sortedRates)
				{
					$("#" + rateComboId).append(rateComboOptionTemplate.replace("<value>", selectedChanbw.sortedRates[rate]).replace("<id>", rateComboOptionIdTemplate.replace("<rate>", selectedChanbw.sortedRates[rate])).replace("<text>", selectedChanbw.rates[selectedChanbw.sortedRates[rate]].text));
				}

				$("#" + rateComboId).hide().show();
			},

			txpower: function(index)
			{
				var txpowerComboOptionIdTemplate = "opt_txpower_<txpower>";
				var txpowerComboOptionTemplate = "<option value='<value>' id='<id>'><text></option>";
				var txpowerComboId = "cmb_txpower";

				if(index > 0)
				{
					txpowerComboOptionIdTemplate = "opt_txpower_<index>_<txpower>".replace("<index>", index);
					txpowerComboId = "cmb_txpower_<index>".replace("<index>", index);
				}

				$("#" + txpowerComboId).html("");

				var selectedFreq = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)];

				for(var i = 0; i < selectedFreq.txpowers.length; i++)
				{
					$("#" + txpowerComboId).append(txpowerComboOptionTemplate.replace("<value>", selectedFreq.txpowers[i].code).replace("<id>", txpowerComboOptionIdTemplate.replace("<txpower>", selectedFreq.txpowers[i].code)).replace("<text>", selectedFreq.txpowers[i].text));
				}
			}
		},


		getId: {
			wpsPinControlId: function(index)
			{
				if(index > 0)
				{
					return "wps_pin_<index>".replace("<index>", index);
				}
				else
				{
					return "wps_pin";
				}
			},

			wpsPinLabelId: function(index)
			{
				if(index > 0)
				{
					return "wps_pin_label_<index>".replace("<index>", index);
				}
				else
				{
					return "wps_pin_label";
				}
			},

			airTouchControlId: function(index)
			{
				if(index > 0)
				{
					return "cmb_touch_<index>".replace("<index>", index);
				}
				else
				{
					return "cmb_touch";
				}
			},

			airTouchLabelId: function(index)
			{
				if(index > 0)
				{
					return "span_airtouch_<index>".replace("<index>", index);
				}
				else
				{
					return "span_airtouch";
				}
			},

			chanbwControlId: function(index)
			{
				if(index > 0)
				{
					return "cmb_chanbw_<index>".replace("<index>", index);
				}
				else
				{
					return "cmb_chanbw";
				}
			},

			chanbwLabelId: function(index)
			{
				if(index > 0)
				{
					return "span_chanbw_<index>".replace("<index>", index);
				}
				else
				{
					return "span_chanbw";
				}
			},

			channelControlId: function(index)
			{
				if(index > 0)
				{
					return "cmb_channel_<index>".replace("<index>", index);
				}
				else
				{
					return "cmb_channel";
				}
			},

			channelLabelId: function(index)
			{
				if(index > 0)
				{
					return "span_channel_<index>".replace("<index>", index);
				}
				else
				{
					return "span_channel";
				}
			},

			freqSpanValue: function(index)
			{
				if(index > 0)
				{
					return "span_<index>_freqValue".replace("<index>", index);
				}
				else
				{
					return "span_freqValue";
				}
			},

			freqLabel: function(index)
			{
				if(index > 0)
				{
					return "span_freq_<index>".replace("<index>", index);
				}
				else
				{
					return "span_freq";
				}
			},

			freqControl: function(index)
			{
				if(index > 0)
				{
					return "cmb_freq_<index>".replace("<index>", index);
				}
				else
				{
					return "cmb_freq";
				}
			},

			modeControl: function(index)
			{
				if(index > 0)
				{
					return "cmb_mode_<index>".replace("<index>", index);
				}
				else
				{
					return "cmb_mode";
				}
			},

			rateControlId: function(index)
			{
				if(index > 0)
				{
					return "cmb_rate_<index>".replace("<index>", index);
				}
				else
				{
					return "cmb_rate";
				}
			},

			rateLabelId: function(index)
			{
				if(index > 0)
				{
					return "span_rate_<index>".replace("<index>", index);
				}
				else
				{
					return "span_rate";
				}
			},

			txpowerControlId: function(index)
			{
				if(index > 0)
				{
					return "cmb_txpower_<index>".replace("<index>", index);
				}
				else
				{
					return "cmb_txpower";
				}
			},

			txpowerLabelId: function(index)
			{
				if(index > 0)
				{
					return "span_txpower_<index>".replace("<index>", index);
				}
				else
				{
					return "span_txpower";
				}
			},

			apTable:
			{
				instance_index: 0,
				ap_index: 0,
				getEnabledDivId: function()
				{
					if(this.instance_index > 0)
					{
						return "div_cb_enabled_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					}
					else
					{
						return "div_cb_enabled«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getEnabledCheckboxId: function()
				{
					if(this.instance_index > 0)
					{
						return "cb_enabled_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					}
					else
					{
						return "cb_enabled_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getSsidTextboxId: function()
				{
					if(this.instance_index > 0)
					{
						return "txt_ssid_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					}
					else
					{
						return "txt_ssid_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getHiddenDivId: function()
				{
					if(this.instance_index > 0)
					{
						return "div_cb_hidden_ssid_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					}
					else
					{
						return "div_cb_hidden_ssid«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getHiddenCheckboxId: function()
				{
					if(this.instance_index > 0)
					{
						return "cb_hidden_ssid_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					}
					else
					{
						return "cb_hidden_ssid_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getUserIsolationDivId: function()
				{
					if(this.instance_index > 0)
					{
						return "div_cb_user_isolation_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					}
					else
					{
						return "div_cb_user_isolation«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getUserIsolationCheckboxId: function()
				{
					if(this.instance_index > 0)
					{
						return "cb_user_isolation_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					}
					else
					{
						return "cb_user_isolation_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getSecurityModeComboId: function()
				{
					if(this.instance_index > 0)
					{
						return "sec_mode_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					}
					else
					{
						return "sec_mode_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				},

				getPasswordTextboxId: function()
				{
					if(this.instance_index > 0)
					{
						return "app_sec_password_«instance_index»_«ap_index»".replace("«instance_index»", this.instance_index).replace("«ap_index»", this.ap_index);
					}
					else
					{
						return "app_sec_password_«ap_index»".replace("«ap_index»", this.ap_index);
					}
				}
			}

		},

		getTemplate: {
			freqComboOptionId: function(index)
			{
				if(index > 0)
				{
					return "opt_freq_<index>_<freq>".replace("<index>", index);
				}
				else
				{
					return "opt_freq_<freq>";
				}
			}
		},

		set: {
			wpsPin: function(index, value)
			{
				return $("#" + wirelessSettingsView.instances[index].wpsPinControlId).html(value);
			},

			airTouch: function(index, value)
			{
				return $("#" + wirelessSettingsView.instances[index].airTouchControlId).attr("checked", value);
			},

			chanbw: function(index, value)
			{
				$("#" + wirelessSettingsView.instances[index].chanbwControlId).val(value);
				global.raiseEvent({eventHandler: "wirelessSettingsController", id: "wirelessSettingsController.chanbw_changed", index: index});
			},

			channel: function(index, value)
			{
				$("#" + wirelessSettingsView.instances[index].channelControlId).val(value);
				global.raiseEvent({eventHandler: "wirelessSettingsController", id: "wirelessSettingsController.channel_changed", index: index});
			},

			freq: function(index, value)
			{
				$("#" + wirelessSettingsView.instances[index].freqControlId).val(value);
				global.raiseEvent({eventHandler: "wirelessSettingsController", id: "wirelessSettingsController.freq_changed", index: index})
			},

			mode: function(index, value)
			{
				$("#" + wirelessSettingsView.instances[index].modeControlId).val(value);
			},

			txpower: function(index, value)
			{
				$("#" + wirelessSettingsView.instances[index].txpowerControlId).val(value);
			},

			password: function(instance_index, ap_index)
			{
				var getId = wirelessSettingsView.managerTab.getId.apTable;
				getId.instance_index = instance_index;
				getId.ap_index = ap_index;

				var ap = wirelessSettingsView.instances[instance_index].aps[ap_index];
				var value = "";

				var disabled = false;

				switch($("#" + getId.getSecurityModeComboId()).val())
				{
					case "off":
						disabled = true;
						break;
					case "wep":
						value = ap["wep_key" + ap.wep_key_index_for_functions];
						break;
					case "wpa":
					case "wpa2":
					case "wpa_both":
						if(ap.wpa_auth_type == "1")
						{
							value = ap.wpa_radius_key;
						}
						else
						{
							value = ap.wpa_password;
						}
						break;
				}

				$("#" + getId.getPasswordTextboxId()).attr("disabled", disabled);

				$("#" + getId.getPasswordTextboxId()).val(value);
			},

			opMode: function(index, value)
			{
				$("#" + (index == 0 ? "cmb_operating_mode" : "cmb_operating_mode_" + index)).val(value);
				global.raiseEvent({eventHandler: "wirelessSettingsController", id: "wirelessSettingsController.operationMode_changed", index: index});
			},
			
			mainSsidHidden: function(index, apIndex, value)
			{
				var getId = wirelessSettingsView.managerTab.getId.apTable;
				
				getId.instance_index = index;
				getId.ap_index = apIndex;
				
				$("#" + getId.getHiddenCheckboxId()).attr("checked", value);
			}
		},

		get: {
			airTouch: function(index)
			{
				return $("#" + wirelessSettingsView.instances[index].airTouchControlId).is(":checked");
			},

			chanbw: function(index)
			{
				return $("#" + wirelessSettingsView.instances[index].chanbwControlId).val();
			},

			channel: function(index)
			{
				return $("#" + wirelessSettingsView.instances[index].channelControlId).val();
			},

			freq: function(index)
			{
				return $("#" + wirelessSettingsView.instances[index].freqControlId).val();
			},

			mode: function(index)
			{
				return $("#" + wirelessSettingsView.instances[index].modeControlId).val();
			},

			txpower: function(index)
			{
				return $("#" + wirelessSettingsView.instances[index].txpowerControlId).val();
			},

			opMode: function(index)
			{
				return $("#" + (index == 0 ? "cmb_operating_mode" : "cmb_operating_mode_" + index)).val();
			}

		},

		addApRows: function(index)
		{
			var getId = wirelessSettingsView.managerTab.getId.apTable;
			getId.instance_index = index;

			for(var i = 0; i < wirelessSettingsView.instances[index].aps.length; i++)
			{
				getId.ap_index = i;
				var rowString = "";
				rowString += "<tr>";
				rowString += "	<td><div class='textCenter' id='" + getId.getEnabledDivId() + "'><input id='" + getId.getEnabledCheckboxId() + "' type='checkbox' " + (i == 0 ? "style='display: none; '" : "") + " checked='checked'></div></td>";
				rowString += "	<td><input id='" + getId.getSsidTextboxId() + "' type='text' size='20' maxlength='32'></td>";
				rowString += "	<td><div class='textCenter' id='" + getId.getHiddenDivId() + "'><input id='" + getId.getHiddenCheckboxId() + "' type='checkbox'></div></td>";
				rowString += "	<td><div class='textCenter' id='" + getId.getUserIsolationDivId() + "'><input id='" + getId.getUserIsolationCheckboxId() + "' type='checkbox'></div></td>";
				rowString += "	<td>";
				rowString += "		<select name='" + getId.getSecurityModeComboId() + "' id='" + getId.getSecurityModeComboId() + "' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.secMode_changed\", index: " + index + ", ap_index: " + i + "});'>";
				rowString += "			<option value='off' selected='selected' ml='__ML_wireless_security_mode_no_encryption'></option>";
				if(wirelessSettingsView.instances[index].pollableSecurityModes.wpa_both)
				{
				rowString += "			<option value='wpa_both' ml='__ML_both'></option>";
				}
				if(wirelessSettingsView.instances[index].pollableSecurityModes.wpa)
				{
				rowString += "			<option value='wpa'>WPA</option>";
				}
				rowString += "			<option value='wpa2'>WPA2</option>";
				if(wirelessSettingsView.instances[index].pollableSecurityModes.wep)
				{
				rowString += "			<option value='wep'>WEP</option>";
				}
				rowString += "		</select>";
				rowString += "	</td>";
				rowString += "	<td><input type='input' id='" + getId.getPasswordTextboxId() + "' style='display:block; width:150px' class='regexValidate' disabled=''></td>";
				rowString += "</tr>";
				wirelessSettingsView.managerTab.apTables[index].append(rowString);
			}
		},

		setApRows: function(index)
		{
			var getId = wirelessSettingsView.managerTab.getId.apTable;
			var aps = wirelessSettingsView.instances[index].aps;

			for(var i = 0; i < aps.length; i++)
			{
				getId.instance_index = index;
				getId.ap_index = i;
				$("#" + getId.getSsidTextboxId()).val(aps[i].ssid);
				$("#" + getId.getSecurityModeComboId()).val(aps[i].sec_mode);
				$("#" + getId.getHiddenCheckboxId()).attr("checked", aps[i].ssid_hidden);
				$("#" + getId.getEnabledCheckboxId()).attr("checked", aps[i].enabled);
				$("#" + getId.getUserIsolationCheckboxId()).attr("checked", aps[i].isolation);
				$("#" + wirelessSettingsView.instances[index].rateControlId).val(aps[i].rate);
				global.raiseEvent({eventHandler: "wirelessSettingsController", id: "wirelessSettingsController.secMode_changed", index: index, ap_index: i});
			}

		},

		getApValues: function(instance_index, ap_index)
		{
			var getId = wirelessSettingsView.managerTab.getId.apTable;
			getId.instance_index = instance_index;
			getId.ap_index = ap_index;
			var tempObj = {};
			tempObj.ssid = $("#" + getId.getSsidTextboxId()).val();
			tempObj.sec_mode = $("#" + getId.getSecurityModeComboId()).val();
			tempObj.ssid_hidden = $("#" + getId.getHiddenCheckboxId()).is(":checked");
			tempObj.enabled = $("#" + getId.getEnabledCheckboxId()).is(":checked");
			tempObj.isolation = $("#" + getId.getUserIsolationCheckboxId()).is(":checked");
			tempObj.rate = $("#" + wirelessSettingsView.instances[instance_index].rateControlId).val();


			var password = $("#" + getId.getPasswordTextboxId()).val();
			switch($("#" + getId.getSecurityModeComboId()).val())
			{
				case "wep":
					tempObj["wep_key" + wirelessSettingsView.instances[instance_index].aps[ap_index].wep_key_index_for_functions] = password;
					break;
				case "wpa":
				case "wpa2":
				case "wpa_both":
					if(wirelessSettingsView.instances[instance_index].aps[ap_index].wpa_auth_type == "enterprise")
					{
						tempObj.wpa_radius_key = password;
					}
					else
					{
						tempObj.wpa_password = password;
					}
					break;
			}

			return tempObj;
		},


		addTab: function(index)
		{
			wirelessSettingsView.managerTab.managerTabId = "tabs-" + index;

			wirelessSettingsView.managerTab.managerTab = $("<div id='" + wirelessSettingsView.managerTab.managerTabId + "'></div>").appendTo("#tabs");

			wirelessSettingsView.addOpModeDiv(index);


			var temp = "<div id='" + (index == 0 ? "div_please_wait_for_process" : "div_please_wait_for_process_" + index) + "' class='center'>";
			temp += "	<span id='" + (index == 0 ? "__ML_wireless_operating_mode_ap_searching_message" : "__ML_wireless_operating_mode_ap_searching_message_" + index) + "' ml='__ML_wireless_operating_mode_ap_searching_message' class='large'></span>";
			temp += "	<br /><img src='/images/ajax-loader3.gif' alt='Please wait.' border='0' />";
			temp += "</div>";
			temp += "<div class='wirelessSettingsApTableDiv'>";
			temp += "	<table id='" + (index == 0 ? "apTable" : "apTable_" + index) + "' class='marginCenter wirelessSettingsBridgeModeApTable globalBorder'>";
			temp += "		<tbody id='apRows'></tbody>";
			temp += "	</table>";
			temp += "</div>";
			temp += "	<div id='apTableManualDiv' class='marginCenter wirelessSettingsBridgeModeApTable'>";
			temp += "	<strong><a href='#manualConfiguration' onclick='wirelessSettingsView.showHideManualConfiguration();'><span id='__ML_wireless_operating_mode_manual_configuration' ml='__ML_wireless_operating_mode_manual_configuration'></span></a></strong>";
			temp += "	<a name='manualConfiguration'></a>";
			temp +=	"	<table id='apTableManual' class='marginCenter wirelessSettingsBridgeModeApTable globalBorder' style='display:none'>";
			temp +=	"		<thead>";
			temp +=	"			<tr>";
			temp +=	"				<th><span id='__ML_wireless_operating_mode_manual_ssid' ml='__ML_wireless_operating_mode_manual_ssid'></span></th>";
			temp +=	"				<th><span id='__ML_wireless_operating_mode_manual_security' ml='__ML_wireless_operating_mode_manual_security'></span></th>";
			temp +=	"				<th><span id='__ML_wireless_operating_mode_station_mode_ap_password' ml='__ML_wireless_operating_mode_station_mode_ap_password'></span></th>";
			temp +=	"			</tr>";
			temp +=	"		</thead>";
			temp +=	"		<tbody id='apRowsManual'>";
			temp +=	"			<tr>";
			temp +=	"				<td>";
			temp +=	"					<input id='__V_wireless_operating_mode_ap_ssid_manual' type='text' />";
			temp +=	"				</td>";
			temp +=	"				<td>";
			temp +=	"					<select id='cmb_security_mode_manual'  onchange='wirelessSettingsView.changeSecurityModeManual();'>";
			temp +=	"						<option value='wpa2'>WPA2</option>";
			temp +=	"						<option value='wpa'>WPA</option>";
			temp +=	"						<option value='wep'>WEP</option>";
			temp +=	"						<option value='off' id='__ML_wireless_security_mode_no_encryption' ml='__ML_wireless_security_mode_no_encryption'></option>";
			temp +=	"					</select>";
			temp +=	"				</td>";
			temp +=	"				<td>";
			temp +=	"					<input id='__V_wireless_operating_mode_ap_password_manual' type='password' />";
			temp +=	"				</td>";
			temp +=	"			</tr>";
			temp +=	"			<tr>";
			temp +=	"				<td colspan='3' class='textRight'>";
			temp +=	"					<input id='btnBridgeManualConnectAp_" + index + "' type='button' value='"+globalView.getMultiLanguageText('__ML_wireless_operating_mode_station_mode_ap_connect')+"' onclick='wirelessSettingsView.turnToBridgeMode(" + index + ");'/><input id='btnBridgeManualCancelAp_" + index + "' type='button' value='"+globalView.getMultiLanguageText('__ML_wireless_operating_mode_station_mode_ap_cancel')+"' onclick='wirelessSettingsView.showHideManualConfiguration();' />";
			temp +=	"				</td>";
			temp +=	"			</tr>";
			temp +=	"		</tbody>";
			temp +=	"	</table>";
			temp += "	</div>";
			wirelessSettingsView.managerTab.managerTab.append("<div id='" + (index == 0 ? "stationDiv" : "stationDiv_" + index) + "'>" + temp + "</div>");

			wirelessSettingsView.managerTab.managerTab.append("<div id='" + (index == 0 ? "apDiv" : "apDiv_" + index) + "'></div>");

			wirelessSettingsView.addCommentDiv(index);

			wirelessSettingsView.managerTab.topTable = $("<table class='marginCenter wirelessSettingsTopTable globalBorder'></table>").appendTo("#" + (index == 0 ? "apDiv" : "apDiv_" + index));

			var instance = wirelessSettingsView.instances[index];
			var selectedFreq = instance.configSettings.freq;
			var selectedFreqName = instance.freqs[selectedFreq].text;

			if(wirelessSettingsView.instances.length <= 1)
				$("#managerSelectorUl").hide();
			else
				$("#managerSelectorUl").append("<li id='tab_" + index + "'><a href='#tabs-" + index + "'>"+globalView.getMultiLanguageText('__ML_wireless_network_lan')+" " + (index + 1) + " (" + selectedFreqName + ")</a></li>");

			wirelessSettingsView.managerTab.addRow.freq(index);
			wirelessSettingsView.managerTab.addRow.mode(index);
			wirelessSettingsView.managerTab.addRow.channel(index);

			if(wirelessSettingsView.instances[index].isPowerManageable)
				wirelessSettingsView.managerTab.addRow.txpower(index);

			wirelessSettingsView.managerTab.addRow.chanbw(index);
			wirelessSettingsView.managerTab.addRow.rate(index);
			wirelessSettingsView.managerTab.addRow.airTouch(index);
			wirelessSettingsView.managerTab.addRow.wpsPin(index);

			wirelessSettingsView.managerTab.apTables[index] = $("<table class='marginCenter widthAuto globalBorder'><thead><tr><th><span id='span___ML_enabled' ml='__ML_enabled'></span></th><th><span id='span___ML_wireless_network_name' ml='__ML_wireless_network_name'></span></th><th><span id='span___ML_wireless_hide_ssid' ml='__ML_wireless_hide_ssid'></span></th><th><span id='span___ML_ssid_user_isolation' ml='__ML_ssid_user_isolation'></span></th><th><span id='span___ML_encryption' ml='__ML_encryption'></span></th><th><span id='span___ML_passphrase' ml='__ML_login_password'></span></th></tr></thead></table>").appendTo("#" + (index == 0 ? "apDiv" : "apDiv_" + index));
			global.raiseEvent({eventHandler: "wirelessSettingsController", id: "wirelessSettingsController.freq_changed", index: index});

			wirelessSettingsView.managerTab.addApRows(index);
		}
	},

	addManagerTabs: function(managerCount)
	{
		$(".managerTab").remove();
		$(".footer").remove();

		$("#contentDiv").append("<div id='tabs' class='wirelessSettingsTopDiv marginCenter'></div>");
		$("#tabs").append("<ul id='managerSelectorUl'></ul>");
		for(var i = 0; i < wirelessSettingsView.instances.length; i++)
		{
			wirelessSettingsView.managerTab.addTab(i);
		}
	},

	addCommentDiv: function(index)
	{
		if(index == 0)
		{
			$("#apDiv").append("<div class='marginCenter globalHeaderInfoDiv' id='commentDiv'></div>");
			$("#commentDiv").html("");
			$("#commentDiv").append("<span id='__ML_wireless_settings_intro' ml='__ML_wireless_settings_intro'></span>");
			$("#commentDiv").append("<span id='wireless_settings_intro2_freq_2400'></span>");
			$("#commentDiv").append("<span id='wireless_settings_intro2_freq_5000'></span>");
		}
		else
		{
			$("#apDiv_" + index).append("<div class='marginCenter globalHeaderInfoDiv' id='commentDiv_" + index + "'></div>");
			$("#commentDiv_" + index).html("");
			$("#commentDiv_" + index).append("<span id='__ML_wireless_settings_intro_" + index + "' ml='__ML_wireless_settings_intro'></span>");
			$("#commentDiv_" + index).append("<span id='wireless_settings_intro2_freq_2400_" + index + "'></span>");
			$("#commentDiv_" + index).append("<span id='wireless_settings_intro2_freq_5000_" + index + "'></span>");
		}

	},

	addOpModeDiv: function(index)
	{
		var opModeDiv = "";
		if(index == 0)
		{
			opModeDiv += 	"<div id='operatingModeDiv'>";
			opModeDiv += 	"		<div>";
			opModeDiv += 	"			<div class='textCenter'><span class='textCenter' id='__ML_wireless_operating_mode_description' ml='__ML_wireless_operating_mode_description'></span></div>";
			opModeDiv += 	"			<table class='marginCenter wirelessSettingsOpModeTable'>";
			opModeDiv += 	"				<tr>";
			opModeDiv += 	"					<td><span id='__ML_wireless_operating_mode' ml='__ML_wireless_operating_mode'></span></td>";
			opModeDiv += 	"					<td>";
			opModeDiv += 	"						<div id='div_operating_mode'>";
			opModeDiv += 	"							<span id='span_operating_modeValue'></span>";
			opModeDiv += 	"							<select id='cmb_operating_mode' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.operationMode_changed\", index: " + index + "});'></select>";
			opModeDiv += 	"						</div>";
			opModeDiv += 	"					</td>";
			opModeDiv += 	"				</tr>";
			opModeDiv += 	"			</table>";
			opModeDiv += 	"		</div>";
			opModeDiv += 	"		<div class='marginCenter globalHeaderInfoDiv'>";
			opModeDiv += 	"			<span id='__ML_wireless_operating_mode_access_point_description' ml='__ML_wireless_operating_mode_access_point_description'></span>";
			opModeDiv += 	"			<br /><br />";
			opModeDiv += 	"			<span id='__ML_wireless_operating_mode_bridge_description' ml='__ML_wireless_operating_mode_bridge_description'></span>";
			opModeDiv += 	"		</div>";
			opModeDiv += 	"</div>";
			$("#" + wirelessSettingsView.managerTab.managerTabId).append(opModeDiv);

			for(var operationMode in wirelessSettingsView.instances[index].operationModes)
			{
				$("#cmb_operating_mode").append("<option value='" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "' id='__ML_wireless_operating_mode_" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "' ml='__ML_wireless_operating_mode_" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "'></option>");
			}

			if($("#cmb_operating_mode option").length < 2) $("#operatingModeDiv").hide();
		}
		else
		{
			opModeDiv += 	"<div id='operatingModeDiv_" + index + "'>";
			opModeDiv += 	"		<div>";
			opModeDiv += 	"			<div class='textCenter'><span id='__ML_wireless_operating_mode_description_" + index + "' ml='__ML_wireless_operating_mode_description'></span></div>";
			opModeDiv += 	"			<table class='marginCenter'>";
			opModeDiv += 	"				<tr>";
			opModeDiv += 	"					<td><span id='__ML_wireless_operating_mode_" + index + "' ml='__ML_wireless_operating_mode'></span></td>";
			opModeDiv += 	"					<td>";
			opModeDiv += 	"						<div id='div_operating_mode_" + index + "'>";
			opModeDiv += 	"							<span id='span_operating_modeValue_" + index + "'></span>";
			opModeDiv += 	"							<select id='cmb_operating_mode_" + index + "' onchange='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"wirelessSettingsController.operationMode_changed\", index: " + index + "});'></select>";
			opModeDiv += 	"						</div>";
			opModeDiv += 	"					</td>";
			opModeDiv += 	"				</tr>";
			opModeDiv += 	"			</table>";
			opModeDiv += 	"		</div>";
			opModeDiv += 	"		<span id='__ML_wireless_operating_mode_access_point_description_" + index + "' ml='__ML_wireless_operating_mode_access_point_description'></span>";
			opModeDiv += 	"		<br /><br />";
			opModeDiv += 	"		<span id='__ML_wireless_operating_mode_bridge_description_" + index + "' ml='__ML_wireless_operating_mode_bridge_description'></span>";
			opModeDiv += 	"</div>";
			$("#" + wirelessSettingsView.managerTab.managerTabId).append(opModeDiv);

			for(var operationMode in wirelessSettingsView.instances[index].operationModes)
			{
				$("#cmb_operating_mode_" + index).append("<option value='" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "' id='__ML_wireless_operating_mode_" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "_" + index + "' ml='__ML_wireless_operating_mode_" + wirelessSettingsView.instances[index].operationModes[operationMode].code + "'></option>");
			}
			if($("#cmb_operating_mode_" + index + " option").length < 2) $("#operatingModeDiv_" + index).hide();
		}
	},

	addFooter: function()
	{
		$("#contentDiv").append("<div class='footer'><input type='button' id='__ML_save' ml='__ML_save' onclick='global.raiseEvent({eventHandler: \"wirelessSettingsController\", id: \"saveClicked\"});'/></div>");
	},


	addHedaerDiv: function()
	{
		$("#contentDiv").append("<div class='textCenter title' id='headerDiv'></div>");
		$("#headerDiv").append("<span id='__ML_wireless_setup' ml='__ML_wireless_setup'></span>");
	},

	documentReady: function()
	{
		$("#contentDiv").html("");
		this.addHedaerDiv();
	},

	createTabControls: function(activeManagerIndex)
	{
		var $tabs = $('#tabs').tabs();
		$tabs.tabs({ selected: activeManagerIndex });

        $tabs.tabs({
            select: function(event, ui) {
        		if(wirelessSettingsView.confirmAndSetActiveManagerTab(ui.index))
        		{
        			if($("#" + (wirelessSettingsController.activeManagerIndex == 0 ? "cmb_operating_mode" : "cmb_operating_mode_" + ui.index)).attr("disabled")) return;
        			$("#contentDiv").css("zoom", 1);
        			wirelessSettingsController.activeManagerIndex = ui.index;
        			wirelessSettingsView.changeViewByOpMode(ui.index);
        		}
        		else
        		{
        			return false;
        		}
        	}
        });
	},


	confirmAndSetActiveManagerTab: function(index)
	{
		var changeTab = true;
		var changed = false;
		if(wirelessSettingsView.managerTab.get.freq(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.freq) changed = true; if(wirelessSettingsView.managerTab.get.channel(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.channel) changed = true;
		if(wirelessSettingsView.managerTab.get.mode(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.txmode) changed = true;
		if(wirelessSettingsView.managerTab.get.txpower(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.txpower) changed = true;
		if(wirelessSettingsView.managerTab.get.airTouch(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.airTouch) changed = true;
		if(wirelessSettingsView.managerTab.get.chanbw(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.chanbw) changed = true;
		if(wirelessSettingsView.managerTab.get.opMode(wirelessSettingsController.activeManagerIndex) != wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.opMode) changed = true;



		var getId = wirelessSettingsView.managerTab.getId.apTable;
		var aps = wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].aps;

		for(var i = 0; i < aps.length; i++)
		{
			getId.instance_index = wirelessSettingsController.activeManagerIndex;
			getId.ap_index = i;
			if($("#" + getId.getSsidTextboxId()).val() != aps[i].ssid) changed = true;
			if($("#" + getId.getSecurityModeComboId()).val() != aps[i].sec_mode) changed = true;
			if($("#" + getId.getHiddenCheckboxId()).is(":checked") != aps[i].ssid_hidden) changed = true;
			if($("#" + getId.getEnabledCheckboxId()).is(":checked") != aps[i].enabled) changed = true;
			if($("#" + getId.getUserIsolationCheckboxId()).is(":checked") != aps[i].isolation) changed = true;
			if($("#" + wirelessSettingsView.instances[getId.instance_index].rateControlId).val() != aps[i].rate) changed = true
		}


		if(wirelessSettingsController.activeManagerIndex == index) return false;
		if($("#" + (wirelessSettingsController.activeManagerIndex == 0 ? "cmb_operating_mode" : "cmb_operating_mode_" + index)).attr("disabled")) return false;


		if(changed)
		{
			if(confirm(globalView.getMultiLanguageText("__ML_wireless_settings_tab_change_confirm_message")))
			{
				wirelessSettingsView.managerTab.set.freq(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.freq);
				wirelessSettingsView.managerTab.set.channel(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.channel);
				wirelessSettingsView.managerTab.set.mode(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.txmode);
				wirelessSettingsView.managerTab.set.txpower(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.txpower);
				wirelessSettingsView.managerTab.set.airTouch(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.airTouch);
				wirelessSettingsView.managerTab.set.wpsPin(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].wpsPin);
				wirelessSettingsView.managerTab.set.chanbw(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.chanbw);
				wirelessSettingsView.managerTab.set.opMode(wirelessSettingsController.activeManagerIndex, wirelessSettingsView.instances[wirelessSettingsController.activeManagerIndex].configSettings.opMode);
				wirelessSettingsView.managerTab.setApRows(wirelessSettingsController.activeManagerIndex);
			}
			else
			{
				changeTab = false;
			}
		}

		return changeTab;
	},

	setIntroTextByActiveManager: function(index)
	{
		var selectedFreqValue = wirelessSettingsView.managerTab.get.freq(index);
		var selectedFreq = wirelessSettingsView.instances[index].freqs[wirelessSettingsView.managerTab.get.freq(index)];
		if(index == 0)
		{
			switch(selectedFreqValue)
			{
				case "2400":
					$("#wireless_settings_intro2_freq_2400").html(globalView.getMultiLanguageText("__ML_wireless_settings_intro2_freq_2400").replace("@min_channel@", selectedFreq.minChannel).replace("@max_channel@", selectedFreq.maxChannel)).show();
					$("#wireless_settings_intro2_freq_5000").hide();
					break;
				case "5000":
					$("#wireless_settings_intro2_freq_2400").hide();
					$("#wireless_settings_intro2_freq_5000").html(globalView.getMultiLanguageText("__ML_wireless_settings_intro2_freq_5000").replace("@min_channel@", selectedFreq.minChannel).replace("@max_channel@", selectedFreq.maxChannel)).show();
					break;
				default:
					ui_debug_message("tanımsız frekans");
					break;
			}
		}
		else
		{
			switch(selectedFreqValue)
			{
				case "2400":
					$("#wireless_settings_intro2_freq_2400_" + index).html(globalView.getMultiLanguageText("__ML_wireless_settings_intro2_freq_2400").replace("@min_channel@", selectedFreq.minChannel).replace("@max_channel@", selectedFreq.maxChannel)).show();
					$("#wireless_settings_intro2_freq_5000_" + index).hide();
					break;
				case "5000":
					$("#wireless_settings_intro2_freq_2400_" + index).hide();
					$("#wireless_settings_intro2_freq_5000_" + index).html(globalView.getMultiLanguageText("__ML_wireless_settings_intro2_freq_5000").replace("@min_channel@", selectedFreq.minChannel).replace("@max_channel@", selectedFreq.maxChannel)).show();
					break;
			}
		}
	},

	changeViewByOpMode: function(index)
	{
		var selectedMode = $(index == 0 ? "#cmb_operating_mode" : "#cmb_operating_mode_" + index).val();
		switch(selectedMode)
		{
			case "ap":
				$(index == 0 ? "#stationDiv" : "#stationDiv_" + index).hide();
				$(index == 0 ? "#apDiv" : "#apDiv_" + index).show();
				$(".footer").show();
				break;
			case "sta":
				$(index == 0 ? "#stationDiv" : "#stationDiv_" + index).show();
				$(index == 0 ? "#apDiv" : "#apDiv_" + index).hide();
				$(".footer").hide();
				break;
			default:
		}

		index = wirelessSettingsController.activeManagerIndex;
		var selectedMode = $(index == 0 ? "#cmb_operating_mode" : "#cmb_operating_mode_" + index).val();
		switch(selectedMode)
		{
			case "ap":
				$(".footer").show();
				break;
			case "sta":
				$(".footer").hide();
				break;
			default:
		}

	},

	checkCookieToScan: function(index)
	{
		var selectedMode = $(index == 0 ? "#cmb_operating_mode" : "#cmb_operating_mode_" + index).val();
		if(selectedMode != "sta") return;
		$("#" + (index == 0 ? "apTable" : "apTable_" + index)).hide();
		$("#apTableManualDiv").hide();
		if(global.getCookie({name: "ap_scan"}) == "")
		{
			wirelessSettingsController.sendApScanQuery(index);
		}
		else
		{
			wirelessSettingsController.sendApScanResultQuery(index, 0);
		}

	},

	buildApTable: function(index, ap_list)
	{
		$("#" + (index == 0 ? "apTable" : "apTable_" + index)).html("");
		ap_list = wirelessSettingsModel.instances[index].ap_scan.ap_list;
		var ap_list_object = {};

		for(var i = 0; i < ap_list.length; i++)
		{
			if(ap_list_object[ap_list[i].ssid])
			{
				if(parseInt(ap_list[i].rssi) > parseInt(ap_list_object[ap_list[i].ssid].rssi))
				{
					ap_list_object[ap_list[i].ssid] = ap_list[i];
					ap_list_object[ap_list[i].ssid].index = i;
				}
			}
			else
			{
				ap_list_object[ap_list[i].ssid] = ap_list[i];
				ap_list_object[ap_list[i].ssid].index = i;
			}
		}

		var j = 0;

		var apRows  = "<thead>";
		apRows += 	"		<tr>";
		apRows += 	"			<th style='text-align: left;'>";
		apRows += 	"				<strong><span id='__ML_wireless_operating_mode_select_ap_to_connect_to'>" + __ML_wireless_operating_mode_select_ap_to_connect_to + "</span></strong>";
		apRows += 	"			</th>";
		apRows += 	"			<th class='textRight' colspan='3'>";
		apRows += 	"				<input id='btnRefreshApList_" + index + "' type='button' value='"+globalView.getMultiLanguageText('__ML_wireless_operating_mode_refresh_ap_list')+"' onclick='wirelessSettingsController.sendApScanQuery(" + index + ");' />";
		apRows += 	"			</th>";
		apRows += 	"		</tr>";
		apRows += 	"</thead>";

		$("#" + (index == 0 ? "apTable" : "apTable_" + index)).append(apRows);

		if(wirelessSettingsView.instances[index].configSettings.staSsid != "")
		{
			var configuredAp = {};
			if(ap_list_object[wirelessSettingsView.instances[index].configSettings.staSsid])
			{
				configuredAp = ap_list_object[wirelessSettingsView.instances[index].configSettings.staSsid];
				configuredAp.staState = wirelessSettingsView.instances[index].configSettings.staState;
				delete ap_list_object[wirelessSettingsView.instances[index].configSettings.staSsid];
			}
			else
			{
				configuredAp.ssid = wirelessSettingsView.instances[index].configSettings.staSsid;
				configuredAp.staState = wirelessSettingsView.instances[index].configSettings.staState;
				configuredAp.security = wirelessSettingsView.instances[index].configSettings.staSecurityMode;
				configuredAp.index = ap_list.length;
				ap_list.push(configuredAp);
			}

			apRows = "";
			apRows += "<tr " + (index == 0 ? "ap_table_row_ssid" : "ap_table_row_ssid_" + index) + "='" + configuredAp.ssid + "' class='even' onclick='wirelessSettingsView.togglePasswordRow(this," + index + ", " + configuredAp.index + ", \"" + configuredAp.security + "\");'>";
			apRows += "	<td>";
			apRows += "	 <a href='#'>";
			apRows += "   <span id='ssid" + j + "'>" + configuredAp.ssid + "</span>";
			apRows += "  </a>";
			apRows += " </td>";
			apRows += " <td>";
			apRows += "  <span id='rssi" + j + "' imgssid='" + configuredAp.ssid + "'>" + globalWireless.rssiStatus(configuredAp.rssi) + "</span>";
			apRows += " </td>";
			apRows += " <td class='status' id='is_connected_" + j + "' ssid='" + configuredAp.ssid + "'>";
			apRows += globalView.getMultiLanguageText("__ML_wireless_operating_mode_sta_" + configuredAp.staState);
			apRows += " </td>";
			apRows += " <td>";
			if(configuredAp.security != "off")
			{
				apRows += "   <img src='/images/lock.png' border='0' />";
			}
			apRows += " </td>";
			apRows += "</tr>";
			j++;
			$("#" + (index == 0 ? "apTable" : "apTable_" + index)).append(apRows);
		}

		for(var ap in ap_list_object)
		{
			apRows = "";
			apRows += "<tr " + ((index == 0) ? "ap_table_row_ssid" : "ap_table_row_ssid_" + index) + "='" + ap_list_object[ap].ssid + "' "+  ((j % 2) ? "class='odd'" : "class='even'") +" onclick='wirelessSettingsView.togglePasswordRow(this," + index + ", " + ap_list_object[ap].index + ", \"" + ap_list_object[ap].security + "\");'>";
			apRows += "	<td>";
			apRows += "	 <a href='#'>";
			apRows += "   <span id='ssid" + j + "'>" + ap_list_object[ap].ssid + "</span>";
			apRows += "  </a>";
			apRows += " </td>";
			apRows += " <td>";
			apRows += "  <span id='rssi" + j + "' imgssid='" + ap_list_object[ap].ssid + "'>" + globalWireless.rssiStatus(ap_list_object[ap].rssi) + "</span>";
			apRows += " </td>";
			apRows += " <td class='status' id='is_connected_" + j + "' ssid='" + ap_list_object[ap].ssid + "'>";
			apRows += " </td>";
			apRows += " <td>";
			if(ap_list_object[ap].security != "off")
			{
				apRows += "   <img src='/images/lock.png' border='0' />";
			}
			apRows += " </td>";
			apRows += "</tr>";
			j++;
			$("#" + (index == 0 ? "apTable" : "apTable_" + index)).append(apRows);
		}
		$("#" + (index == 0 ? "apTable" : "apTable_" + index)).show();
		$("#apTableManualDiv").show();

		globalView.addButtonClass();

// 		wirelessSettingsController.checkApIsConnected();
	},

	togglePasswordRow: function(e, index, id, securityType)
	{
		var promptId = index == 0 ? "password_prompt" : "password_prompt_" + index;
		if($("#" + promptId).attr("index") == id)
		{
			$("#" + promptId).remove();
		}
		else
		{
			$("#" + promptId).remove();
			var attrClass = $(e).closest("tr").attr("class");
			var password_prompt_row = '';
			password_prompt_row += '<tr class="' + attrClass + '" id="' + promptId + '" index="' + id + '">';
			password_prompt_row += '	<td colspan="4" style="text-align:left;">';
			password_prompt_row += '		<table width="50%" style="text-align:left;">';
			if(securityType != "off")
			{
				password_prompt_row += '	<tr class="' + attrClass + '">';
				password_prompt_row += '		<td><span>' + globalView.getMultiLanguageText("__ML_wireless_operating_mode_station_mode_ap_password") + '</span>:<input id="' + (index == 0 ? "__V_wireless_operating_mode_ap_password" : "__V_wireless_operating_mode_ap_password_" + index) + '" type="password" name="pwd" /> </td>';
				password_prompt_row += '	</tr>';
			}
			password_prompt_row += '	  <tr class="' + attrClass + '">';
			password_prompt_row += '		<td><input id="btnBridgeConnectAp_' + index + '" type="button" value="'+globalView.getMultiLanguageText('__ML_wireless_operating_mode_station_mode_ap_connect')+'" onclick="wirelessSettingsView.createApObject(' + index + ", " + id + ');" /><input id="btnBridgeCancelAp_' + index + '" type="button" value="'+globalView.getMultiLanguageText('__ML_wireless_operating_mode_station_mode_ap_cancel')+'" onclick="wirelessSettingsView.togglePasswordRow(this, ' + index + ', id, \'' + securityType + '\');" /></td>';
			password_prompt_row += '	  </tr>';
			password_prompt_row += '	</table>';
			password_prompt_row += '  </td>';
			password_prompt_row += '</tr>';

			$(e).after(password_prompt_row);
			
			globalView.addButtonClass();
		}
	},

	createApObject: function(index, ap_id)
	{
		if($("#" + (index == 0 ? "__V_wireless_operating_mode_ap_password" : "__V_wireless_operating_mode_ap_password_" + index)).length > 0)
			wirelessSettingsModel.instances[index].ap_scan.ap_list[ap_id].password = $("#" + (index == 0 ? "__V_wireless_operating_mode_ap_password" : "__V_wireless_operating_mode_ap_password_" + index)).val();
		else
			wirelessSettingsModel.instances[index].ap_scan.ap_list[ap_id].password = "";

		wirelessSettingsView.turnToBridgeMode(index, ap_id);
	},

	turnToBridgeMode: function(index, ap_id)
	{
		var apObj;
		if(ap_id == undefined)
		{
			apObj = {};
			apObj.ssid = $("#__V_wireless_operating_mode_ap_ssid_manual").val();
			apObj.security = $("#cmb_security_mode_manual").val();
			apObj.password = $("#__V_wireless_operating_mode_ap_password_manual").val();
		}
		else
		{
			apObj = wirelessSettingsModel.instances[index].ap_scan.ap_list[ap_id];
		}

		if(wirelessSettingsView.validateApObjectForBridgeMode(apObj))
		{
			var answer = confirm(__ML_wireless_operating_mode_bridge_mode_warning);
			if (answer)
			{
				clearTimeout(wirelessSettingsView.timeOutObj);
				var inst = wirelessSettingsModel.instances[index];
				inst.saveOpMode("sta");
				inst.saveStaSsid(apObj.ssid);
				inst.saveStaSecurityMode(apObj.security);
				if(globalWireless.isWpa(apObj.security))
				{
					inst.saveStaWpaPassword(apObj.password);
				}
				else if(apObj.security == "wep")
				{
					inst.saveStaWepPassword(apObj.password);
				}
				inst.sendApply();
				globalModel.addEvent({eventHandler: "wirelessSettingsController", id: "parseRebootRequiredQuery", index: index});
				globalModel.addEvent({eventHandler: "wirelessSettingsController", id: "saved"});
				globalModel.sendAjax();
			}
		}
	},

	validateApObjectForBridgeMode: function(apObj)
	{
		if(apObj.password != null)
		{
			if(apObj.security == "wpa_both") apObj.security = "wpa2";
			switch(apObj.security)
			{
				case "wpa":
				case "wpa2":
				case "wpa_both":
					if(!global.regexpCheck(apObj.password, "^(([0-9A-Za-z!\"#$%'()*+,./:;=?@^_`{|}~\\\\[\\]-]{8,64}))$"))
					{
						alert(globalView.getMultiLanguageText("__ML_wireless_operating_mode_password_error_wpa"));
						return false;
					}
					break;
				case "wep":
					if(!global.regexpCheck(apObj.password, "^(([0-9A-Fa-f]{10})|([\\s\\S]{5})|([0-9A-Fa-f]{26})|([\\s\\S]{13})|([0-9A-Za-z]{58})([0-9A-Fa-f]{24}))$"))
					{
						alert(globalView.getMultiLanguageText("__ML_wireless_operating_mode_password_error_web"));
						return false;
					}
					break;

			}

			if(apObj.ssid == "")
			{
				alert(__ML_wireless_operating_mode_manual_ssid + " " + __ML_Required_Field);
				return false;
			}

			if(apObj.ssid.length > 32)
			{
				alert(__ML_invalidSSIDMaxLength);
				return;
			}
			
			var regex = new RegExp(/^(?:[\w!"#$%'()*+,./:;=?@^_`{|}~\\\[\]-]+\s+)*[\w!"#$%'()*+,./:;=?@^_`{|}~\\\[\]-]+$/); // Accepts spaces between characters
			
			if(!regex.test(apObj.ssid))
			{
				alert(__ML_invalidSSID);
				return false;
			}
		}
		return true;
	},

	changeSecurityModeManual: function()
	{
		if($("#cmb_security_mode_manual").val() == "off")
		{
			$("#__V_wireless_operating_mode_ap_password_manual").val("");
			$("#__V_wireless_operating_mode_ap_password_manual").attr("disabled","disabled");
		}
		else
		{
			$("#__V_wireless_operating_mode_ap_password_manual").removeAttr("disabled");
		}
	},

	showHideManualConfiguration: function()
	{
		$("#apTableManual").toggle();
	}
}