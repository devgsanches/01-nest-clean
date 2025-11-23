import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { AuthGuard } from '@nestjs/passport'
import { UserAuthenticated } from 'src/auth/user-authenticated-decorator'
import { TokenPayload } from 'src/auth/jwt-strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import z from 'zod'

const pageQuerySchema = z.coerce.number().min(1).optional().default(1)
// parse string query parameter to number

type PageQuerySchema = z.infer<typeof pageQuerySchema>
// type infer to page variable

// pipe to validate the query parameter
const queryValidationPipe = new ZodValidationPipe(pageQuerySchema)

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class ListRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @UserAuthenticated() user: TokenPayload,
    @Query('page', queryValidationPipe) page: PageQuerySchema
  ) {
    const perPage = 20

    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return {
      questions,
    }
  }
}
