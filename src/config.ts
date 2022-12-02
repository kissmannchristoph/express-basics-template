import File from "./File";

const configFile = __dirname + "/../config.json";
let tmpConfig: any;

interface Config {
  server?: any;
  reverseProxy?: any;
}

const config = (): Config => {
  if (!tmpConfig) {
    tmpConfig = JSON.parse(new File(configFile).readFile());
  }

  return tmpConfig;
};

export default config;
