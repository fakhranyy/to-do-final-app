import { Task } from 'src/tasks/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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
  tasks: Task[]

}

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: true,nullable: true })
//   username: string;
  
//   @Column({nullable: true})
//   name: string;

//   @Column({nullable: true})
//   password: string;

//   @OneToMany(() => Task, task => task.user)
//   tasks: Task[];
// }