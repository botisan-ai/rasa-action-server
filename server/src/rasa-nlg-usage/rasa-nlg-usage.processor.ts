import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { IObjectLiteral } from '@xanthous/rasa-sdk/dist/class';
import { IActionTracker, INLGResponder, UtterMessage } from '@xanthous/rasa-sdk';

@Injectable()
export class NLGExampleResponder implements INLGResponder {
  // Inject module ref to prove Nest Dependency Injection works.
  constructor(private readonly ref: ModuleRef) {}

  async run(response: string, args: IObjectLiteral, tracker: IActionTracker, channel: IObjectLiteral & { name: string }): Promise<UtterMessage> {
    console.log(response, args, tracker, channel);
    console.log(`DI works! : ${!!this.ref}\n`);

    return {
      text: 'Yes',
    };
  }
}
