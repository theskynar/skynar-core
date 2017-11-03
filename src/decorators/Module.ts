import { IModuleOptions } from "../types/IModuleOptions";
import { IController } from "../types/IController";
import { MapRoutes } from "../helpers/MapRoutes";
import { Container, decorate, injectable } from "inversify"
import "reflect-metadata";

export function Module(options: IModuleOptions) {
  return function(target) {
    
    // Resolve routes
    let controllers = [];
    if(options.controllers.length) {
      controllers = options.controllers.map(item => {
        item.prototype._routes = MapRoutes(item, options.baseRoute);
        return item;
      })
    }

    // Resolve Dependency Injection with Inversify
    let container = new Container();
    for(let item of controllers) {
      container.bind(item).toSelf();
    }

    if(options.providers)
      for(let item of options.providers) {
        decorate(injectable(), item)
        container.bind(item).toSelf();
      }

    // Save target
    let original = target;
    // New constructor
    let module = function(...args) {
      new original(...args);
    }
    // Copy original props to new module
    module.prototype = original.prototype;
    // Increment properties
    module.prototype.controllers = controllers;
    module.prototype.container = container;
    // Return new module
    return <any>module;
  }
}