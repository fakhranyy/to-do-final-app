import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // to let me use the entity class as a repository in the service class
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
