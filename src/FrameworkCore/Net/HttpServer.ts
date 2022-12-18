import http, { IncomingMessage, Server, ServerResponse } from "http"

export default class HttpServer {

    private server: Server;

    constructor(port: number, requestListener: any) {
        this.server = http.createServer(requestListener);
        this.server.listen(port);
    }

    requestListener   (req: IncomingMessage, res: ServerResponse) {
 
    res.writeHead(200);
    res.end('Hello, World!');
  }
}

  