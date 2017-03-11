var http = require("http");
var router = require("./router")

http.createServer((request, response) => {
    var url = request.url.split("/");
    var host = request.headers.host;
    url.shift();

    router.routerSwitch(url, response);
    console.log("Host: " + host + " ,Url: " + request.url);
}).listen(80);

console.log('serve running at http://127.0.0.1:80/');