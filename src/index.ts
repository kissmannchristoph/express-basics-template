import Server, {Middleware} from "./server"
import Session from "./session/session";


const ServerInstance = Server();
const {addMiddleware,addRoute} = ServerInstance;

class auth implements Middleware {

  
  constructor(public name = "auth") {
    
  }
  
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
  
class test implements Middleware {

  
  constructor(public name = "test") {
    
  }
  
  bootstrap(req: any, res: any, next: any) {
    if (!req.user) {
    
 
       let token = Session(null, {username: "username"});
           res.send("Please Login "+
          ""+token);
          console.log("token", token);
      next(true);
    }
    
    next();
  }
}

addMiddleware(new auth());
addMiddleware(new test());


addRoute("get", "/", (req:any, res: any) => {
  res.send("Welcome");
}, "root", ["auth", "test"]);
