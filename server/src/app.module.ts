import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RasaActionUsageModule } from './rasa-action-usage';
import { RasaNlgUsageModule } from './rasa-nlg-usage';

@Module({
  imports: [RasaActionUsageModule, RasaNlgUsageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
