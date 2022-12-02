import { Server } from "./System";

export default abstract class Response {
  public server: Server;

  constructor() {}

  public abstract sendResponse(req: any, res: any): boolean;
}

export class JsonResponse extends Response {
  constructor(private readonly json: {}) {
    super();
  }

  public sendResponse(req: any, res: any) {
    res.send("Invalid Token");
    return true;
  }
}

export class ProxyResponse extends Response {
  constructor(private readonly json: {}) {
    super();
  }

  public sendResponse(req: any, res: any) {
    this.server.httpProxy.web(req, res, {target: "https://photoproject-rm.de"}, (e) => {

    })
    return true;
  }
}

export class ViewResponse extends Response {
  constructor(private readonly json: {}) {
    super();
  }

  public sendResponse(req: any, res: any) {
    return true;
  }
}
