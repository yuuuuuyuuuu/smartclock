
// Debug Flag
var D = true;

// Params
var bodyDivId = "div_clock_body";
var canvasId = "canvas";

$(document).ready(function(){
	if(D) console.log("docunemt ready");

	var bodyEle = $("#" + bodyDivId);
	var clockModel = new ClockModel();
	
	//clockModel.set({year:2013});

	// Event Data
	var eventCollection = new EventCollection();

	var clockView = new ClockView({el:bodyEle, model:clockModel, collection:eventCollection});

	// Test
	var eventNum = 10;
	for(var i = 0; i < eventNum; i++)
	{
		var hourVal = Math.floor( Math.random() * 24 );
		var minuteVal = Math.floor(Math.random() * 60);

		var event = new EventModel({hour: hourVal, minute: minuteVal});
		eventCollection.add(event);
	}
});