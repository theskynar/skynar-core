import * as express from "express";
import * as bodyParser from "body-parser";
import { IServerOptions } from "../types/IServerOptions";
import { Container } from "inversify";

export class ConfigureApp {

    static SetConfig(app: Skynar.Application, options: IServerOptions): Skynar.Application {

        if(options.parseBody !== false) app.use(bodyParser.json());
        
        if(options.staticFilesFolder) app.use(express.static(options.staticFilesFolder))
        else app.use(express.static('views'))

        return app;
    }

    static SetRoutes(app: Skynar.Application, options: IServerOptions) {

        for(let item of options.modules) {
            let module = new item();
            let container = ConfigureApp.DependencyResolve(module.controllers, module.providers, options.providers)
            module.controllers = module.controllers.map(item => container.resolve(item));

            if(module.beforeInit) module.beforeInit(app);
    
            for(let controller of module.controllers) {
                for(let route of controller._routes) {
                    ConfigureApp.ConfigureRoute(app, controller, route);
                }
            } 
    
            if(module.afterInit) module.afterInit(app);
        }

    }

    static DependencyResolve(controllers: any[], providers: any[], serverProviders: any[]): Container {
        let container = new Container();

        for(let controller of controllers) container.bind(controller).toSelf();
        for(let provider of providers) container.bind(provider).toSelf();
        for(let sharedProvider of serverProviders) container.bind(sharedProvider).toSelf();

        return container;
    }

    private static ConfigureRoute(app: Skynar.Application, controller, route) {

        if(controller._middleware) app[route.method](route.path, controller._middleware);
        app[route.method](route.path, controller[route.handler].bind(controller));
    } 
}