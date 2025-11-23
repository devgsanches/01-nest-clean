import {
  Body,
  Controller,
  Post, UseGuards
} from '@nestjs/common'
import { z } from 'zod'
import { PrismaService } from '@/prisma/prisma.service'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { AuthGuard } from '@nestjs/passport'
import { UserAuthenticated } from 'src/auth/user-authenticated-decorator'
import { TokenPayload } from 'src/auth/jwt-strategy'
import { toSlug } from 'src/utils/convert-to-slug'

const createQuestionBodySchema = z.object({
  title: z.string().min(4),
  content: z.string(),
}) // for parse

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>
// inferência dos dados requeridos dessa rota

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema,
    @UserAuthenticated() user: TokenPayload
  ) {
    const { title, content } = body

    const { sub: studentId } = user

    const question = await this.prisma.question.create({
      data: {
        title,
        slug: toSlug(title),
        content,
        studentId,
      },
    })

    return {
      question,
    }
  }
}
