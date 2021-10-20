import { Router } from 'express';

export declare var SERVER_DEFAULT_CONFIG: {
  port: number,
  controllers: Router,
  inConjunctionRunHttps?: boolean
};

export declare const exports: {
  // run(port: number, controllers: Array<Router>, inConjunctionRunHttps?: boolean): void;
  use(configs: Array<{port: number, controllers: Array<Router>, inConjunctionRunHttps?: boolean}>): void;
};
export declare function startupServer(
  port: number, controllers: Array<Router>, inConjunctionRunHttps?: boolean
): void;
