import * as dotenv from "dotenv";
dotenv.config();

//import Server, { Middleware } from "./server";
import Session from "./session/session";

import Database from "./JsonDB/Database";

//import System from "./Framework/System"

import Table from "./JsonDB/Table"
   import {QueryBuilder} from "./JsonDB/Query"
//const ServerInstance = Server();
import System, {Middleware} from "./Framework/System";
import Response, { JsonResponse } from "./Framework/Response";

const notLoad = false;

class auth implements Middleware {
  constructor(public name = "auth") {}

  bootstrap(req: any, res: any, next: any) {
    // let user = {username: "klaus"};
    //  req.user = user;

    if (req.query["token"]) {
      let user = Session(req.query.token, null);
      if (!user) {
        res.send("Invalid Token");
        next(true);
      }
      req.user = user;
      //next();
      //return;
    }
    next();
  }
}

class area implements Middleware {
  constructor(public name = "area") {}

  bootstrap(req: any, res: any, next: any) {
    if (!req.user) {
      res.redirect("/");
      next(true);
    }

    next();
  }
}

class login implements Middleware {
  private userTable: Table;
  constructor(public name = "login") {
this.userTable = Database.loadTable("users")
}





  bootstrap(req: any, res: any, next: any) {
    if (!req.user && req.query.username && req.query.password) {
      let queryBuilder: QueryBuilder = new QueryBuilder(this.userTable)
      
      let user = queryBuilder.Select().where([["username", req.query.username], ["password", req.query.password]]).find();
      
      if (!user) {
        
   
      res.redirect("/?loginfail");
      //res.location("/index?token=" + token);
      //res.send(302);
      next(true);
      } else {
      let token = Session(null, { username: req.query.username });
      console.log("token", token);
      console.log("user",user)
      res.redirect("/index?token=" + token);
      //res.location("/index?token=" + token);
      //res.send(302);
      next(true);
    }
}
    next();
  }
}
//https://stackoverflow.com/questions/5710358/how-to-access-post-form-fields-in-express
//https://raddy.dev/blog/nodejs-setup-with-html-css-js-ejs/

if (!notLoad) {
  load();
} else {
  const userTable = Database.loadTable("users");
  console.log(userTable);
  Database.saveTable(userTable);
}

function load() {
  const {addMiddleware, addRoute} = new System();
  addMiddleware(new auth());
  addMiddleware(new login());
  addMiddleware(new area());
addRoute({
  "method": "get",
  "url": "",
  "callback": (request: Request): Response => {
    return new JsonResponse({"data": request})
  },
  "middlewareList": []
})
  //addRoute("get", "/login", null, "login", ["login"]);

}
