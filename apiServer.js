var fs = require("fs");

var readFileError = response => {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<h2>This is big error</h2>", "utf-8");
    response.end("", "utf-8");
    console.log("notFound.html read error");
};

/**
 * 
 * @param {string[]} url main page file url
 * @param {ServerResponse} response Server Response
 */
var mainPage = (url, response) => {
    fs.readFile("./res/page/" + url[0] + ".html", "utf-8", (err, file) => {
        if (err) {
            readFileError(response);
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
    fs.readFile("./res/page/" + url[0] + ".html", "utf-8", (err, file) => {
        if (err) {
            readFileError(response);
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
    fs.readFile("./res/page/notFound.html", "utf-8", (err, file) => {
        if (err) {
            readFileError(response);
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
 * @param {string[]} response Server Response
 */
var pictureFile = (url, response) => {
    fs.readFile("./res/picture/" + url[0], "binary", (err, file) => {
        if (err) {
            readFileError(response);
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
    fs.readFile("./res/audio/" + url[0], "binary", (err, file) => {
        if (err) {
            readFileError(response);
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
    fs.readFile("./res/js/" + url[0], "utf-8", (err, file) => {
        if (err) {
            readFileError(response);
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
    fs.readFile("./res/css/" + url[0], "utf-8", (err, file) => {
        if (err) {
            readFileError(response);
        } else {
            response.writeHead(200, { "Content-Type": "text/css" });
            response.write(file, "utf-8");
            response.end();
        }
    });
};

exports.notFoundPage = notFoundPage;
exports.mainPage = mainPage;
exports.pageFile = pageFile;
exports.pictureFile = pictureFile;
exports.jsFile = jsFile;
exports.cssFile = cssFile;
exports.audioFile = audioFile;