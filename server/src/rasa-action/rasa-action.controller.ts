import { Controller, Post, Req, Res, Type, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Request, Response } from 'express';

import { Lifecycle } from '@xanthous/rasa-sdk';

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
        actionFactory: (target) => this.ref.get(target),
      });

      await lc.execute(req, res);
    }
  }

  return RasaActionServerController;
}
