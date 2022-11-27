import JsonDatabase from "./database/jsonDatabase";

const DEBUG = true;

const Debug = (msg: string) => {
  console.log('LOG DEBUG', msg)

  let data = JsonDatabase("log").read();

  if (!data)
    data = [];

  data.push({ "type": ["log", "debug"], "data": "1" });

  JsonDatabase("log").write(data);
}

const Log = (logType: "INFO" | "WARN" | "CRIT", ...msg: any[]) => {

  if (DEBUG)
    Debug("asdasd");
}

export default Log