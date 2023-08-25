import { z } from 'nestjs-zod/z';
import { StringIntNumberSchema } from './utils/schemas';
import { createZodDto } from 'nestjs-zod';

const EnvSchema = z.object({
  TZ: z.string().default('UTC').describe('The timezone the app is running in'),
  NODE_ENV: z
    .enum(['development', 'production', 'tests'])
    .default('development')
    .describe('The environment the app is running in'),
  HOST: z
    .string()
    .default('localhost')    
    .describe('The host the app will listen on'),
  PORT: StringIntNumberSchema.default(3000).describe(
    'The port the app will listen on',
  ),
  DATABASE_URL: z
    .string()
    .url()
    .default('postgres://postgres:postgres@localhost:5432/postgres')
    .describe('The Postgres database connection url'),
});

export class Env extends createZodDto(EnvSchema) {

  private static instance: Env;
  public static getInstance () {
    if (!Env.instance) {
      Env.instance = Env.parse();
    }
    return Env.instance;
  }

  private constructor() {
    super();
  }

  static parse () {
    const parsed = Env.schema.safeParse(process.env);
    if(!Env.instance) {
      if (parsed.success) {
        Env.instance = parsed.data;
        return parsed.data;
      }
      console.log(`Environeent variables are invalid: ${JSON.stringify(parsed.error.errors,null,2)}`);
      process.exit(1);
    }
    return Env.instance;
  }
}


declare global { 
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}