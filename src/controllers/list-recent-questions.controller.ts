import {
    Controller,
    Get, UseGuards
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AuthGuard } from '@nestjs/passport'
import { UserAuthenticated } from 'src/auth/user-authenticated-decorator'
import { TokenPayload } from 'src/auth/jwt-strategy'

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class ListRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @UserAuthenticated() user: TokenPayload
  ) {

    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    })

    return {
        questions,
    }
  }
}
