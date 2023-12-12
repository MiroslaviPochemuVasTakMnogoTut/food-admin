import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiBearerAuth, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Restaurant api')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .setBasePath('')
    .addBearerAuth({
      description: 'Bearer JWT auth',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',

    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe({
 whitelist:true

  }));
  app.useGlobalInterceptors()
  app.enableCors();
  app.use(cookieParser());
  await app.listen(3000);

}
bootstrap();
