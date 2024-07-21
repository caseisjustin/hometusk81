import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserCourse } from '../../user-courses/entities/user-course.entity';
import { CourseFile } from '../../course-files/entities/course-file.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserCourse, userCourse => userCourse.course)
  userCourses: UserCourse[];

  @OneToMany(() => CourseFile, courseFile => courseFile.course)
  courseFiles: CourseFile[];
}
