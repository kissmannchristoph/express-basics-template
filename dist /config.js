import File from "./File";
const configFile = __dirname + "/../config.json";
let tmpConfig;
const config = () => {
    if (!tmpConfig) {
        tmpConfig = JSON.parse(new File(configFile).readFile());
    }
    return tmpConfig;
};
export default config;
//# sourceMappingURL=config.js.map