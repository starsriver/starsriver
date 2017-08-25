import http from "http";
import router from "./router.js";

http.createServer((request, response) => {
    let url = request.url.split("/");
    let host = request.headers.host;
    url.shift();

    router.routerSwitch(url, response);
    console.log("Host: " + host + " ,Url: " + request.url);
}).listen(80);

console.log("serve is running.");