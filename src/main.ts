import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/config/env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global routing prefix
  app.setGlobalPrefix('api/v1');

  // Open API Swagger
  const swaggerConfig = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.PORT || 3000);
}
bootstrap();
