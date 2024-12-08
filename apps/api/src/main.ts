import './app.polyfill';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './intercepter/transform.interceptor';
import { IoAdapter } from '@nestjs/platform-socket.io';
import bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const httpServer = app.getHttpServer();
  app.useWebSocketAdapter(new IoAdapter(httpServer));
  app.use(bodyParser.json({ limit: '10mb' }));

  app.setGlobalPrefix('api/v1', { exclude: ['apidoc'] });
  const config = new DocumentBuilder().setTitle('auto-send-message API').setDescription('auto-send-message API description').setVersion('1').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);

  app.useWebSocketAdapter(new IoAdapter(httpServer));

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
