
var TrainTimeModel = Backbone.Model.extend({
	
	D_TAG: "TrainTimeModel: ",
	
	defaults:{
		"trainType":"not set",
		"date":"",
		"hour":0,
		"minute":0,
		"data":"not set",
		"fillColor": 0x00000
	}
});