import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LazyModuleLoader } from '@nestjs/core'



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 const lazyModuleLoader = app.get(LazyModuleLoader);

  const config = new DocumentBuilder()
  .setTitle('To-Do App')
  .setDescription('To-do Api description')
  .setVersion('1.0')
  // .addTag('All To-Do Apis')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);  
  await app.listen(3000);
}
bootstrap();
