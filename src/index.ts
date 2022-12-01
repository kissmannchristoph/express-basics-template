import * as dotenv from "dotenv";
dotenv.config();

import Server, { Middleware } from "./server";
import Session from "./session/session";

import Database from "./JsonDB/Database";

const ServerInstance = Server();
const { addMiddleware, addRoute } = ServerInstance;

const notLoad = true;

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
  constructor(public name = "login") {}

  bootstrap(req: any, res: any, next: any) {
    if (!req.user && req.query.username) {
      let token = Session(null, { username: req.query.username });
      console.log("token", token);
      res.redirect("/index?token=" + token);
      //res.location("/index?token=" + token);
      //res.send(302);
      next(true);
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
}

function load() {
  addMiddleware(new auth());
  addMiddleware(new login());
  addMiddleware(new area());

  addRoute("get", "/login", null, "login", ["login"]);

  addRoute(
    "get",
    "/logout",
    (req: any, res: any) => {
      req.user = null;
      res.render("index", { text: "GG" });
    },
    "logout",
    ["auth", "area"]
  );

  addRoute(
    "get",
    "/",
    (req: any, res: any) => {
      res.render("index", { text: "Hey" });
    },
    "index",
    []
  );

  addRoute(
    "get",
    "/index",
    (req: any, res: any) => {
      res.render("home");
    },
    "root",
    ["auth", "area"]
  );
}
