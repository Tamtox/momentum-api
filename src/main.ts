import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/errors/exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT || 3000);
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
}
bootstrap();
