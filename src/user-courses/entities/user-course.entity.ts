import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class UserCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userCourses, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Course, course => course.userCourses, { onDelete: 'CASCADE' })
  course: Course;
}
