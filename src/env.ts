import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().optional().default(3333),
}) // parse das variáveis

export type Env = z.infer<typeof envSchema> // inferir tipagem