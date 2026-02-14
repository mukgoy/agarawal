process.env.GOOGLE_CLIENT_ID = "26042621815-5q4gpnoeoeqmt3mq858b664oenj42p9d.apps.googleusercontent.com";
process.env.JWT_SECRET = "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"

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1/');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Admin APIs V1')
    .setDescription('The Admin API description')
    .setVersion('1.0')
    .addTag('Admin')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `Please enter token in following format: Bearer <JWT>`,
        name: "Authorization",
        bearerFormat: "Bearer", // I`ve tested not to use this field, but the result was the same
        scheme: "Bearer",
        type: "http", // I`ve attempted type: 'apiKey' too
        in: "Header",
      },
      "access_token" // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
