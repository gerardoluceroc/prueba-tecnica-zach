import { Controller,Get,Post,Body,Param,Put,Delete,ParseIntPipe,UsePipes,ValidationPipe,Query } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { FilterIncidentDto } from './dto/filter-incident.dto';
import { Incident } from './incident.entity';

// Importa los decoradores de Swagger
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Incidentes') // Agrupa todos los endpoints de este controlador bajo el tag 'Incidentes' en Swagger UI
@Controller('incidents')
@UsePipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true
}))
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo incidente', description: 'Crea un nuevo incidente en la base de datos con los detalles proporcionados.' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'El incidente ha sido creado exitosamente.', type: Incident }) // Documenta la respuesta exitosa (código 201 Created)
  @ApiResponse({ status: 400, description: 'Los datos de entrada son inválidos o incompletos.' }) // Documenta una posible respuesta de error (código 400 Bad Request)
  @ApiBody({ type: CreateIncidentDto, description: 'Objeto DTO para la creación de un incidente.' }) // Muestra la estructura esperada del cuerpo
  create(@Body() createIncidentDto: CreateIncidentDto): Promise<Incident> {
    return this.incidentService.create(createIncidentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los incidentes o filtrar por estado/equipo', description: 'Recupera una lista de incidentes. Permite filtrar opcionalmente por estado o por ID de equipo a través de parámetros de consulta.' })
  @ApiResponse({ status: 200, description: 'Lista de incidentes.', type: [Incident] }) // ✅ Tipo de respuesta: un array de Incidentes
  @ApiResponse({ status: 400, description: 'Parámetros de filtro inválidos.' })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar incidentes por su estado (ej. "abierto", "en progreso", "cerrado").' }) // ✅ Documenta el query param 'status'
  @ApiQuery({ name: 'teamId', required: false, description: 'Filtrar incidentes por el ID del equipo responsable (ej. "DEV-A", "SOPORTE-TI").' }) // ✅ Documenta el query param 'teamId'
  findAll(@Query() filterDto: FilterIncidentDto): Promise<Incident[]> {
    if (filterDto.status) {
      return this.incidentService.findByStatus(filterDto.status);
    }
    if (filterDto.teamId) {
      return this.incidentService.findByTeamId(filterDto.teamId);
    }
    return this.incidentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un incidente por su ID', description: 'Recupera los detalles de un incidente específico usando su ID numérico.' })
  @ApiParam({ name: 'id', description: 'ID numérico único del incidente', example: 1 }) // Documenta el parámetro de ruta
  @ApiResponse({ status: 200, description: 'Detalles del incidente encontrado.', type: Incident })
  @ApiResponse({ status: 400, description: 'El ID proporcionado no es un número válido.' })
  @ApiResponse({ status: 404, description: 'Incidente no encontrado con el ID especificado.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Incident> {
    return this.incidentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un incidente existente', description: 'Modifica los datos de un incidente específico utilizando su ID. Permite actualizaciones parciales.' })
  @ApiParam({ name: 'id', description: 'ID numérico del incidente a actualizar', example: 1 })
  @ApiBody({ type: UpdateIncidentDto, description: 'Objeto DTO con los campos a actualizar del incidente.' })
  @ApiResponse({ status: 200, description: 'El incidente ha sido actualizado exitosamente.', type: Incident })
  @ApiResponse({ status: 400, description: 'Los datos de actualización son inválidos o el ID no es numérico.' })
  @ApiResponse({ status: 404, description: 'Incidente no encontrado para actualizar.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ): Promise<Incident> {
    return this.incidentService.update(id, updateIncidentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un incidente', description: 'Elimina un incidente de la base de datos utilizando su ID.' })
  @ApiParam({ name: 'id', description: 'ID numérico del incidente a eliminar', example: 1 })
  @ApiResponse({ status: 200, description: 'Incidente eliminado exitosamente.' }) // Documenta la respuesta exitosa (código 200 OK)
  @ApiResponse({ status: 400, description: 'El ID proporcionado no es un número válido.' })
  @ApiResponse({ status: 404, description: 'Incidente no encontrado para eliminar.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.incidentService.remove(id);
  }
}