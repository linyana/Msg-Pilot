import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [TenantsController],
  providers: [TenantsService, JwtService, AuthService],
  exports: [TenantsService],
})
export class TenantsModule {}
