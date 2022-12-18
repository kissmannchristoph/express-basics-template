import http, { IncomingMessage, Server, ServerResponse } from "http"

export default class Response extends ServerResponse {

    sendResponse(responseType: ResponseType) {
        responseType.sendResponse(this)
    }
}

abstract class ResponseType {
    abstract sendResponse(response: Response): any;
}

export class JsonResponse extends ResponseType {
    constructor() {
        super();
    }

    sendResponse(response: Response): any {
        console.log(JSON.stringify(response))
    }
}