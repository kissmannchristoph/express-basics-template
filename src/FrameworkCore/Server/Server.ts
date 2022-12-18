import ServerConfig from "../Config/ServerConfig";
import FrameworkCore from "../FrameworkCore";
import HttpServer from "../Net/HttpServer";
import Request from "../Net/Request"
import Response from "../Net/Response"

export default abstract class Server {
  
  private frameworkCore: FrameworkCore
  private serverConfig: ServerConfig
  
private httpServer: HttpServer

   constructor( frameworkCore: FrameworkCore,
     serverConfig: ServerConfig) {
      this.frameworkCore = frameworkCore;
      this.serverConfig = serverConfig;

      this.httpServer = new HttpServer(serverConfig.port, this.requestListener)
  }

  public abstract Start():any ;
  public abstract requestListener(req: Request, res: Response): any;
}

const CreateServer = (frameworkCore: any, serverConfig: any, server: Server) => {



  //let server = types[serverConfig.type];
  /*let serverObject = Object.create(server);
  let serverInstance = new serverObject(frameworkCore, serverConfig);
  serverInstance.frameworkCore = frameworkCore;
  serverInstance.serverConfig = serverConfig;*/
  return server;
};

export { CreateServer };
