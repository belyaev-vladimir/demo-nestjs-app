import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrapper');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const openApiConfig = new DocumentBuilder()
    .setTitle('Catalog API')
    .setDescription('Catalog API example')
    .setVersion('0.0.1')
    .addTag('main')
    .addTag('auth')
    .addTag('product.custom')
    .addTag('product.crud')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api/docs', app, document);

  const config = app.get<ConfigService>(ConfigService);

  const port = config.get('API_PORT');

  await app.listen(port);

  logger.log(`App listening on port ${port}`);
}

bootstrap();
