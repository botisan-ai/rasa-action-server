import { Module } from '@nestjs/common';

import { IConstructor } from '../../sdk/class';
import { IRunnableAction } from '../../sdk';

import { RASA_ACTION_SERVER_OPTIONS } from './rasa-action.constants';
import { getControllerClass } from './rasa-action.controller';

@Module({})
export class RasaActionModule {
  static forRoot(actions: IConstructor<IRunnableAction>[], options: IRasaActionModuleOptions) {
    const controller = getControllerClass(options.path);

    return {
      module: RasaActionModule,
      controllers: [controller],
      providers: [
        ...actions,
        {
          provide: RASA_ACTION_SERVER_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}

export interface IRasaActionModuleOptions {
  /**
   * POST path of the action endpoint.
   */
  path: string;
}
