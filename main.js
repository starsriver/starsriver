var http = require("http");
var apiServer = require("./apiServer");

http.createServer((request, response) => {
    var url = request.url.split("/");
    url.shift();

    switch (url[0]) {
        case "":
            {
                apiServer.mainPage(["main"], response);
                console.log("main\n");
            }
            break;
        case "blog":
            {
                url.shift();
                apiServer.pictureFile(url, response);
            }
            break;
        case "js":
            {
                url.shift();
                apiServer.jsFile(url, response);
            }
            break;
        case "css":
            {
                url.shift();
                apiServer.cssFile(url, response);
            }
            break;
        case "picture":
            {
                url.shift();
                apiServer.pictureFile(url, response);
            }
            break;
        default:
            {
                apiServer.notFoundPage(url, response);
            }
            break;

    }
}).listen(80);

console.log('serve running at http://127.0.0.1:80/');