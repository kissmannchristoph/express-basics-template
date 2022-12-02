//import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import Response from "./Response";
import express from "express";
import Log from "../log";
import config from "../config"

export class Server {
  private readonly app: any;
  public readonly proxy: any;

  private  controllerList: any[]  = [];
  private  routeList: Route[]  = [];
  private  middlewareList: any =  [];

  private controllerStates: any = []

  public getControllerState(name: string): null | Controller {
    let controllerState = this.controllerStates[name]

    if (!controllerState) return null

    return controllerState
  }

  public setControllerState(name: string, controller: Controller) {
    this.controllerStates[name] = controller
  }

  constructor(public readonly name: string, public readonly port: number) { 
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
  }

  public init() {

    const server = require("../app/server/" + this.name + "/server").default;

    this.controllerList = server.controller

    this.initController() 
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

  addController(controller: any) {
    this.controllerList.push(controller)
  }

  private initController() {
    for (let controller of this.controllerList) {
      controller.server = this
      let routes = Controller.getRoutes(controller);
      Log("INFO", "Controller Route | " + routes)
      for (let route of routes) {
        this.addRoute(route)
      }
    }    
  } 

  public registerController(controller: any) {

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

export abstract class Route {
  method: "get" | "post";
  url: string;
  callback?: any;
  action?: string;
  middlewareList: string[];
  hostnames?: string[];
}

interface ActionParameter {
  target: "query",
  key: string
}

export abstract class Controller {
 
  private routes: Route[] = []
  private actionParameters: any = []

  constructor(public name: string, public serverName: string) {
   
  }

  private route(route: Route) {
    const parameters = this.getActionParameters(route.action)
    
    route.callback()    
  }

  public addRoute(route: Route)
  {
    route.callback = this.route(route)
  }

  public getActionParameters(functionName: string): ActionParameter[]
  {
    let parameters = this.actionParameters[functionName];

    if (!parameters) parameters = []
  
    return parameters
  }

  public addActionParameter(functionName: string, parameter:    ActionParameter) {
    const parameters = this.getActionParameters(functionName)
    parameters.push(parameter)
  }

  public static getRoutes(obj: any): Route[] {
    let routes: Route[] = []
    //const object = Object.create(obj)
     console.log(Object.getOwnPropertyNames(obj))
    /*for(let key of keys) {
      const func = (this as any)[key]
      console.log(func) 
    }*/

    return routes
  }
}

export interface Middleware {
  name: string;

  bootstrap(req: any, res: any, next: any): any;
}

export default class System {
  private serverList: Server[] = [];
  public static instance: System

  constructor() {
    System.instance = this
    if (config().server) this.initServer()

    for (let server of this.serverList) {
      server.init()
    }
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
   // server.listen()
  }

  getServer(name: string): Server {
    return this.serverList.filter((entry: Server) => entry.name === name)[0];
  }
}
