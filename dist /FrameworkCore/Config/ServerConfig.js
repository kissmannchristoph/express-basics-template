import Config from "./Config";
export default class ServerConfig extends Config {
    constructor(data) {
        super(__dirname, data);
    }
}
export class ApiServerConfig extends ServerConfig {
    name;
    type;
    port;
    constructor(data) {
        super(data);
    }
}
export class ReverseProxyServerConfig extends ServerConfig {
    name;
    type;
    port;
    hostname;
    target;
    constructor(data) {
        super(data);
    }
}
//# sourceMappingURL=ServerConfig.js.map