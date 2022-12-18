import JsonDatabase from "./database/jsonDatabase";
const DEBUG = true;
const Debug = (msg) => {
    console.log(msg);
};
const Log = (logType, msg) => {
    let data = JsonDatabase("log").read();
    if (!data) {
        data = { li: [] };
        data.li.push({ type: ["log", "debug"], data: "1" });
        JsonDatabase("log").write(data);
    }
    data.li.push({ type: [logType], data: msg });
    JsonDatabase("log").write(data);
    if (DEBUG)
        Debug(logType + "–" + msg);
};
export default Log;
//# sourceMappingURL=log.js.map