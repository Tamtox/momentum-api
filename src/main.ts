import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/errors/exceptionFilter';
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
  await app.listen(process.env.SERVER_PORT || 3000);
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
}
bootstrap();
