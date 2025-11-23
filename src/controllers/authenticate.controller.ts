import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { PrismaService } from '@/prisma/prisma.service'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string(),
}) // for parse

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>
// inferência dos dados requeridos dessa rota

@Controller('/auth/sign-in')
export class AuthenticateController {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = authenticateBodySchema.parse(body)

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    // token jwt (RS56)
    const token = this.jwt.sign({
        sub: user.id
    })

    return {
      access_token: token,
    }
  }
}
