import { IActionServerPayload, IRunnableAction } from './action';
import { ActionDispatcher } from './dispatcher';
import { ActionRejectedError } from './errors';
import { MetadataStorage } from './metadata';
import { ActionTracker } from './tracker';
import { ActionDomain } from './domain';
import { IConstructor, IObjectLiteral } from './class';
import { INLGResponder } from './nlg';

export type FactoryFNType<T> = (target?: IConstructor<T>) => T;

/**
 * @template T type of the managed class
 */
export interface ILifecycleOptions<T> {
  actionFactory?: FactoryFNType<T>;
}

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
  private readonly actionFactory?: FactoryFNType<IRunnableAction>;

  constructor({ actionFactory }: ILifecycleOptions<IRunnableAction> = {}) {
    this.actionFactory = actionFactory;
  }

  public async execute(req: { body: IActionServerPayload }, res: any): Promise<void> {
    const { next_action, tracker, domain } = req.body;
    const actionMetadata = MetadataStorage.getActionMetadataByName(next_action);

    // prettier-ignore
    const action = this.actionFactory
      ? this.actionFactory(actionMetadata.target)
      : new actionMetadata.target();

    const _tracker = new ActionTracker(tracker);
    const _dispatcher = new ActionDispatcher();
    const _domain = new ActionDomain(domain);

    try {
      // Execute side effects.
      const events = (await action.run(_dispatcher, _tracker, _domain)) || [];
      const responses = _dispatcher.messages;
      res.status(200).json({
        responses,
        events: events.map((e) => ({ ...e.data, event: e.event })),
      });
      //
    } catch (e) {
      if (e instanceof ActionRejectedError) {
        return res.status(400).json({
          error: e.message,
          action_name: actionMetadata.name,
        });
      }

      console.error(e);

      return res.status(500).send(e);
    }
  }
}

/**
 * Manages lifecycle of an nlg request.
 *
 * Stages:
 * - Receive Request
 * - Execute Processor
 * - Collect Processor Response
 * - Send Response
 */
export class NLGLifecycle {
  private readonly actionFactory: FactoryFNType<INLGResponder>;

  constructor({ actionFactory }: Required<ILifecycleOptions<INLGResponder>>) {
    this.actionFactory = actionFactory;
  }

  public async execute(req: { body: any }, res: any): Promise<void> {
    const { response, arguments: args, tracker, channel } = req.body;

    const _tracker = new ActionTracker(tracker);
    const responder = this.actionFactory();

    try {
      // Execute side effects.
      const message = await responder.run(response, args, _tracker, channel);
      if (!message) {
        return res.status(400).json({
          error: 'Attempted to return empty response.',
          attempted: message,
        });
      }

      if (!this.validateResponse(message)) {
        return res.status(400).json({
          error: 'A response needs to contain at the very least either `text` or `custom` fields to be a valid response.',
          attempted: message,
        });
      }

      return res.status(200).json(message);
      //
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }

  private validateResponse(message: IObjectLiteral) {
    const keys = new Set(Object.keys(message));
    return keys.has('text') || keys.has('custom');
  }
}
