// import { User } from 'src/users/entities/user.entity';
// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('tasks')
// export class Task {
  
//   @PrimaryGeneratedColumn({name: 'id'})
//   id: number;

//   @Column()
//   name: string;

//   @Column({name: 'user_id', type: 'int'})
//   userId: number;
    
//   @ManyToOne(() => User, (user) => user.tasks)
//   @JoinColumn({name: 'user_id'})
//   user: User;
// }

// task.entity.ts
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @ManyToOne(() => User, user => user.tasks)
  // user: User;

  @Column({name: 'user_id', type: 'int'})
  userId: number;
    
  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({name: 'user_id'})
  user: User;
}