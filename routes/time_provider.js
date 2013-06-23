
/*
 * GET users listing.
 */

exports.currentTime = function(req, res){

	var moment = require('moment');
	var hour = moment().utc().hour() + 9;
	var minute = moment().minute();
	var second = moment().second();

	var responseData = {
		"hour": hour,
		"minute": minute,
		"second": second 
	};
	res.send(responseData);
};