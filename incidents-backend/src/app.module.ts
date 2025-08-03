import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncidentModule } from './incident/incident.module';
import { Incident } from './incident/incident.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite', 
      entities: [Incident],
      synchronize: true,
    }),
    IncidentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}