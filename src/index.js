"use strict";
exports.__esModule = true;
var log_1 = require("./log");
var server_1 = require("./server");
(0, log_1["default"])("INFO", "prestart");
(0, server_1.start)();
(0, log_1["default"])("INFO", "afterstart");
/*(async () => {
    const response = await axios.get('https://api.ipify.org');

    console.log(`My public IP address is: ${response.data}`);
})()*/ 
