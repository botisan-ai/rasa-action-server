import { IActionDispatcher, IActionDomain, IActionTracker, IRunnableAction } from '@xanthous/rasa-sdk';
import { IConstructor } from '@xanthous/rasa-sdk/dist/class';
import { MetadataStorage } from '@xanthous/rasa-sdk/dist/metadata';
import { EventType } from '@xanthous/rasa-sdk/dist/events';

export abstract class FormValidationAction implements IRunnableAction {
  private validatorMethods = new Map<string, string | symbol>();
  private extractorMethods = new Map<string, string | symbol>();

  public async run(dispatcher: IActionDispatcher, tracker: IActionTracker, domain: IActionDomain): Promise<void | EventType[]> {
    throw new Error('Method not implemented.');
  }

  protected async extractCustomSlots(dispatcher: IActionDispatcher, tracker: IActionTracker, domain: IActionDomain): Promise<void> {
    return;
  }

  protected get formName(): string {
    return MetadataStorage.getMetadataByDecorator(this.constructor as IConstructor<IRunnableAction>).name;
  }

  public addValidator(key: string, method: string | symbol): void {
    this.validatorMethods.set(key, method);
  }

  public addExtractor(key: string, method: string | symbol): void {
    this.extractorMethods.set(key, method);
  }
}
