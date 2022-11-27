"use strict";
exports.__esModule = true;
var jsonDatabase_1 = require("./database/jsonDatabase");
var DEBUG = true;
var Debug = function (msg) {
    console.log('LOG DEBUG', msg);
    var data = (0, jsonDatabase_1["default"])("log").read();
    if (!data)
        data = [];
    data.push({ "type": ["log", "debug"], "data": "1" });
    (0, jsonDatabase_1["default"])("log").write(data);
};
var Log = function (logType) {
    var msg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        msg[_i - 1] = arguments[_i];
    }
    if (DEBUG)
        Debug("asdasd");
};
exports["default"] = Log;
