import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './common/errors/exception_filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Momentum API')
    .setDescription('API for Momentum Application')
    .setVersion('1.0')
    .addTag('momentum')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  patchNestJsSwagger();
  app.useGlobalFilters(new GlobalExceptionsFilter(app.get(HttpAdapterHost)));
  // Don't forget to add '0.0.0.0' host when deploying via Docker
  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
