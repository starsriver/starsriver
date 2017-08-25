const fs = require("fs");

function readFileError(response, fileName) {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<h2>we find the file</h2>", "utf-8");
    response.end();
    console.error("read file error, file name: " + fileName);
};

/**
 * 
 * @param {string[]} url main page file url
 * @param {ServerResponse} response Server Response
 */
function mainPage(url, response) {
    const fileName = "./res/page/" + url[0] + ".html";
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
function pageFile(url, response) {
    const fileName = "./res/page/" + url[0] + ".html";
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
function notFoundPage (url, response) {
    const fileName = "./res/page/notFound.html";
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
function pictureFile(url, response) {
    const fileName = "./res/picture/" + url[0];
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
 * @param {ServerResponse} response Server Response
 */
function audioFile(url, response) {
    const fileName = "./res/audio/" + url[0];
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
 * @param {ServerResponse} response Server Response
 */
function jsFile(url, response) {
    const fileName = "./res/js/" + url[0];
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
 * @param {ServerResponse} response Server Response
 */
function cssFile(url, response) {
    const fileName = "./res/css/" + url[0];
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
* @param {ServerResponse} response Server Response
*/
function apiCommand(url, response) {
    const command = url[0];
    switch(command){
        case "time":{
            let now = new Date();
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
export {
    notFoundPage,
    mainPage,
    pageFile,
    pictureFile,
    jsFile,
    cssFile,
    audioFile,
    apiCommand
};