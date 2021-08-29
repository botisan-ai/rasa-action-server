import { Module } from '@nestjs/common';
import { RasaActionModule } from '../rasa-action';

@Module({ imports: [RasaActionModule] })
export class RasaActionUsageModule {}
