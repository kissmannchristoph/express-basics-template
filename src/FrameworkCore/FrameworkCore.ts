import File from "../File";
import StaticFile from "./File/StaticFile";
import { Create as ServerCreate } from "./Server/Server";
import EnvConfig from "./Config/EnvConfig";
import Path from "path";
import ServerConfig from "./Config/ServerConfig";

export default class FrameworkCore {
  constructor(
    private env: EnvConfig,
    private staticFileDirs: StaticFile[],
    private serverRootDir: string
  ) {
    this.initServer();
  }

  private initServer() {
    if (this.env.server == null) return;

    for (let i = 0; i < this.env.server.length; i++) {
      const serverConfig: ServerConfig = this.env.server[i];
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

  public Env(): EnvConfig {
    return this.env;
  }

  public GetStaticFiles(name: string): StaticFile {
    return this.staticFileDirs.find(
      (staticFile: StaticFile) => staticFile.name === name
    );
  }
}

export abstract class CreateOptions {
  public rootDir: string;
  public staticFileDirs?: StaticFile[];
  public serverRootDir: string;
}

const Create = (createOptions: CreateOptions) => {
  console.log(
    "[FrameworkCore]",
    "Call Function",
    "Create",
    "Data",
    createOptions
  );
  let env = new EnvConfig(Path.join(createOptions.rootDir, "env.json"));

  let staticFileDirs: any = [];

  if (createOptions.staticFileDirs)
    staticFileDirs = createOptions.staticFileDirs;

  let { serverRootDir } = createOptions;

  let frameworkCore = new FrameworkCore(env, staticFileDirs, serverRootDir);
};

export { Create };
