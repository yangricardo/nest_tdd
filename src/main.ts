import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { HOST, PORT, NODE_ENV, TZ } = Env.getInstance();
  const logger = new Logger('bootstrap', {
    timestamp: true,
  });
  await app.listen(PORT, HOST, async () => {
    logger.log(
      `Server is running in [${NODE_ENV}] mode on [http://${HOST}:${PORT}] with timezone [${TZ}]`,
    );
  });
}
bootstrap();
