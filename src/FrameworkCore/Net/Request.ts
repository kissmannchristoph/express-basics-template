import http, { IncomingMessage, Server, ServerResponse } from "http"
import Response, { JsonResponse } from "./Response"

export default class Request extends IncomingMessage {

    FormatUrl(): {} {
        const host = this.headers.host;
        const url = this.url;

        return {host, url}
    }

}

const requestListener = (req: Request, res: Response) => {
    res.sendResponse(new JsonResponse())
}

export { requestListener }