import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('API de Registro de Incidentes')
    .setDescription('Documentación de la API para la gestión reporte de incidentes.')
    .setVersion('1.0')
    // .addTag('incidents')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' es la ruta donde estará disponible Swagger (ej: http://localhost:8080/api)
  // --- FIN DE CONFIGURACIÓN DE SWAGGER ---

  app.enableCors({
    origin: '*', // Permite solicitudes de cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite el envío de cookies y cabeceras de autorización
  });

  await app.listen(process.env.PORT ?? 8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
