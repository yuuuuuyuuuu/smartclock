
// Debug Flag
var D = true;

// Params
var bodyDivId = "div_clock_body";
var canvasId = "canvas";

$(document).ready(function(){
	if(D) console.log("docunemt ready");

	var bodyEle = $("#" + bodyDivId);
	var clockModel = new ClockModel();
	var clockView = new ClockView({el:bodyEle, model:clockModel});

	clockModel.set({year:2013});
});