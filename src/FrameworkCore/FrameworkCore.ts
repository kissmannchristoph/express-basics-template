
import StaticFile from "./File/StaticFile";
import Server, {CreateServer}  from "./Server/Server";
import EnvConfig from "./Config/EnvConfig";
import Path from "path";
import ServerConfig from "./Config/ServerConfig";
import ReverseProxy from "./Server/ReverseProxy";
import Api from "./Server/Api";
export default class FrameworkCore {
  public constructor(
    private env: any,
    private staticFileDirs: StaticFile[],
    private serverRootDir: string
  ) {
   this.initServer();
  }

  private initServer() {
    if (this.Env().server == null) return;

    for (let i = 0; i < this.Env().server.length; i++) {
      const serverConfig: ServerConfig = this.Env().server[i];

      let server: Server | null = null;

      switch(serverConfig.type) {
        case "Api": server = new Api(this, serverConfig); break;
        case "ReverseProxy": server = new ReverseProxy(this, serverConfig); break;
      }

      server.Start();
    }
  }

  public Env(): EnvConfig {
    return this.env.data;
  }

  public GetStaticFiles(name: string): StaticFile {
    return this.staticFileDirs.find(
      (staticFile: StaticFile) => staticFile.name === name
    );
  }
}

export class CreateOptions {
  public rootDir: string;
  public staticFileDirs: StaticFile[];
  public serverRootDir: string;
}

function Build (createOptions: any)  {
  let env = new EnvConfig(Path.join(createOptions.rootDir, "env.json"));

  let staticFileDirs: any = [];

  if (createOptions.staticFileDirs)
    staticFileDirs = createOptions.staticFileDirs;

  let { serverRootDir } = createOptions;

  let frameworkCore = new FrameworkCore(env, staticFileDirs, serverRootDir);
  return frameworkCore;

}

const create = (createOptions: any) =>{
  console.log("asd")
  Build(createOptions);

} 
export {create}

