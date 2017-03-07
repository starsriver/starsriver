var fs = require("fs");

var readFileError = response => {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<h2>This is big error</h2>", "utf-8");
    response.end("", "utf-8");
    console.log("notFound.html read error");
};

/**
 * 
 * @param {string[]} url mainpagefile url
 * @param {ServerResponse} response Server Response
 */
var mainPage = (url, response) => {
    fs.readFile("./page/" + url[0] + ".html", "utf-8", (err, file) => {
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
    fs.readFile("./page/notFound.html", "utf-8", (err, file) => {
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
    fs.readFile("./picture/" + url[0], "binary", (err, file) => {
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
 * @param {string[]} url javascript file url
 * @param {string[]} response Server Response
 */
var jsFile = (url, response) => {
    fs.readFile("./js/" + url[0], "utf-8", (err, file) => {
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
    fs.readFile("./css/" + url[0], "utf-8", (err, file) => {
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
exports.pictureFile = pictureFile;
exports.jsFile = jsFile;
exports.cssFile = cssFile;