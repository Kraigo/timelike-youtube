import {ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware} from "@tsed/common";
import Path = require("path");
import "@tsed/mongoose";
import "@tsed/swagger";

@ServerSettings({
    rootDir: Path.resolve(__dirname),
    acceptMimes: ["application/json"],
    mongoose: {
        url: process.env.MONGO_CONNECTION,
        connectionOptions: {
            useNewUrlParser: true
        }
    },
    componentsScan: [
        `${__dirname}/middlewares/**/**.{ts,js}`,
        `${__dirname}/services/**/**.{ts,js}`
    ],
    swagger: {
        path: "/api-docs",
        spec: {
            security: [{
                Bearer: []
            }],
            securityDefinitions: {
                Bearer: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "Authorization token"
                }
            }
        }
    }
})
export class Server extends ServerLoader {

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $onMountingMiddlewares(): void|Promise<any> {
    
        const morgan = require('morgan'),
            cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            compress = require('compression'),
            methodOverride = require('method-override'),
            session = require("express-session");

        this
            .use(morgan('dev'))
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .use(session({
                secret: "mysecretkey",
                resave: true,
                saveUninitialized: true,
                maxAge: 36000,
                cookie: {
                    path: "/",
                    httpOnly: true,
                    secure: false,
                    maxAge: null
                }
            }));
            
        // EJS Engine Setting
        this.engine('.html', require('ejs').__express)
            .set('views', Path.resolve(__dirname, 'views')) // './views
            .set('view engine', 'html');

        return null;
    }

    public $onReady(){
        console.log('Server started...');
    }
   
    public $onServerInitError(err){
        console.error(err);
    }
}

new Server().start();