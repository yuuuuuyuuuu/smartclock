
// Debug Flag
var D = true;
var D_TAG = "AlarmModel: ";

var AlarmModel = Backbone.Model.extend({
	defaults:{
		"name":"not set",
		"year": 0,
		"month": 0,
		"day":0,
		"hour":0,
		"minute":0
		"category":"not set"
	}
});