const http = require("http");
const router = require("./router.js");
const requestIp = require("request-ip");

http.createServer((request, response) => {
    try {
        let url = request.url.split("/");
        url.shift();

        router.routerSwitch(url, response);

        let clientIp = requestIp.getClientIp(request);
        console.log("IP: " + clientIp + ", Method: " + request.method + ", Url: " + request.url);
    }
    catch (e) {
        console.log(e.message);
    }
}).listen(80);

console.log("serve is running.");
