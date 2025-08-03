import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './incident.entity';
import { CreateIncidentDto } from './dto/create-incident.dto'; // Importamos los DTOs
import { UpdateIncidentDto } from './dto/update-incident.dto'; // Importamos los DTOs

@Injectable() // Marca esta clase como un proveedor inyectable en NestJS
export class IncidentService {
  constructor(
    // Inyecta el repositorio de la entidad Incident para interactuar con la DB
    @InjectRepository(Incident)
    private incidentsRepository: Repository<Incident>,
  ) {}

  // Obtener todos los incidentes
  findAll(): Promise<Incident[]> {
    return this.incidentsRepository.find();
  }

  // Obtener un incidente por ID
  async findOne(id: number): Promise<Incident> {
    const incident = await this.incidentsRepository.findOne({ where: { id } });
    if (!incident) {
      throw new NotFoundException(`Incidente con ID ${id} no encontrado.`);
    }
    return incident;
  }

  // Crear un nuevo incidente
  create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    // Crea una nueva instancia de Incident con los datos del DTO
    const newIncident = this.incidentsRepository.create(createIncidentDto);
    return this.incidentsRepository.save(newIncident); // Guarda en la DB
  }

  // Actualizar un incidente existente
  async update(id: number, updateIncidentDto: UpdateIncidentDto): Promise<Incident> {
    const incidentToUpdate = await this.findOne(id); // Busca el incidente (lanza error si no existe)
    // Copia las propiedades del DTO al incidente existente
    Object.assign(incidentToUpdate, updateIncidentDto);
    return this.incidentsRepository.save(incidentToUpdate); // Guarda los cambios
  }

  // Eliminar un incidente
  async remove(id: number): Promise<void> {
    const result = await this.incidentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Incidente con ID ${id} no encontrado para eliminar.`);
    }
  }

  /**
   * Obtiene incidentes por estado.
   * @param status El estado por el cual filtrar (ej. "abierto", "en progreso", "cerrado").
   */
  findByStatus(status: string): Promise<Incident[]> {
    return this.incidentsRepository.find({ where: { status } });
  }

  /**
   * Obtiene incidentes por ID de equipo.
   * @param teamId El ID del equipo por el cual filtrar.
   */
  findByTeamId(teamId: string): Promise<Incident[]> {
    return this.incidentsRepository.find({ where: { teamId } });
  }
}