import { DynamicModule, Module, ModuleMetadata, Provider } from '@nestjs/common';
import { IRunnableAction } from '@xanthous/rasa-sdk';

import { getControllerClass } from './rasa-action.controller';

@Module({})
export class RasaActionModule {
  static forRoot(actionProviders: Provider<IRunnableAction>[], options: ModuleMetadata & IRasaActionModuleOptions): DynamicModule {
    const controller = getControllerClass(options.path);

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
