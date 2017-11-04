import { ISkynarModule } from "./base/interfaces/ISkynarModule"
import { SkynarServer } from "./base/SkynarServer"
import { Module } from "./decorators/Module"
import { Server } from "./decorators/Server"
import * as express from "express"

declare global {
    namespace Skynar {
        interface Request extends express.Request {}
        interface Response extends express.Response {}
        interface Application extends express.Express {}
    }
}

export { ISkynarModule, Module, SkynarServer, Server }
export { inject, injectable } from "inversify"