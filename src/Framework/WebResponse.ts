
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