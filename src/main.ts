import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const globalPrefix = 'api';
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
