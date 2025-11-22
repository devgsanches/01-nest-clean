import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller';
import { PrismaService } from './prisma/prisma.service';
import { HealthCheckController } from './controllers/health-check.controller';
import { envSchema } from './env';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true,
  }),],
  controllers: [CreateAccountController, HealthCheckController],
  providers: [PrismaService],
})
export class AppModule {}