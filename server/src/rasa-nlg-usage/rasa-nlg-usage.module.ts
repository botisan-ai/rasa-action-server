import { Module } from '@nestjs/common';
import { RasaNlgModule } from '../rasa-nlg';
import { NLGExampleResponder } from './rasa-nlg-usage.processor';

@Module({
  imports: [
    RasaNlgModule.forRoot({
      path: '/api/nlg',
      responder: NLGExampleResponder,
    }),
  ],
})
export class RasaNlgUsageModule {}
