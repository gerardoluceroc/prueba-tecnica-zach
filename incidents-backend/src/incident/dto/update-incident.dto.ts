import { IsString, IsNotEmpty, IsOptional, Matches, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IncidentStatus } from '../constants';

export class UpdateIncidentDto {
  @ApiProperty({
    description: 'La nueva fecha del incidente en formato YYYY-MM-DD',
    example: '2025-08-05',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe estar en formato YYYY-MM-DD' })
  date?: string;

  @ApiProperty({
    description: 'Una nueva descripción del incidente',
    example: 'Problema de red intermitente en el área de producción.'
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string; // Propiedad opcional para actualizar la descripción

  @ApiProperty({
    description: 'El nuevo ID del equipo responsable',
    example: 'SOPORTE-TI'
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  teamId?: string;

  @ApiProperty({
    description: 'El nuevo estado del incidente',
    enum: IncidentStatus,
    example: 'en progreso'
  })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(IncidentStatus), { message: 'El estado debe ser "abierto", "en progreso" o "cerrado".' })
  status?: string;
}