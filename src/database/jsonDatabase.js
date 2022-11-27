"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var fs_1 = require("fs");
var database_1 = require("./database");
var MAIN_DIR = __dirname + "/../../";
var JsonDatabaseClass = /** @class */ (function (_super) {
    __extends(JsonDatabaseClass, _super);
    function JsonDatabaseClass(name) {
        var _this = _super.call(this, name) || this;
        _this.datadir = MAIN_DIR + "data/";
        return _this;
    }
    JsonDatabaseClass.prototype.read = function () {
        try {
            return JSON.parse(fs_1["default"].readFileSync(this.datadir + this.name + '.json'));
        }
        catch (ex) {
            return false;
        }
    };
    JsonDatabaseClass.prototype.write = function (data) {
        fs_1["default"].writeFileSync(this.datadir + this.name + '.json', JSON.stringify(data));
    };
    JsonDatabaseClass.prototype.getByIndex = function (key, value) {
        return this.read().find(function (d) { return d[key] === value; });
    };
    JsonDatabaseClass.prototype.setByIndex = function (key, value) {
    };
    return JsonDatabaseClass;
}(database_1["default"]));
var JsonDatabase = function (name) {
    return new JsonDatabaseClass(name);
};
exports["default"] = JsonDatabase;
