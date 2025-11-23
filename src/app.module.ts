import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { PrismaService } from './prisma/prisma.service'
import { HealthCheckController } from './controllers/health-check.controller'
import { envSchema } from './env'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { ListRecentQuestionsController } from './controllers/list-recent-questions.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],

  controllers: [CreateAccountController, HealthCheckController, AuthenticateController, CreateQuestionController, ListRecentQuestionsController],
  providers: [PrismaService],
})
export class AppModule {}
