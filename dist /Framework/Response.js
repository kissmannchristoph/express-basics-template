export default class Response {
    server;
    constructor() { }
}
export class JsonResponse extends Response {
    json;
    constructor(json) {
        super();
        this.json = json;
    }
    sendResponse(req, res, next) {
        res.send("Invalid Token");
        return true;
    }
}
export class ProxyResponse extends Response {
    target;
    constructor(target) {
        super();
        this.target = target;
    }
    sendResponse(req, res, next) {
        this.server.ExpressApp.use(this.server.proxy(this.target));
        next();
        return true;
    }
}
export class ViewResponse extends Response {
    json;
    constructor(json) {
        super();
        this.json = json;
    }
    sendResponse(req, res, next) {
        return true;
    }
}
//# sourceMappingURL=Response.js.map