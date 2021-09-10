import { DynamicModule, Module } from '@nestjs/common';
import { INLGResponder } from '@xanthous/rasa-sdk';
import { IConstructor } from '@xanthous/rasa-sdk/dist/class';
import { getControllerClass } from './rasa-nlg.controller';
import { RASA_NLG_RESPONDER } from './tokens';

@Module({})
export class RasaNlgModule {
  static forRoot(options: { path: string; responder: IConstructor<INLGResponder> }): DynamicModule {
    const controller = getControllerClass(options.path);

    return {
      module: RasaNlgModule,
      controllers: [controller],
      providers: [
        {
          provide: RASA_NLG_RESPONDER,
          useClass: options.responder,
        },
      ],
    };
  }
}
