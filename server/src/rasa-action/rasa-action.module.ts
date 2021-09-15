import { DynamicModule, Module, ModuleMetadata, Provider } from '@nestjs/common';
import { IConstructor, IRunnableAction } from '@xanthous/rasa-sdk';

import { getControllerClass } from './rasa-action.controller';

@Module({})
export class RasaActionModule {
  static forRoot(actions: IConstructor<IRunnableAction>[], options: ModuleMetadata & IRasaActionModuleOptions): DynamicModule {
    const controller = getControllerClass(options.path);

    const actionProviders: Provider<IRunnableAction>[] = actions.map((action) => ({
      provide: action,
      useClass: action,
    }));

    return {
      imports: options.imports,
      module: RasaActionModule,
      controllers: [controller, ...(options.controllers || [])],
      providers: [...actionProviders, ...(options.providers || [])],
    };
  }
}

export interface IRasaActionModuleOptions {
  /**
   * POST path of the action endpoint.
   */
  path: string;
}
