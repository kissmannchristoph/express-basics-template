//import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import Response from "./Response";
import express from "express";
import Log from "../log";

const httpProxyClass = require("http-proxy");

export class Server {
  private readonly app: any;
  public httpProxy: any;


  private readonly controllerList: Controller[];
  private readonly routeList: Route[];
  private readonly middlewareList: Middleware[];

  constructor(public readonly name: string) {
    this.httpProxy = httpProxyClass.createProxyServer();

    this.app = express();
    this.app.use(express.static(__dirname + "/../public"));

    this.app.set("views", __dirname + "/../public/views");
    this.app.set("view engine", "ejs");

    this.app.use(function (req: any, res: any, next: any) {
      res.locals.query = req.query;
      res.locals.url = req.originalUrl;

      next();
    });
  }

  listen(port: number) {
    this.app.listen(port, () => console.log("listen port: ${port}"));
  }

  public get ExpressApp() {
    return this.app;
  }

  addMiddleware(middleware: Middleware) {
    this.middlewareList.push(middleware);
  }

  addRoute({ method, url, callback, middlewareList, hostnames }: Route) {
    let next = false;
    let skip = false;
    this.app[method](url, async (req: any, res: any) => {
      const requestHost = req.headers.host;
      if (hostnames && hostnames.indexOf(requestHost) === -1) {
        Log("WARN", 'hostname active but, requested Host is ${requestHost}')
        return; 
      }
      for (let middlewa of middlewareList) {
        if (skip) {
          break;
        }

        next = true;
        let selectedMiddleware = this.middlewareList.find(
          (middlewaItem) => middlewaItem.name === middlewa
        );

        selectedMiddleware.bootstrap(req, res, (_skip: boolean = false) => {
          if (!skip) {
            skip = _skip;
            next = false;
          }
        });

        console.log("wait begin");
        while (next) {}

        console.log("wait end");
      }

      if (skip) return;

      if (callback) {
        const response: Response = callback(req);
        response.server = this;
        response.sendResponse(req, res);
      }
    });
  }
}

export interface Route {
  method: "get" | "post";
  url: string;
  callback: any;
  middlewareList: string[];
  hostnames?: string[];
}

abstract class Controller {}

export interface Middleware {
  name: string;

  bootstrap(req: any, res: any, next: any): any;
}

export default class System {
  private readonly serverList: Server[];

  constructor() {}

  addServer(server: Server) {
    this.serverList.push(server);
  }

  getServer(name: string): Server {
    return this.serverList.filter((entry: Server) => entry.name === name)[0];
  }
}
