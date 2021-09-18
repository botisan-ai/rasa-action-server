import { Controller, Post, Req, Res, Type } from '@nestjs/common';
import { NLGLifecycle } from '@xanthous/rasa-sdk';
import { ModuleRef } from '@nestjs/core';
import { Request, Response } from 'express';

import { RASA_NLG_RESPONDER } from './tokens';

/**
 * Create controller with a dynamic path.
 * @param path
 */
export function getControllerClass(path: string): Type {
  @Controller()
  class RasaNLGServerController {
    constructor(private readonly ref: ModuleRef) {
      //
    }

    @Post([path])
    async executeAction(@Req() req: Request, @Res() res: Response) {
      const lc = new NLGLifecycle({
        actionFactory: () => this.ref.get(RASA_NLG_RESPONDER),
      });

      await lc.execute(req, res);
    }
  }

  return RasaNLGServerController;
}
