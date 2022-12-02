import { Server } from "./System";

export default abstract class Response {
  public server: Server;

  constructor() {}

  public abstract sendResponse(req: any, res: any, next: any): boolean;
}

export class JsonResponse extends Response {
  constructor(private readonly json: {}) {
    super();
  }

  public sendResponse(req: any, res: any, next: any) {
    res.send("Invalid Token");
    return true;
  }
}

export class ProxyResponse extends Response {
  constructor(private readonly target: string) {
    super();
  }

  public sendResponse(req: any, res: any, next: any) {
    this.server.ExpressApp.use(this.server.proxy(this.target))
    next()
    return true;
  }
}

export class ViewResponse extends Response {
  constructor(private readonly json: {}) {
    super();
  }

  public sendResponse(req: any, res: any, next: any) {
    return true;
  }
}
