import { NestFactory } from '@nestjs/core';
import 'module-alias/register';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const options = new DocumentBuilder()
    .setTitle('MoneyFlow App')
    .setDescription('The MoneyFlow API description')
    .setVersion('1.0')
    .addTag('moneyflow')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
