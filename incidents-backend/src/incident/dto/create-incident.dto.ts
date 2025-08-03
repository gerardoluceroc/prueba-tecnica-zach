import { IsString, IsNotEmpty, IsIn, IsOptional, Matches } from 'class-validator';
import { IncidentStatus } from '../constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncidentDto {
  @ApiProperty({ description: 'La fecha del incidente en formato YYYY-MM-DD', example: '2025-08-04' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe estar en formato YYYY-MM-DD' })
  date: string;

  @ApiProperty({ description: 'Una descripción detallada del incidente', example: 'El servicio de pago está caído.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'El ID del equipo responsable (puede ser alfanumérico)', example: 'DEV-FRONT-01' })
  @IsString()
  @IsNotEmpty()
  teamId: string;

  @ApiProperty({
    description: 'El estado actual del incidente',
    enum: IncidentStatus, // Mostrar el enum de estados
    example: IncidentStatus.ABIERTO, // Ejemplo del estado
    default: IncidentStatus.ABIERTO,
    required: false // Ya es opcional por @IsOptional
  })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(IncidentStatus))
  status?: string;
}