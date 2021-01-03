/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var apiUrl = 'https://url-shortner-app-123.herokuapp.com';
// fetch all url details to display in table
var fetchAllUrlDetails = function () { return __awaiter(void 0, void 0, void 0, function () {
    var urlDetails, urlDetailsJson, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(apiUrl + "/url-data")];
            case 1:
                urlDetails = _a.sent();
                return [4 /*yield*/, urlDetails.json()];
            case 2:
                urlDetailsJson = _a.sent();
                return [2 /*return*/, urlDetailsJson];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// display url details in table and show loader till the data is been fetch and the hide loader
var displayUrlDetails = function () { return __awaiter(void 0, void 0, void 0, function () {
    var urlDetailsJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                showLoader();
                return [4 /*yield*/, fetchAllUrlDetails()];
            case 1:
                urlDetailsJson = _a.sent();
                hideLoader();
                createDomForUrlDetails(urlDetailsJson);
                return [2 /*return*/];
        }
    });
}); };
// fetch the redirect url and redirect in a new tab
var redirectToOriginalUrl = function (shortUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var urlDetails;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                showLoader();
                return [4 /*yield*/, fetchRedirectUrl(shortUrl)];
            case 1:
                urlDetails = _a.sent();
                displayUrlDetails();
                window.open("" + urlDetails.data.url, '_blank');
                hideLoader();
                return [2 /*return*/];
        }
    });
}); };
// makes an api call to fetch the redirect url data
var fetchRedirectUrl = function (shortUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var urlData, urlDataJson, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(apiUrl + "/redirect-url/" + shortUrl)];
            case 1:
                urlData = _a.sent();
                return [4 /*yield*/, urlData.json()];
            case 2:
                urlDataJson = _a.sent();
                return [2 /*return*/, urlDataJson];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//creating table for the url details fetched
var createDomForUrlDetails = function (urlDetailsJson) {
    var urlDetails = urlDetailsJson.data;
    var tableContainer = document.createElement('div');
    tableContainer.classList.add('container-table');
    var tableHeaderRow = document.createElement('div');
    tableHeaderRow.classList.add('container-table-header-row');
    var columnHeaders = ['Sr no.', 'Url', 'Short Url', 'Clicks'];
    columnHeaders.forEach(function (element) {
        var columnData = document.createElement('div');
        columnData.classList.add('column-table-data');
        columnData.innerHTML = element;
        tableHeaderRow.append(columnData);
    });
    tableContainer.append(tableHeaderRow);
    urlDetails.forEach(function (element, index) {
        var columnRow = document.createElement('div');
        columnRow.classList.add('column-table-row');
        var columnSerialData = document.createElement('div');
        columnSerialData.classList.add('column-data');
        columnSerialData.innerHTML = "" + (index + 1);
        var columnUrlData = document.createElement('div');
        columnUrlData.classList.add('column-data', 'url-data');
        columnUrlData.innerHTML = "<a href=\"" + element.url + "\" target=\"_blank\">" + element.url + "</a>";
        var columnShortUrlData = document.createElement('div');
        columnShortUrlData.classList.add('column-data', 'short-url');
        columnShortUrlData.innerHTML = "" + element.shortUrl;
        columnShortUrlData.onclick = function () {
            redirectToOriginalUrl(element.shortUrl);
        };
        var columnUrlClicksData = document.createElement('div');
        columnUrlClicksData.classList.add('column-data');
        columnUrlClicksData.innerHTML = "" + element.clicks;
        columnRow.append(columnSerialData, columnUrlData, columnShortUrlData, columnUrlClicksData);
        tableContainer.appendChild(columnRow);
    });
    document.getElementById('table-contents').innerHTML = '';
    document.getElementById('table-contents').append(tableContainer);
};
// creating a loader to show till the data is fetched
var createLoader = function () {
    var loaderContainer = document.createElement('div');
    loaderContainer.classList.add('loader-container');
    loaderContainer.id = 'loader-contanier';
    var loader = document.createElement('div');
    loader.classList.add('loader');
    loaderContainer.append(loader);
    document.body.append(loaderContainer);
};
// show the loader
var showLoader = function () {
    document.getElementById('loader-contanier').style.display = 'flex';
};
//hide the loader
var hideLoader = function () {
    document.getElementById('loader-contanier').style.display = 'none';
};
//make an api call to shortern the url
var shortenUrl = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, shortenUrl_1, shortenUrlDetails, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                showLoader();
                url = document.getElementById('shrink-text').value;
                return [4 /*yield*/, fetch(apiUrl + "/shorten-url", {
                        // Adding method type 
                        method: "POST",
                        // Adding body or contents to send 
                        body: JSON.stringify({
                            url: url,
                        }),
                        // Adding headers to the request 
                        headers: {
                            "Content-type": "application/json"
                        }
                    })];
            case 1:
                shortenUrl_1 = _a.sent();
                return [4 /*yield*/, shortenUrl_1.json()];
            case 2:
                shortenUrlDetails = _a.sent();
                document.getElementById('shrink-text').value = '';
                displayMsgModal(shortenUrlDetails.message);
                displayUrlDetails();
                hideLoader();
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// create a modal to display appropriate msg and disappear in 3 secs
var displayMsgModal = function (msg) {
    var msgModalContainer = document.createElement('div');
    msgModalContainer.classList.add('msg-modal-container');
    msgModalContainer.id = 'msg-modal-container';
    var msgModalContent = document.createElement('div');
    msgModalContent.classList.add('msg-modal-content');
    msgModalContent.innerHTML = msg;
    var modalCloseBtn = document.createElement('div');
    modalCloseBtn.classList.add('modal-close-btn');
    modalCloseBtn.innerHTML = 'close';
    msgModalContent.append(modalCloseBtn);
    msgModalContainer.append(msgModalContent);
    document.body.append(msgModalContainer);
    modalCloseBtn.onclick = function () {
        msgModalContainer.style.display = 'none';
    };
    setTimeout(function () {
        msgModalContainer.remove();
    }, 3000);
};
// on click of btn call a method to shorten the url
document.getElementById('shortenUrl').addEventListener('click', function () {
    shortenUrl();
});
createLoader();
displayUrlDetails();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.ts");
/******/ })()
;
//# sourceMappingURL=index.js.map
