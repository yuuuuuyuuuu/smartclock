
// Clock Server params
// var CLOCK_SERVER_URL = "http://localhost:3000/current_time";
// var CLOCK_SERVER_URL = "http://210.152.156.68:3000/current_time";
var CLOCK_SERVER_URL = "http://smartclock.c.node-ninja.com:3000/current_time";


var ClockModel = Backbone.Model.extend({

	D_TAG: "ClockModel: ",
	
	defaults:{
		"year":0,
		"month":0,
		"day":0,
		"hour":0,
		"minute":0,
		"second":0
	},
	initialize:function(){
		if(D) console.log(this.D_TAG + "ClockModel Initialize");

		// test
		this.updateTime();
		this.startSelfTimer();

	},
	updateTime: function(){
		if(D) console.log(this.D_TAG + "ClockModel updateTime");

		// access server to get current time
		var self = this;
		$.ajax({
			type: "GET",
			url: CLOCK_SERVER_URL,
			success: function(data, status, xhr){
				if(D) console.log(this.D_TAG + "ajax success");
				if(D) console.log(this.D_TAG  + data.hour + ":" + data.minute + ":" + data.second);
				
				if(self.hour != data.hour) self.set("hour", data.hour);
				if(self.minute != data.minute) self.set("minute", data.minute);
				if(self.second != data.second) self.set("second", data.second);
			}
		});
	},
	startSelfTimer: function(){
		if(D) console.log(this.D_TAG + "startSelfTimer");

		this.updateSecond(this);
	},
	updateSecond: function(self)
	{
		if(D) console.log(this.D_TAG + "updateSecond");

		self.set("second",self.get("second") + 1);
		setTimeout(function(){
			if(self.get("second")%60 == 0) 
			{
				self.updateMinute();
				//self.updateTime();
			}
			self.updateSecond(self);
		}, 1000);
	},
	updateMinute: function()
	{
		this.updateTime();
	}

});