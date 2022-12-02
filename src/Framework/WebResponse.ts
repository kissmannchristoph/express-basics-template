export default abstract class WebResponse {
    constructor() {}

    public abstract sendResponse(req: Request, res: Response): boolean 
}

export class JsonResponse extends WebResponse {
    constructor(private readonly json: {}) {
        super()
    }

    public sendResponse(req: Request, res: Response) {
        return true;
    }
} 

export class ProxyResponse extends WebResponse {
    constructor(private readonly json: {}) {
        super()
    }

    public sendResponse(req: Request, res: Response) {
        return true;
    }
}

export class ViewResponse extends WebResponse {
    constructor(private readonly json: {}) {
        super()
    }

    public sendResponse(req: Request, res: Response) {
        return true;
    }
}
const users = (username: string): WebResponse => {
    return new JsonResponse({"username": "hund"})
}

const t = (req: Request, res: Response) => {
    let webResponse: WebResponse = users('abc')
    webResponse.sendResponse(req, res)
}
class Mid {
    
}

class controller {
    public users(username: string): WebResponse {
        return new JsonResponse({"username": "hund"})
    }
}


class System {

public getArgumentsByFunction(func: Function) {
    func.arguments`1     .4`
}


}