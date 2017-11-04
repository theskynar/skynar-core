import * as express from "express";
export interface ISkynarModule {
  beforeInit(app: Skynar.Application): void;
  afterInit(app: Skynar.Application): void;
}