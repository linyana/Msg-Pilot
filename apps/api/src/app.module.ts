import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './core/tenants/tenants.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { AuthModule } from './core/auth/auth.module';
import { BullModule } from '@nestjs/bull';
import dotenv from 'dotenv';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RedisModule } from './core/redis/redis.module';
import { RedModule } from './core/red/red.module';
import { ConnectionModule } from './core/connection/connection.module';
import { NoNeedConnectionGuard } from './guard';
import { AccountsModule } from './core/accounts/accounts.module';
import { TasksModule } from './core/tasks/tasks.module';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config({ path: '.env' });
}

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
      },
    }),
    RedModule,
    ConnectionModule,
    AccountsModule,
    PrismaModule,
    TenantsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    EventEmitterModule.forRoot(),
    RedisModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: NoNeedConnectionGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log(consumer);
  }
}
