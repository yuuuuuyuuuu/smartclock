

var OperationView = Backbone.View.extend({

	D: true,
	D_TAG: "OperationView: ",

	defaults:{

	},
	parentEle: null,
	canvasContext: null,
	initialize:function(){
		if(D) console.log(this.D_TAG + "initialize");

		this.setupElements();

		// test
		this.transformOperationControl(0, 0);
	},
	events:{
		"mousemove .operationCanvasEle": "mousemoveOnCanvas"
	},
	setupElements: function(){
		if(D) console.log(this.D_TAG + "setupElements");

		this.parentEle = this.$el;

		var operationBodyClassName = "operationBody";
		var operationRectEleClassName = "operationRectEle";
		var operationCanvasEleClassName = "operationCanvasEle";
		//var operationBodyTag = "<table class=" + operationBodyClassName + "><tr><td><div class=" + operationRectEleClassName + "></div></td><td><canvas class=" + operationCanvasEleClassName + "></canvas></td></tr></table>";
		var operationBodyTag = "<div class=" + operationBodyClassName + "><canvas class=" + operationCanvasEleClassName + "></canvas</div>";
		var bodyWidth = 100;
		var bodyHeight = 50;
		var rectWidth = bodyWidth * 0.7;
		var rectHeight = bodyHeight;
		var canvasWidth = bodyWidth;
		var canvasHeight = bodyHeight;

		this.parentEle.append(operationBodyTag);

		var addedBody = this.parentEle.find("div.operationBody");
		addedBody.width(bodyWidth).height(bodyHeight);

		//var addedRect = this.parentEle.find("div:last");
		//addedRect.width(rectWidth).height(rectHeight);

		var adddedCanvas = this.parentEle.find("canvas:last");
		adddedCanvas.width(canvasWidth).height(canvasHeight);

		this.canvasContext = adddedCanvas[0].getContext('2d');
		// adddedCanvas.mousemove(this.mousemoveOnCanvas);
	},
	mousemoveOnCanvas: function(event){
		if(D) console.log(this.D_TAG + "mousemoveOnCanvas");

		this.transformOperationControl(event.pageX, event.pageY);

	},
	transformOperationControl: function(mouseX, mouseY){
		if(D) console.log(this.D_TAG + "transformOperationControl");

		// test
		this.canvasContext.fillRect(0, 0, 300, 200);
		
		this.canvasContext.beginPath();
		this.canvasContext.moveTo(100, 0);
		this.canvasContext.quadraticCurveTo(200, 50, 300, 0);
		this.canvasContext.strokeStyle = 'rgba(255, 255, 255, 1.0)';
		this.canvasContext.lineWidth = 5;
		this.canvasContext.stroke();

		this.canvasContext.beginPath();
		this.canvasContext.moveTo(100, 150);
		this.canvasContext.quadraticCurveTo(200, 100, 300, 150);
		this.canvasContext.stroke();


	}
});