import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
