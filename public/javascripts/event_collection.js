
var EventCollection = Backbone.Collection.extend({
	
	D: true,
	D_TAG: "EventCollection: ",
	
	defaults:{
		model: EventModel
	},
	initialize: function()
	{
		if(D) console.log(this.D_TAG + "initialize");

	}
});