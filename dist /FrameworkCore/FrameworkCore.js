import { Create as ServerCreate } from "./Server/Server";
import EnvConfig from "./Config/EnvConfig";
import Path from "path";
export default class FrameworkCore {
    env;
    staticFileDirs;
    serverRootDir;
    constructor(env, staticFileDirs, serverRootDir) {
        this.env = env;
        this.staticFileDirs = staticFileDirs;
        this.serverRootDir = serverRootDir;
        this.initServer();
    }
    initServer() {
        if (this.env.server == null)
            return;
        for (let i = 0; i < this.env.server.length; i++) {
            const serverConfig = this.env.server[i];
            ServerCreate(this, serverConfig);
        }
        /*[
          {
            name: "default",
            type: "Api",
            port: 8081,
          },
          {
            port: 80,
            hostname: "test.dev",
            type: "ReverseProxy",
            target: "http://google.de",
          },
        ];*/
    }
    Env() {
        return this.env;
    }
    GetStaticFiles(name) {
        return this.staticFileDirs.find((staticFile) => staticFile.name === name);
    }
}
export class CreateOptions {
    rootDir;
    staticFileDirs;
    serverRootDir;
}
const Create = (createOptions) => {
    console.log("[FrameworkCore]", "Call Function", "Create", "Data", createOptions);
    let env = new EnvConfig(Path.join(createOptions.rootDir, "env.json"));
    let staticFileDirs = [];
    if (createOptions.staticFileDirs)
        staticFileDirs = createOptions.staticFileDirs;
    let { serverRootDir } = createOptions;
    let frameworkCore = new FrameworkCore(env, staticFileDirs, serverRootDir);
};
export { Create };
//# sourceMappingURL=FrameworkCore.js.map