import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentController } from './incident.controller';
import { IncidentService } from './incident.service';
import { Incident } from './incident.entity'; // ✅ Importamos la entidad aquí

@Module({
  imports: [TypeOrmModule.forFeature([Incident])], // ✅ Importa la entidad para este módulo
  controllers: [IncidentController], // ✅ Registra el controlador
  providers: [IncidentService],     // ✅ Registra el servicio
})
export class IncidentModule {}