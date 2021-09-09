import { Controller, Post, Req, Res, Type } from '@nestjs/common';
import { Request, Response } from 'express';
import { ModuleRef } from '@nestjs/core';

import { Lifecycle } from '@xanthous/rasa-sdk';

/**
 * Create controller with a dynamic path.
 * @param path
 */
export function getControllerClass(path: string): Type {
  @Controller()
  class RasaActionServerController {
    constructor(private readonly ref: ModuleRef) {
      //
    }

    @Post([path])
    async executeAction(@Req() req: Request, @Res() res: Response) {
      const lc = new Lifecycle({
        actionFactory: (target) => this.ref.get(target),
      });

      await lc.execute(req, res);
    }
  }

  return RasaActionServerController;
}
