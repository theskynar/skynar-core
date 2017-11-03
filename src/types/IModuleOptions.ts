import { ISkynarModule } from "../base/interfaces/ISkynarModule"

export interface IModuleOptions {
  baseRoute?: string,
  controllers?: Array<any>
  providers?: Array<any>
}