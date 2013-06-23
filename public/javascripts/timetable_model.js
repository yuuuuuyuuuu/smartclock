
var TimetableModel = Backbone.Model.extend({

	D_TAG: "TimetableModel: ",
	defaults:
	{
		timeTable: null,
		nextTrainTime: null
	},
	/*TIMETABLE_SERVER_URL: "http://localhost:3000/timetables",*/
	TIMETABLE_SERVER_URL: "http://smartclock.c.node-ninja.com:3000//timetables",
	initialize:function(){
		if(D) console.log(this.D_TAG + "Initialize");

		// temp
		// load timetable for Ryokuentoshi
		this.updateTimeTableTo("ryokuentoshi");

	},
	updateNextTrainTime: function(directionType, dayType_value, hour_value, minute_value)
	{
		if(D) console.log(this.D_TAG + "updateNextTrainTime");
		if(D) console.log("directionType:" + directionType + " dayType:" + dayType_value + " hour:" + hour_value + " minute:" + minute_value);
		if(null == this.timeTable) 
		{
			if(D) console.log(this.D_TAG + "timeTable is null");
			return null;
		}
		var directionDataArray = null;

		// direction type
		if("toYokohama" == directionType)
		{
			directionDataArray = this.timeTable.toYokohama;
		}
		else if("toEbina" == directionType)
		{
			directionDataArray = this.timeTable.toEbina;
		}
		else if("toShonandai" == directionType)
		{
			if(D) console.log(this.D_TAG + "toShonanday specified");
			directionDataArray = this.timeTable.toShonandai;
		}
		else
		{
			if(D) console.log(this.D_TAG + "directionDataArray null. Stop getNextTrainTime");
			return null;
		}

		if(null == directionDataArray)
		{
			if(D) console.log(this.D_TAG + "directionDataArray null");
			return;
		}

		var hourlyDataArray = null;

		// day type
		if("weekday" == dayType_value)
		{
			hourlyDataArray = directionDataArray.weekday;
		}
		else if("saturday" == dayType_value)
		{
			hourlyDataArray = directionDataArray.saturday;
		}
		else if("holiday" == dayType_value)
		{
			hourlyDataArray = directionDataArray.holiday;
		}

		if(null == hourlyDataArray)
		{
			if(D) console.log(this.D_TAG + "houlyDataArray null. Stop getNextTrainTime");
			return;
		}
		
		var timetableHourlyDataLength = hourlyDataArray.length;
		if(D) console.log(this.D_TAG + "dataLength:" + timetableHourlyDataLength);

		var stopSearchFlag = false;
		var notFoundInSameHour = false;
		var searchCounter = 0;
		var foundData = null;
		while(!stopSearchFlag)
		{
			var hourlyItem = hourlyDataArray[searchCounter];

			if(D) console.log("stopSearchFlag");
			if(D) console.log(stopSearchFlag);

			if(D) console.log("hour" + hourlyItem.hour);
				
			if(hour_value == hourlyItem.hour)
			{

				var minuteDataArray = hourlyItem.minute;
				var minuteDataArrayLength = minuteDataArray.length;
				for(var i = 0; i < minuteDataArrayLength; i++)
				{
					var minute = minuteDataArray[i];
					if(minute_value < minute)
					{
						foundData = {"hour": hourlyItem.hour, "minute": minute};
						stopSearchFlag = true;
						break;
					}
				}
			}
			else if(hour_value < hourlyItem.hour)
			{
				foundData = {"hour": hourlyItem.hour, "minute": hourlyItem.minute[0]};
				stopSearchFlag = true;
			}
			searchCounter++;
			if(searchCounter == timetableHourlyDataLength) stopSearchFlag = true;
		}

		if(D) console.log(this.D_TAG + "foundData");
		if(D) console.log(foundData);

		// set data triggers view update
		this.set("nextTrainTime", foundData);
	},
	updateTimeTableTo: function(stationName)
	{
		// Access server to get timetable data for "timeTableName" station
		var that = this;
		var ajaxOption = {
			type: "post",
			url: this.TIMETABLE_SERVER_URL,
			dataType: "json",
			data:
			{
				"station": stationName
			},
			success:function(data, dataType)
			{
				if(D) console.log("ajax success");
				if(D) console.log(data);
				if(D) console.log(dataType);

				that.timeTable = data;
				// that.getNextTrainTime("toShonandai", "weekday", 5, 30);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown)
			{
				if(D) console.log(this.D_TAG + "ajax error:" + textStatus);
			}
		};

		$.ajax(ajaxOption);
	}
});