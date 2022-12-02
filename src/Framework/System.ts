//import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import Response from "./Response";
import express from "express";
import Log from "../log";
import config from "../config"
import glob from "glob";

const APP_DIR =__dirname+"/../app/"

export class Server {
  private readonly app: any;
  public readonly proxy: any;

  public static instance: Server;

  private  controllerList: Controller[]  = [];
  private  routeList: Route[]  = [];
  private  middlewareList: any =  [];

  constructor(public readonly name: string, public readonly port: number) {
    Server.instance = this 
    this.proxy = require('express-http-proxy');
    this.app = express();
    this.app.use(express.static(__dirname + "/../public"));

    this.app.set("views", __dirname + "/../public/views");
    this.app.set("view engine", "ejs");

    this.app.use(function (req: any, res: any, next: any) {
      res.locals.query = req.query;
      res.locals.url = req.originalUrl;

      next();
    });

    //import controller
    
    
    
  const res = glob(APP_DIR + 'server/'+this.name+'' + '/**/*.ts', (err: any, files: any) =>{
 console.log(this.name, APP_DIR + 'server/'+this.name+'' + '/**/*.js')
   console.log(err, files)
    for (let file of files) {
      import(file.replace(__dirname, '.').replace('.js', ''))
    }
  });
  


// use `modules`
    
    
    
  }

  listen() {
    this.app.listen(this.port, () => Log("INFO", "server started | name: " + this.name + " | port: " + this.port));
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
    this.app[method](url, async (req: any, res: any, _next: any) => {
      const requestHost = req.headers.host;
      if (hostnames && hostnames.indexOf(requestHost) === -1) {
    Log("WARN", 'hostname active but, requested Host is '+requestHost)
        return; 
      }
      for (let middlewa of middlewareList) {
        if (skip) {
          break;
        }

        next = true;
        let selectedMiddleware = this.middlewareList.find(
          (middlewaItem:any) => middlewaItem.name === middlewa
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
        response.sendResponse(req, res, _next);
        
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

export abstract class Controller {}

export interface Middleware {
  name: string;

  bootstrap(req: any, res: any, next: any): any;
}

export default class System {
  private serverList: Server[] = [];

  constructor() {
    if (config().server) this.initServer()
  }

  private initServer() {
    for (let {name, port} of config().server) {
      const server = new Server(name, port)
      this.addServer(server)
    }
  }

  addServer(server: Server) {
    this.serverList.push(server);
    Log("INFO", "server added | name: " + server.name)
    server.listen()
  }

  getServer(name: string): Server {
    return this.serverList.filter((entry: Server) => entry.name === name)[0];
  }
}
