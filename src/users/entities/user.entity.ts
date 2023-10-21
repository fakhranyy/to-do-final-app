import { InternalServerErrorException } from '@nestjs/common';
import { Task } from 'src/tasks/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;


  @OneToMany(() => Task, (tasks) => tasks.user)
  tasks: Task[];


  
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      this.email = this.email.toLowerCase().trim();
      this.username = this.username.toLowerCase().trim();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async hashNewPassword(password: string): Promise<void> {
    try {
      this.password = await bcrypt.hash(password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Error code : 0x02');
    }
  }

  async checkPassword(inputPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(inputPassword, this.password);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        ...error.response,
      });
    }
  }


}