import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Los estados posibles se manejarán como strings y se validarán en los DTOs.
// Estados posibles: "abierto", "en progreso", "cerrado"

@Entity() // Decorador que marca esta clase como una entidad de base de datos
export class Incident {

    @ApiProperty({ description: 'ID único del incidente', example: 1 })
    @PrimaryGeneratedColumn() // Columna ID, auto-incrementada y clave primaria
    id: number;

    @ApiProperty({ description: 'Fecha en que ocurrió el incidente (YYYY-MM-DD)', example: '2025-08-04' })
    @Column({ type: 'date', default: () => 'CURRENT_DATE' }) // Columna para la fecha, formato YYYY-MM-DD
    date: string; // Almacenado como string para mantener el formato 'YYYY-MM-DD'

    @ApiProperty({ description: 'Descripción detallada del problema', example: 'El microservicio de usuarios experimenta alta latencia.' })
    @Column() // Columna para la descripción del incidente
    description: string;

    @ApiProperty({ description: 'ID del equipo asignado al incidente', example: 'SRE-EquipoA' })
    @Column({ name: 'id_equipo' }) // Columna para el ID del equipo, mapeado a 'id_equipo' en la DB
    teamId: string;

    @ApiProperty({ description: 'Estado actual del incidente', example: 'abierto', enum: ['abierto', 'en progreso', 'cerrado'] })
    @Column({ default: 'abierto' })
    status: string;
}