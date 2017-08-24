var fs = require("fs");

var readFileError = (response, fileName) => {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<h2>we find the page error</h2>", "utf-8");
    response.end();
    console.error("read file error, file name: " + fileName);
};

/**
 * 
 * @param {string[]} url main page file url
 * @param {ServerResponse} response Server Response
 */
var mainPage = (url, response) => {
    var fileName = "./res/page/" + url[0] + ".html";
    fs.readFile(fileName, "utf-8", (err, file) => {
        if (err) {
            readFileError(response, fileName);
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(file, "utf-8");
            response.end();
        }
    });
};

/**
 * 
 * @param {string[]} url other page file url
 * @param {ServerResponse} response Server Response
 */
var pageFile = (url, response) => {
    var fileName = "./res/page/" + url[0] + ".html";
    fs.readFile(fileName, "utf-8", (err, file) => {
        if (err) {
            readFileError(response, fileName);
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(file, "utf-8");
            response.end();
        }
    });
};

/**
 * 
 * @param {string[]} url error url
 * @param {ServerResponse} response Server Response
 */
var notFoundPage = (url, response) => {
    var fileName = "./res/page/notFound.html";
    fs.readFile(fileName, "utf-8", (err, file) => {
        if (err) {
            readFileError(response, fileName);
        } else {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.write(file, "utf-8");
            response.end();
        }
    });
};
/**
 * 
 * @param {string[]} url picture file url
 * @param {ServerResponse} response Server Response
 */
var pictureFile = (url, response) => {
    var fileName = "./res/picture/" + url[0];
    fs.readFile(fileName, "binary", (err, file) => {
        if (err) {
            readFileError(response, fileName);
        } else {
            response.writeHead(200, { "Content-Type": "image/png" });
            response.write(file, "binary");
            response.end();
        }
    });
};

/**
 * 
 * @param {string[]} url audio file url
 * @param {string[]} response Server Response
 */
var audioFile = (url, response) => {
    var fileName = "./res/audio/" + url[0];
    fs.readFile(fileName, "binary", (err, file) => {
        if (err) {
            readFileError(response, fileName);
        } else {
            response.writeHead(200, { "Content-Type": "audio/mp3" });
            response.write(file, "binary");
            response.end();
        }
    });
};

/**
 * 
 * @param {string[]} url javascript file url
 * @param {string[]} response Server Response
 */
var jsFile = (url, response) => {
    var fileName = "./res/js/" + url[0];
    fs.readFile(fileName, "utf-8", (err, file) => {
        if (err) {
            readFileError(response, fileName);
        } else {
            response.writeHead(200, { "Content-Type": "application/x-javascript" });
            response.write(file, "utf-8");
            response.end();
        }
    });
};

/**
 * 
 * @param {string[]} url css file url
 * @param {string[]} response Server Response
 */
var cssFile = (url, response) => {
    var fileName = "./res/css/" + url[0];
    fs.readFile(fileName, "utf-8", (err, file) => {
        if (err) {
            readFileError(response, fileName);
        } else {
            response.writeHead(200, { "Content-Type": "text/css" });
            response.write(file, "utf-8");
            response.end();
        }
    });
};

/**
* 
* @param {string[]} url css file url
* @param {string[]} response Server Response
*/
var apiCommand = function(url, response) {
    var command = url[0];
    switch(command){
        case "time":{
            var now = new Date();
            response.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            });
            response.write(now.toJSON(), "utf-8");
            response.end();
        }
        break;
        default:{
            readFileError(response, command);
        }break;
    }

}

exports.notFoundPage = notFoundPage;
exports.mainPage = mainPage;
exports.pageFile = pageFile;
exports.pictureFile = pictureFile;
exports.jsFile = jsFile;
exports.cssFile = cssFile;
exports.audioFile = audioFile;
exports.apiCommand =apiCommand;