import { MetadataStorage } from './metadata';
import { ActionDispatcher } from './dispatcher';
import { ActionRejectedError } from './errors';
import { ActionTracker } from './tracker';
import { ActionDomain } from './domain';
import { IAction, IRunnableAction } from './action';
import { IConstructor } from './class';

/**
 * Manages lifecycle of an action request.
 *
 * Stages:
 * - Receive Request
 * - Execute Action
 * - Collect Action Responses
 * - Collect Action Events
 * - Send Response
 */
export class Lifecycle {
  private readonly actionFactory?: (target: IConstructor<IRunnableAction>) => IRunnableAction;

  constructor({ actionFactory }: ILifecycleOptions = {}) {
    this.actionFactory = actionFactory;
  }

  public async execute(req: { body: IAction }, res: any): Promise<void> {
    const { next_action, tracker, domain } = req.body;
    const actionMetadata = MetadataStorage.getMetadataByName(next_action);
    const action = this.actionFactory ? this.actionFactory(actionMetadata.target) : new actionMetadata.target();

    const _tracker = new ActionTracker(tracker);
    const _dispatcher = new ActionDispatcher();
    const _domain = new ActionDomain(domain);

    try {
      // Execute side effects.
      await action.run(_tracker, _dispatcher, _domain);
      res.json(_dispatcher.messages);
      //
    } catch (e) {
      if (e instanceof ActionRejectedError) {
        return res.status(400).json({
          error: e.message,
          action_name: actionMetadata.name,
        });
      }

      return res.status(500).send(e);
    }
  }
}

export interface ILifecycleOptions {
  actionFactory?: (target: IConstructor<IRunnableAction>) => IRunnableAction;
}