export default abstract class Response {
    constructor() {}

    public abstract sendResponse(res: any): boolean 
}

export class JsonResponse extends Response {
    constructor(private readonly json: {}) {
        super()
    }

    public sendResponse(res: any) {
        res.send("Invalid Token");
        return true;
    }
} 

export class ProxyResponse extends Response {
    constructor(private readonly json: {}) {
        super()
    }

    public sendResponse(res: any) {
        return true;
    }
}

export class ViewResponse extends Response {
    constructor(private readonly json: {}) {
        super()
    }

    public sendResponse(res: any) {
        return true;
    }
}