
/*
 * GET Timetable for specified stations
 */

exports.timetable = function(req, res){

	var fs = require("fs");

	console.log("TimetableProvider.timetable");
	console.log(req.body.station);


	var timeTable = req.body.station;
	var filePath = __dirname + "/data/" + timeTable + ".json";
	console.log(filePath);
	fs.readFile(filePath, function(err, data){
		console.log("ReadData callback");
		console.log(data);
		console.log(err);
		
		var jsonData = JSON.parse(data);
		console.log(jsonData);

		res.send(jsonData);
	});
	
	
};