import { Controller, Post, Req, Res, Type, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Request, Response } from 'express';

import { IRunnableAction, Lifecycle } from '@xanthous/rasa-sdk';

import { DYNAMIC_ACTION_REGISTRY } from './tokens';

/**
 * Create controller with a dynamic path.
 * @param path
 */
export function getControllerClass(path: string): Type {
  @Controller()
  class RasaActionServerController {
    private readonly logger = new Logger(RasaActionServerController.name);

    constructor(private readonly ref: ModuleRef) {
      //
    }

    @Post([path])
    async executeAction(@Req() req: Request, @Res() res: Response) {
      // this.logger.debug(req.body);

      const lc = new Lifecycle({
        actionFactory: (name: string) => {
          try {
            // first look up module ref
            this.logger.debug(`looking up action ${name} in module ref`);
            const action = this.ref.get(name);
            return action;
          } catch (err) {
            // then look up the dynamic module registry
            this.logger.verbose(err);
            this.logger.debug(`error looking up action ${name} in module ref, trying to look up in dynamic action registry`);

            const registry: Map<string, IRunnableAction> = this.ref.get(DYNAMIC_ACTION_REGISTRY);
            if (!registry) {
              throw new Error(`No dynamic action registry found.`);
            }

            const action = registry.get(name);

            if (!action) {
              throw new Error(`could not find action ${name}`);
            }

            return registry.get(name);
          }
        },
      });

      await lc.execute(req, res);
    }
  }

  return RasaActionServerController;
}
