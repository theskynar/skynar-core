import * as express from "express";
import * as http from "http";

export interface ISkynarModule {
  beforeInit(app: Express.Application): void;
  afterInit(app: Express.Application): void;
}