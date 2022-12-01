import express from "express";

export interface Middleware {
  name: string;

  bootstrap(req: any, res: any, next: any): any;
}

const Server = () => {
  const app = express();
  app.use(express.static(__dirname + "/../public"));
  app.set("views", __dirname + "/../public/views");
  app.set("view engine", "ejs");
  let middlewareList: Middleware[] = [];
  //let routeList = [];
  /* route */

  const addMiddleware = (middleware: Middleware) => {
    middlewareList.push(middleware);
  };

  const addRoute = async (
    _type: "get" | "post",
    _url: string,
    _func: any,
    _name: string,
    middleware: string[]
  ) => {
    let next = false;
    let skip = false;
    app[_type](_url, async (req: any, res: any) => {
      for (let middlewa of middleware) {
        if (skip) {
          break;
        }

        next = true;
        let selectedMiddleware = middlewareList.find(
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

      if (_func) _func(req, res);
    });
  };

  app.listen(3000, () => console.log("listen port: 3000"));

  return { addMiddleware, addRoute };
};

export default Server;
