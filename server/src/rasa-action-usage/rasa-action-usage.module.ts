import { Module } from '@nestjs/common';

import { HelloAction } from './rasa-actions';
import { RasaActionModule } from '../rasa-action';

@Module({
  imports: [
    RasaActionModule.forRoot([HelloAction], {
      path: '/api/action/webhook',
    }),
  ],
})
export class RasaActionUsageModule {}
