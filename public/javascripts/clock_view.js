
// Debug Flag
var D = true;
var D_TAG = "ClockControl: ";

// Params
var canvasId = "canvas";
var hourHandId = "div_hourhand";
var minuteHandId = "div_minutehand";
var secondHandId = "div_secondhand";

var ClockView = Backbone.View.extend({
	defaults:{
		"model":null
	},
	initialize:function(){
		if(D) console.log(D_TAG + "initialize");
		if(D) console.log(D_TAG + "el:" + this.el);
		this.model.bind("change", this.setTime, this);
		this.model.bind("destroy", this.remove, this);

		this.addClockParts();

	},
	addClockParts: function(bodyDiv)
	{
		if(D) console.log(D_TAG + "addCanvas");

		var wrapperEleWidth = this.$el.width();
		var wrapperEleHeight = this.$el.height();
		var wrapperEleWidthPx = wrapperEleWidth + "px";
		var wrapperEleHeightPx = wrapperEleHeight + "px";

		if(D) console.log(D_TAG + "wrapper widht:" + wrapperEleWidth);
		if(D) console.log(D_TAG + "wrapper height:" + wrapperEleHeight);

		// Parent div
		var borderRadiusPx =  String(wrapperEleWidth/2) + "px";
		if(D) console.log(D_TAG + borderRadiusPx);
		this.$el.css("border-radius", borderRadiusPx);

		// background
		var canvasTag = "<canvas id=" + '"' + canvasId + '" '
						 + "width=" + '"' + wrapperEleWidthPx + '" '
						 + "height=" + '"' + wrapperEleHeightPx + '" '
						 + ">" + "Canvas</canvas>"
		this.$el.append(canvasTag);

		// hour hand
		var hourHandTag = "<div id=" + '"' + hourHandId + '"></div>';
		this.$el.append(hourHandTag);
		var hourHandWidth = wrapperEleWidth/20;
		var hourHandHeight = wrapperEleHeight/5;
		var hourHandLeftPx = wrapperEleWidth/2 - hourHandWidth/2 + "px";
		var hourHandTopPx = wrapperEleHeight/2 - hourHandHeight + "px";
		this.$el.find("#" + hourHandId).css({"left":hourHandLeftPx, "top":hourHandTopPx});
		this.$el.find("#" + hourHandId).width(hourHandWidth).height(hourHandHeight);
		this.$el.find("#" + hourHandId).css({"transform-origin":"bottom"});

		// minute hand
		var minuteHandTag = "<div id=" + '"' + minuteHandId + '"></div>';
		this.$el.append(minuteHandTag);
		var minuteHandWidth = wrapperEleWidth/40;
		var minuteHandHeight = wrapperEleHeight/3;
		var minuteHandLeftPx = wrapperEleWidth/2 - minuteHandWidth/2 + "px";
		var minuteHandTopPx = wrapperEleHeight/2 - minuteHandHeight + "px";
		this.$el.find("#" + minuteHandId).css({"left":minuteHandLeftPx, "top":minuteHandTopPx});
		this.$el.find("#" + minuteHandId).width(minuteHandWidth).height(minuteHandHeight);
		this.$el.find("#" + minuteHandId).css({"transform-origin":"bottom"});

		// second hand
		var secondHandTag = "<div id=" + '"' + secondHandId + '"></div>';
		this.$el.append(secondHandTag);
		var secondHandWidth = wrapperEleWidth/100;
		var secondHandHeight = wrapperEleHeight/2.5;
		var secondHandLeftPx = wrapperEleWidth/2 - secondHandWidth/2 + "px";
		var secondHandTopPx = wrapperEleHeight/2 - secondHandHeight + "px";
		this.$el.find("#" + secondHandId).css({"left":secondHandLeftPx, "top":secondHandTopPx});
		this.$el.find("#" + secondHandId).width(secondHandWidth).height(secondHandHeight);
		this.$el.find("#" + secondHandId).css({"transform-origin":"bottom"});

	},
	render:function(){
		if(D) console.log(D_TAG + "render");
		if(D) console.log(D_TAG + "Year:" + this.model.get("year"));
		return this;
	},
	remove: function(){
		if(D) console.log(D_TAG + "remove");
	},
	setTime: function(model){
		if(D) console.log(D_TAG + "setTime to:" + hour + ":" + minute + ":" + second);

		// test
		var hour = model.get("hour");
		var minute = model.get("minute");
		var second = model.get("second");
		if(D) console.log(D_TAG + "new time: " + hour + ":" + minute + ":" + second);

		var hourHandDegree = this.getHourHandDegree(hour, minute, second);
		var minuteHandDegree = this.getMinuteHandDegree(hour, minute, second);
		var secondHandDegree = this.getSecondHandDegree(hour, minute, second);

		if(D) console.log(D_TAG + "Degree of " + hour + ":" + minute + ":" + second + ":" + hourHandDegree);
		this.rotateHourHand(hourHandDegree);
		this.rotateMinuteHand(minuteHandDegree);
		this.rotateSecondHand(secondHandDegree);

	},
	getHourHandDegree: function(hour, minute, second)
	{
		var hourlyDegree = 30 * hour;
		var minuteDegree = 0.5 * minute;
		return hourlyDegree + minuteDegree;
	},
	getMinuteHandDegree: function(hour, minute, second)
	{
		var minuteDegree = minute * 6;
		return minuteDegree;
	},
	getSecondHandDegree: function(hour, minute, second)
	{
		var secondDegree = second * 6;
		return secondDegree;
	},
	rotateHourHand: function(degree){
		if(D) console.log(D_TAG + "rotateHourHand");
		if(D) console.log(D_TAG + "rotate to:" + degree);

		this.$el.find("#" + hourHandId).css({"-webkit-transform": "rotate(" + degree + "deg)"});
	},
	rotateMinuteHand: function(degree){
		if(D) console.log(D_TAG + "rotateMinuteHand");
		if(D) console.log(D_TAG + "rotate to:" + degree);

		this.$el.find("#" + minuteHandId).css({"-webkit-transform": "rotate(" + degree + "deg)"});
	},
	rotateSecondHand: function(degree){
		if(D) console.log(D_TAG + "rotateSecondHand");
		if(D) console.log(D_TAG + "rotate to:" + degree);

		this.$el.find("#" + secondHandId).css({"-webkit-transform": "rotate(" + degree + "deg)"});
	}
});