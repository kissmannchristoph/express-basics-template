import Api from "./Api";
import ReverseProxy from "./ReverseProxy";
import FrameworkCore from "../FrameworkCore";
import ServerConfig from "../Config/ServerConfig";

export default abstract class Server {
  public frameworkCore: FrameworkCore;
  public serverConfig: ServerConfig;

  public abstract Start(): any;
}

const types: any = { Api, ReverseProxy };

const Create = (frameworkCore: FrameworkCore, serverConfig: ServerConfig) => {
  console.log("asd");
  const server = types[serverConfig.type];
  const serverInstance = new server();
  serverInstance.frameworkCore = frameworkCore;
  serverInstance.serverConfig = serverConfig;
  return serverInstance;
};

export { types, Create };
