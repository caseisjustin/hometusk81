import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { UserCourse } from '../../user-courses/entities/user-course.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => File, file => file.user)
  files: File[];

  @OneToMany(() => UserCourse, userCourse => userCourse.user)
  userCourses: UserCourse[];
}
