import express from "express";
import Log from "../log";
import config from "../config";
export class Server {
    name;
    port;
    app;
    proxy;
    controllerList = [];
    routeList = [];
    middlewareList = [];
    controllerStates = [];
    getControllerState(name) {
        let controllerState = this.controllerStates[name];
        if (!controllerState)
            return null;
        return controllerState;
    }
    setControllerState(name, controller) {
        this.controllerStates[name] = controller;
    }
    constructor(name, port) {
        this.name = name;
        this.port = port;
        this.proxy = require('express-http-proxy');
        this.app = express();
        this.app.use(express.static(__dirname + "/../public"));
        this.app.set("views", __dirname + "/../public/views");
        this.app.set("view engine", "ejs");
        this.app.use(function (req, res, next) {
            res.locals.query = req.query;
            res.locals.url = req.originalUrl;
            next();
        });
    }
    init() {
        const server = require("../app/server/" + this.name + "/server").default;
        this.controllerList = server.controller;
        this.initController();
    }
    listen() {
        this.app.listen(this.port, () => Log("INFO", "server started | name: " + this.name + " | port: " + this.port));
    }
    get ExpressApp() {
        return this.app;
    }
    addMiddleware(middleware) {
        this.middlewareList.push(middleware);
    }
    addController(controller) {
        this.controllerList.push(controller);
    }
    initController() {
        for (let controller of this.controllerList) {
            controller.server = this;
            let routes = Controller.getRoutes(controller);
            Log("INFO", "Controller Route | " + routes);
            for (let route of routes) {
                this.addRoute(route);
            }
        }
    }
    registerController(controller) {
    }
    addRoute({ method, url, callback, middlewareList, hostnames }) {
        let next = false;
        let skip = false;
        this.app[method](url, async (req, res, _next) => {
            const requestHost = req.headers.host;
            if (hostnames && hostnames.indexOf(requestHost) === -1) {
                Log("WARN", 'hostname active but, requested Host is ' + requestHost);
                return;
            }
            for (let middlewa of middlewareList) {
                if (skip) {
                    break;
                }
                next = true;
                let selectedMiddleware = this.middlewareList.find((middlewaItem) => middlewaItem.name === middlewa);
                selectedMiddleware.bootstrap(req, res, (_skip = false) => {
                    if (!skip) {
                        skip = _skip;
                        next = false;
                    }
                });
                console.log("wait begin");
                while (next) { }
                console.log("wait end");
            }
            if (skip)
                return;
            if (callback) {
                const response = callback(req);
                response.server = this;
                response.sendResponse(req, res, _next);
            }
        });
    }
}
export class Route {
    method;
    url;
    callback;
    action;
    middlewareList;
    hostnames;
}
export class Controller {
    name;
    serverName;
    routes = [];
    actionParameters = [];
    constructor(name, serverName) {
        this.name = name;
        this.serverName = serverName;
    }
    route(route) {
        const parameters = this.getActionParameters(route.action);
        route.callback();
    }
    addRoute(route) {
        route.callback = this.route(route);
    }
    getActionParameters(functionName) {
        let parameters = this.actionParameters[functionName];
        if (!parameters)
            parameters = [];
        return parameters;
    }
    addActionParameter(functionName, parameter) {
        const parameters = this.getActionParameters(functionName);
        parameters.push(parameter);
    }
    static getRoutes(obj) {
        let routes = [];
        //const object = Object.create(obj)
        console.log(Object.getOwnPropertyNames(obj));
        /*for(let key of keys) {
          const func = (this as any)[key]
          console.log(func)
        }*/
        return routes;
    }
}
export default class System {
    serverList = [];
    static instance;
    constructor() {
        System.instance = this;
        if (config().server)
            this.initServer();
        for (let server of this.serverList) {
            server.init();
        }
    }
    initServer() {
        for (let { name, port } of config().server) {
            const server = new Server(name, port);
            this.addServer(server);
        }
    }
    addServer(server) {
        this.serverList.push(server);
        Log("INFO", "server added | name: " + server.name);
        // server.listen()
    }
    getServer(name) {
        return this.serverList.filter((entry) => entry.name === name)[0];
    }
}
//# sourceMappingURL=System.js.map