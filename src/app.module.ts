import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { TweetsModule } from './tweets/tweets.module';
import { ConfigModule } from '@nestjs/config';
import { Env } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Env.parse],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: ['query', 'info', 'warn','error'],
          errorFormat: 'pretty',
        }
      }
    }),
    TweetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
