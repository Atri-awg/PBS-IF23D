import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // tambahkan prefix /api untuk semua route
  app.setGlobalPrefix('api');
  // || Falsy Operator
  // ?? Nullish Coalescing Operator
  await app.listen(process.env.PORT!);
}
void bootstrap();
