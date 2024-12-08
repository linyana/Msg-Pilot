import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './core/tenants/tenants.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { AuthModule } from './core/auth/auth.module';
import { BullModule } from '@nestjs/bull';
import path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import dotenv from 'dotenv';
import { MailModule } from './core/mails/mails.module';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RedisModule } from './core/redis/redis.module';
import { RedModule } from './core/red/red.module';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config({ path: '.env' });
}

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        ignoreTLS: false,
        secure: false,
        auth: {
          user: process.env.EMAIL_HOST_USER,
          pass: process.env.EMAIL_HOST_PASSWORD,
        },
      },
      defaults: {
        from: process.env.FROM_EMAIL,
      },
      preview: false,
      template: {
        dir: path.join(__dirname, '../../apps/api/src/mails/templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
      },
    }),
    MailModule,
    RedModule,
    PrismaModule,
    TenantsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    EventEmitterModule.forRoot(),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes('affiliates');
  }
}
