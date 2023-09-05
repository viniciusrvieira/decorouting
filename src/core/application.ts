import "reflect-metadata";

import express, { Application as ExpressApp, Handler } from "express";

import { IRoute } from "./types/route";
import { MetadataKeys } from "./config/metadata.keys";

export class Application {
  private readonly _instance: ExpressApp;

  get instance(): ExpressApp {
    return this._instance;
  }

  constructor(private middlewares: any, private routers: any) {
    this._instance = express();

    this._instance.use(express.json());

    this.registerMiddlewares();

    this.registerRouters();
  }

  private registerMiddlewares() {
    if (!this.middlewares?.length) return;

    this.middlewares.forEach((middleware: any) =>
      this._instance.use(middleware)
    );
  }

  private registerRouters() {
    this.routers.forEach((router: any) => {
      const routerInstance: { [handleName: string]: Handler } = new router();

      const expressRouter = express.Router();

      const { basePath, routes } = this.getRouterMetadata(router);

      routes.forEach(({ method, path, middlewares, handlerName }) =>
        expressRouter[method](
          path,
          middlewares,
          routerInstance[String(handlerName)].bind(routerInstance)
        )
      );

      this._instance.use(basePath, expressRouter);
    });
  }

  private getRouterMetadata(router: any) {
    const basePath: string = Reflect.getMetadata(
      MetadataKeys.BASE_PATH,
      router
    );

    const routes: IRoute[] = Reflect.getMetadata(MetadataKeys.ROUTES, router);

    return { basePath, routes };
  }
}
