const http = require("http");
const router = require("./router.js");

function getClientIp(request) {
    return request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
};

http.createServer((request, response) => {
    let url = request.url.split("/");
    let host = request.headers.host;
    url.shift();

    router.routerSwitch(url, response);

    console.log("IP: " + getClientIp(request) + " ,Method: " + request.method + " ,Url: " + request.url);
    
}).listen(80);

console.log("serve is running.");
