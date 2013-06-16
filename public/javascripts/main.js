
// Debug Flag
var D = true;

// Params
var bodyDivId = "div_clock_body";
var canvasId = "canvas";



$(document).ready(function(){
	if(D) console.log("docunemt ready");

	var bodyEle = $("#" + bodyDivId);
	var clockModel = new ClockModel();

	// Get timetable
	var timeTable = new TimetableModel();

	if(D) console.log("ready");
	if(D) console.log(timeTable);
	
	var clockView = new ClockView({el:bodyEle, model:clockModel, timeTable: timeTable});

});