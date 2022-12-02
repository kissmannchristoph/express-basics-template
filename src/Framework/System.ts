//import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import Response from './Response';
import express from 'express'

export interface Route {
    method: "get" | "post",
    url: string,
    callback: any,
    middlewareList: string[]
}

abstract class Controller {

}

export interface Middleware {
    name: string;
  
    bootstrap(req: any, res: any, next: any): any;
  }

  

export default class System {
    private readonly app:any;
    constructor(
        private controllerList: Controller[] = [],
        private routeList: Route[] = [],
        private middlewareList: Middleware[] = [] 
    ) {

        this.app = express();
        this.app.use(express.static(__dirname + "/../public"));
      
        this.app.set("views", __dirname + "/../public/views");
        this.app.set("view engine", "ejs");
      
        this.app.use(function (req:any, res:any, next:any) {
          res.locals.query = req.query;
          res.locals.url = req.originalUrl;
      
          next();
        });
      
        this.app.listen(3000, () => console.log("listen port: 3000"));
    }


    addMiddleware (middleware: Middleware) {
        this.middlewareList.push(middleware);
      };

    addRoute ({method, url, callback, middlewareList}: Route) {
        let next = false;
        let skip = false;
        this.app[method](url, async (req: any, res: any) => {
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
            response.sendResponse(res);
        };
        });
    }


}

