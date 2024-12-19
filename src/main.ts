import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './common/errors/exception_filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

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
  app.useGlobalFilters(new GlobalExceptionsFilter(app.get(HttpAdapterHost)));
  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
