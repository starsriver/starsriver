import apiServer from "./apiServer.js";
/**
 * 
 * @param {string[]} url request url
 * @param {string} host request host
 * @param {ServerResponse} response Server Response
 */
export default function routerSwitch(url, response) {
    switch (url[0]) {
        case "": {
            apiServer.mainPage(["main"], response);
        }
        break;
        case "api": {
            url.shift();
            apiServer.apiCommand(url, response);
        }
        break;
        case "blog": {
            url.shift();
            apiServer.pictureFile(url, response);
        }
        break;
        case "page": {
            url.shift();
            apiServer.pageFile(url, response);
        }
        break;
        case "js": {
            url.shift();
            apiServer.jsFile(url, response);
        }
        break;
        case "css": {
            url.shift();
            apiServer.cssFile(url, response);
        }
        break;
        case "picture": {
            url.shift();
            apiServer.pictureFile(url, response);
        }
        break;
        case "audio": {
            url.shift();
            apiServer.audioFile(url, response);
        }
        break;
        default: {
            apiServer.notFoundPage(url, response);
        }
        break;
    };
}