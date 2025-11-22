import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { PrismaService } from "../prisma/prisma.service";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";

const createAccountBodySchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(8)   
}) // for parse

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>
// inferência dos dados requeridos dessa rota

@Controller('/accounts')
export class CreateAccountController {

    constructor(private prisma: PrismaService) {}
    
    @Post()
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: CreateAccountBodySchema) {
        const { name, email, password } = createAccountBodySchema.parse(body)
        
        const hashedPassword = await hash(password, 8)

        
        await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    }
}