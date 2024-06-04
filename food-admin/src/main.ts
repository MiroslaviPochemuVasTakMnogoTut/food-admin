import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiBearerAuth, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {

  console.log(process.env.NODE_ENV);
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = '';
  }
  console.log(process.env.NODE_ENV);
  const app = await NestFactory.create(AppModule);


  if (process.env.NODE_ENV === ".dev") {
    const config = new DocumentBuilder()
      .setTitle('Restaurant api')
      .setDescription('Попробуйте выполнить GET запрос к сущности Restaurant')
      .setVersion('ver.1.22474487139...')
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
  }



  app.useGlobalPipes(new ValidationPipe({
    whitelist: true

  }));
  app.useGlobalInterceptors()
  app.enableCors();
  app.use(cookieParser());
  await app.listen(process.env.APP_PORT);

}
bootstrap();
