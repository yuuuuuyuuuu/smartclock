
// Params
var canvasId = "canvas";
var hourHandId = "div_hourhand";
var minuteHandId = "div_minutehand";
var secondHandId = "div_secondhand";

var ClockView = Backbone.View.extend({

	D: true,
	D_TAG: "ClockView: ",

	defaults:{
		"model": null,
		"collection": null,
		"clockAreaWidth": 0,
		"clockAreaHeight": 0,
		"clockRadius": 0
	},
	
	hourHandElement: null,
	minuteHandElement: null,
	secondHandElement: null,

	initialize:function(){
		if(D) console.log(this.D_TAG + "initialize");
		if(D) console.log(this.D_TAG + "el:" + this.el);

		// Model event
		this.model.bind("change:hour", this.setHour, this);
		this.model.bind("change:minute", this.setMinute, this);
		this.model.bind("change:second", this.setSecond, this);
		this.model.bind("destroy", this.remove, this);

		// time table data
		if(D) console.log(this.D_TAG + "timeTableData");
		if(D) console.log(this.options.timeTable);
		
		this.options.timeTable.bind("change", this.onTimeTableChanged, this);
		this.addClockParts();

	},
	onTimeTableChanged: function(model)
	{
		if(D) console.log(this.D_TAG + "onTimeTalbeChanged");
		var nextTrainTime = model.get("nextTrainTime");


		if(D) console.log(this.D_TAG + "nextTrainTime");
		if(D) console.log(nextTrainTime);

		this.addItem(nextTrainTime.hour, nextTrainTime.minute);
	},
	removeCurrentItem: function()
	{
		if(D) console.log(this.D_TAG + "removeCurrentItem");

		var itemClassName = "eventItem";
		$("." + itemClassName).remove();

	},
	addItem: function(hour, minute)
	{
		if(D) console.log(this.D_TAG + "addItem");

		this.removeCurrentItem();
		
		var jqueryParentObj = this.$el;

		var itemClassName = "eventItem";
		var innerItemClassName = "innerEventItem";
		var itemTag = "<div class=" + itemClassName + "><div class=" + innerItemClassName + "></div></div>";
		
		jqueryParentObj.append(itemTag);

		// Style
		var addedElement = jqueryParentObj.find("." + itemClassName + ":last");
		if(D) console.log(this.D_TAG + "addedElement:" + addedElement.attr("class"));

		var itemOffsetLength = 10;
		var itemWidth = 10;
		var itemHeight = this.clockRadius + itemOffsetLength;;
		var itemLeftPx = (this.clockAreaWidth - itemOffsetLength )/2 + "px";
		var itemTopPx = -itemOffsetLength;
		// var degreeToRotate = this.getHourHandDegree(hour, minute);
		var degreeToRotate = this.getMinuteHandDegree(hour, minute, 0);
		if(D) console.log(this.D_TAG + "ItemRotation:" + degreeToRotate);
		addedElement.width(itemWidth).height(itemHeight);
		addedElement.css({"left":itemLeftPx, "top":itemTopPx});
		addedElement.css({"transform-origin":"bottom"});
		this.rotateElement(addedElement, degreeToRotate);

		var borderRadiusPx =  itemWidth/2 + "px";
		var innerAddedElement = addedElement.find("." + innerItemClassName);
		innerAddedElement.width(itemWidth).height(itemWidth);
		innerAddedElement.css("border-radius", borderRadiusPx);

	},
	calculateItemPosition: function(hour, minute)
	{
		if(D) console.log(this.D_TAG + "calculateItemPosition");

		// Item display location should be re-considered
		// Currently, just display it as same degree as hourhand rectangle
		var degreeToDisplay = this.getHourHandDegree(hour, minute, 0);



	},
	addClockParts: function(bodyDiv)
	{
		if(D) console.log(this.D_TAG + "addCanvas");

		this.clockAreaWidth = this.$el.width();
		this.clockAreaHeight = this.$el.height();
		this.clockRadius = this.clockAreaWidth / 2; // temp

		var wrapperEleWidthPx = this.clockAreaWidth + "px";
		var wrapperEleHeightPx = this.clockAreaHeight + "px";

		if(D) console.log(this.D_TAG + "wrapper widht:" + this.clockAreaWidth);
		if(D) console.log(this.D_TAG + "wrapper height:" + this.clockAreaHeight);

		// Parent div
		var borderRadiusPx =  String(this.clockAreaWidth/2) + "px";
		if(D) console.log(this.D_TAG + borderRadiusPx);
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
		var hourHandWidth = this.clockAreaWidth/20;
		var hourHandHeight = this.clockAreaHeight/5;
		var hourHandLeftPx = this.clockAreaWidth/2 - hourHandWidth/2 + "px";
		var hourHandTopPx = this.clockAreaHeight/2 - hourHandHeight + "px";
		this.hourHandElement = this.$el.find("#" + hourHandId);
		this.hourHandElement.css({"left":hourHandLeftPx, "top":hourHandTopPx});
		this.hourHandElement.width(hourHandWidth).height(hourHandHeight);
		this.hourHandElement.css({"transform-origin":"bottom"});

		// minute hand
		var minuteHandTag = "<div id=" + '"' + minuteHandId + '"></div>';
		this.$el.append(minuteHandTag);
		var minuteHandWidth = this.clockAreaWidth/40;
		var minuteHandHeight = this.clockAreaHeight/3;
		var minuteHandLeftPx = this.clockAreaWidth/2 - minuteHandWidth/2 + "px";
		var minuteHandTopPx = this.clockAreaHeight/2 - minuteHandHeight + "px";
		this.minuteHandElement = this.$el.find("#" + minuteHandId);
		this.minuteHandElement.css({"left":minuteHandLeftPx, "top":minuteHandTopPx});
		this.minuteHandElement.width(minuteHandWidth).height(minuteHandHeight);
		this.minuteHandElement.css({"transform-origin":"bottom"});

		// second hand
		var secondHandTag = "<div id=" + '"' + secondHandId + '"></div>';
		this.$el.append(secondHandTag);
		var secondHandWidth = this.clockAreaWidth/100;
		var secondHandHeight = this.clockAreaHeight/2.5;
		var secondHandLeftPx = this.clockAreaWidth/2 - secondHandWidth/2 + "px";
		var secondHandTopPx = this.clockAreaHeight/2 - secondHandHeight + "px";
		this.secondHandElement = this.$el.find("#" + secondHandId);
		this.secondHandElement.css({"left":secondHandLeftPx, "top":secondHandTopPx});
		this.secondHandElement.width(secondHandWidth).height(secondHandHeight);
		this.secondHandElement.css({"transform-origin":"bottom"});

	},
	render:function(){
		if(D) console.log(this.D_TAG + "render");
		if(D) console.log(this.D_TAG + "Year:" + this.model.get("year"));
		return this;
	},
	remove: function(){
		if(D) console.log(this.D_TAG + "remove");
	},
	setHour: function(model){

		var hour = model.get("hour");
		var minute = model.get("minute");
		var second = model.get("second");

		if(D) console.log(this.D_TAG + "new hour: " + hour);

		var hourHandDegree = this.getHourHandDegree(hour, minute, second);
		this.rotateElement(this.hourHandElement, hourHandDegree);

	},
	setMinute: function(model){

		var hour = model.get("hour");
		var minute = model.get("minute");
		var second = model.get("second");

		if(D) console.log(this.D_TAG + "new minute: " + minute);

		var minuteHandDegree = this.getMinuteHandDegree(hour, minute, second);
		this.rotateElement(this.minuteHandElement, minuteHandDegree);

	},
	setSecond: function(model){

		// New TIme
		var hour = model.get("hour");
		var minute = model.get("minute");
		var second = model.get("second");

		if(D) console.log(this.D_TAG + "new second: " + second);

		var secondHandDegree = this.getSecondHandDegree(hour, minute, second);

		this.rotateElement(this.secondHandElement, secondHandDegree);

		// update next train time
		var direcitionType = "toShonandai";
		var dayType = "weekday";
		this.options.timeTable.updateNextTrainTime(direcitionType, dayType, hour, minute);

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
	rotateElement: function(jqueryElement, degree){
		if(D) console.log(this.D_TAG + "rotateElement");
		if(D) console.log(this.D_TAG + "jqueryElement:" + jqueryElement);
		if(D) console.log(this.D_TAG + "degree:" + degree);

		jqueryElement.css({"-webkit-transform": "rotate(" + degree + "deg)"});
	}
});