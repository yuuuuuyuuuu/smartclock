
var EventModel = Backbone.Model.extend({
	
	D_TAG: "EventModel: ",
	
	defaults:{
		"name":"not set",
		"year": 0,
		"month": 0,
		"day":0,
		"hour":0,
		"minute":0,
		"category":"not set",
		"fillColor": 0x00000
	}
});