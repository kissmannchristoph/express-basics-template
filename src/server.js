"use strict";
exports.__esModule = true;
exports.start = void 0;
var express_1 = require("express");
//import { RequestHelper, ResponseHelper } from './net';
var app = (0, express_1["default"])();
/* middleware */
app.use(function (req, res, next) {
    // let _request = RequestHelper(req, res)
    // let _response = ResponseHelper(_request)
    console.log('request time: ', Date.now());
    next();
});
/* route */
var start = function () {
    app.listen(3000, function () { return console.log('listen port: 3000'); });
};
exports.start = start;
