import Config from "./Config";
import ServerConfig from "./ServerConfig";

export interface EnvConfigI {
  server: ServerConfig[];
}

export default class EnvConfig extends Config implements EnvConfigI {
  server: ServerConfig[];

  public constructor(uri: string) {
    super(uri, null);
  }
}
