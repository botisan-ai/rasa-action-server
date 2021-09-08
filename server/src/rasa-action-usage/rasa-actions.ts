import { ModuleRef } from '@nestjs/core';

import { Action } from '../rasa-action';
import { IActionDispatcher, IActionDomain, IActionTracker, IRunnableAction, events } from '@xanthous/rasa-sdk';
import { EventType } from '@xanthous/rasa-sdk/dist/events';

@Action({ name: 'hello_action' })
export class HelloAction implements IRunnableAction {
  // Inject module ref to prove Nest Dependency Injection works.
  constructor(private readonly ref: ModuleRef) {}

  async run(tracker: IActionTracker, dispatcher: IActionDispatcher, domain: IActionDomain): Promise<EventType[]> {
    console.log(tracker, dispatcher, domain);
    console.log(`DI works! : ${!!this.ref}\n`);

    dispatcher.utterMessage({
      text: 'Hello, World!',
    });

    return [
      new events.ReminderScheduled({
        trigger_date_time: new Date(),
        kill_on_user_message: false,
        intent_name: 'some_intent',
        timestamp: Date.now(),
        name: 'Hellooo',
        entities: [],
      }),
    ];
  }
}
