import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

@Controller('/health-check')
export class AppController {
  constructor(private appService: AppService, private prisma: PrismaService) {}

  @Get()
  async index() {
    const users = await this.prisma.user.findMany()
    return {
      users,
    }
  }
}
