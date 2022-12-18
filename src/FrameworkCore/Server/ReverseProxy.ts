import Server from "./Server";
import FrameworkCore from "../FrameworkCore";
import ServerConfig from "../Config/ServerConfig";
import Request from "../Net/Request"
import Response from "../Net/Response"

export default class ReverseProxy extends Server {
  public constructor(frameworkCore: FrameworkCore, serverConfig: ServerConfig) {
    super(frameworkCore, serverConfig);
  }
  public override Start(): any {console.log("ReverseProxy");}

  public override requestListener(req: Request, res: Response): any {

  }
}
