var sys = require('sys');
var http = require('http');
var server = http.createServer(
function (request, response) {
response.writeHead(200, {'Content-Type': 'text/plain'});
response.write('Hello World!!\n');
response.end();
}
).listen(3000);

console.log("Listening on port 3000");