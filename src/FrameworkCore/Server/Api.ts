import Server from "./Server";
import FrameworkCore from "../FrameworkCore";
import ServerConfig from "../Config/ServerConfig";
import { requestListener } from "../Net/Request";
import Request from "../Net/Request"
import Response from "../Net/Response"

export default class Api extends Server {

   constructor(frameworkCore: FrameworkCore, serverConfig: ServerConfig) {
    super(frameworkCore, serverConfig);
  }

  public override Start(): any {
    
  }

  public requestListener(req: Request, res: Response) {
    requestListener(req, res)
  }
}
