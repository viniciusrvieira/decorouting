import "reflect-metadata";

import { MetadataKeys } from "../config";

export const Router = (basePath: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
  };
};
