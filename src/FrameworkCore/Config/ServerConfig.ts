import Config from "./Config";

export interface ApiServerI {
  name: String;
  type: String;
  port: number;
}

export interface ReverseProxyI {
  name: String;
  type: String;
  port: number;
  hostname: string;
  target: string;
}

export interface ServerConfigI {
  name: string;
  type: string;
}

export default abstract class ServerConfig
  extends Config
  implements ServerConfigI
{
  abstract name: string;
  abstract type: string;

  constructor(data: string) {
    super(__dirname, data);
  }
}

export class ApiServerConfig extends ServerConfig implements ApiServerI {
  name: string;
  type: string;
  port: number;

  constructor(data: string) {
    super(data);
  }
}

export class ReverseProxyServerConfig
  extends ServerConfig
  implements ReverseProxyI
{
  name: string;
  type: string;
  port: number;
  hostname: string;
  target: string;

  constructor(data: string) {
    super(data);
  }
}
