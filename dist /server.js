import express from "express";
const Server = () => {
    const app = express();
    app.use(express.static(__dirname + "/../public"));
    app.set("views", __dirname + "/../public/views");
    app.set("view engine", "ejs");
    app.use(function (req, res, next) {
        res.locals.query = req.query;
        res.locals.url = req.originalUrl;
        next();
    });
    let middlewareList = [];
    //let routeList = [];
    /* route */
    const addMiddleware = (middleware) => {
        middlewareList.push(middleware);
    };
    const addRoute = async (_type, _url, _func, _name, middleware) => {
        let next = false;
        let skip = false;
        app[_type](_url, async (req, res) => {
            for (let middlewa of middleware) {
                if (skip) {
                    break;
                }
                next = true;
                let selectedMiddleware = middlewareList.find((middlewaItem) => middlewaItem.name === middlewa);
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
            if (_func)
                _func(req, res);
        });
    };
    app.listen(3000, () => console.log("listen port: 3000"));
    return { addMiddleware, addRoute };
};
export default Server;
//# sourceMappingURL=server.js.map