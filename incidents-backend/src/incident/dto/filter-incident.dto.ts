import { IsOptional, IsString, IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IncidentStatus } from '../constants';

export class FilterIncidentDto {
  @ApiProperty({
    description: 'Filtrar por el estado del incidente',
    enum: IncidentStatus,
    example: 'abierto',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(IncidentStatus), { message: 'El estado debe ser "abierto", "en progreso" o "cerrado".' })
  status?: string;

  @ApiProperty({
    description: 'Filtrar por el ID del equipo responsable',
    example: 'DEV-A',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty() // Si se proporciona, no debe ser vacío
  teamId?: string;
}