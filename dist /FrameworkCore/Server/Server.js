import Api from "./Api";
import ReverseProxy from "./ReverseProxy";
export default class Server {
    frameworkCore;
    serverConfig;
    constructor() {
    }
}
const types = { Api, ReverseProxy };
const Create = (frameworkCore, serverConfig) => {
    let server = types[serverConfig.type];
    let serverInstance = new server();
    serverInstance.frameworkCore = frameworkCore;
    serverInstance.serverConfig = serverConfig;
    return serverInstance;
};
export { types, Create };
//# sourceMappingURL=Server.js.map