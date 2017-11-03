import { IServerOptions } from "../types/IServerOptions";
import { Container, decorate, injectable } from "inversify";
import * as express from "express";
import { ISkynarModule } from "../index";

export function Server(options: IServerOptions) {
  return function(target) {

    // Create express app
    let app = express();

    // Resolve Dependency Injection with Inversify
    let container = new Container();

    if(options.providers)
    for(let item of options.providers) {
      decorate(injectable(), item)
      container.bind(item).toSelf();
    }
    
    if(options.modules.length) {
      for(let item of options.modules) {
        let module = new item();
        let mergedContainer = Container.merge(container, module.container);
        module.controllers = module.controllers.map(item => mergedContainer.get(item));
        if(module.beforeInit) module.beforeInit();
        for(let controller of module.controllers) 
          for(let route of controller._routes) app[route.method](route.path, controller[route.handler].bind(controller))
        if(module.afterInit) module.afterInit();
      }
    }

    // Save target
    let original = target;
    // New constructor
    let server = function(...args) {
      new original(...args);
    }
    // Copy original props to new module
    server.prototype = original.prototype;
    // Increment properties
    server.prototype._app = app;
    // Return new module
    return <any>server;
  }
}