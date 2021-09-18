import { DynamicModule, Module, ModuleMetadata, Provider } from '@nestjs/common';
import { INLGResponder } from '@xanthous/rasa-sdk';
import { getControllerClass } from './rasa-nlg.controller';
import { RASA_NLG_RESPONDER } from './tokens';

@Module({})
export class RasaNlgModule {
  static forRoot(options: { path: string; responderProvider: Omit<Provider<INLGResponder>, 'provide'> } & ModuleMetadata): DynamicModule {
    const controller = getControllerClass(options.path);

    let responder: Provider<INLGResponder>;

    if (typeof options.responderProvider === 'object' && options.responderProvider !== null && !Array.isArray(options.responderProvider)) {
      responder = {
        ...options.responderProvider,
        provide: RASA_NLG_RESPONDER,
      } as Provider<INLGResponder>;
    } else {
      responder = {
        provide: RASA_NLG_RESPONDER,
        useClass: options.responderProvider,
      } as Provider<INLGResponder>;
    }

    return {
      imports: options.imports,
      module: RasaNlgModule,
      controllers: [controller, ...(options.controllers || [])],
      providers: [responder, ...(options.providers || [])],
    };
  }
}
