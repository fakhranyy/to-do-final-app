import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LazyModuleLoader } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 const lazyModuleLoader = app.get(LazyModuleLoader);
 
 app.use(
  session({
    secret: 'keyboard cat', // should put it in env var
    resave: false,
    saveUnitialized: false,
    cookie: { maxAge: 3600000 },
  }),
);
app.use(passport.initialize());
app.use(passport.session());


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
