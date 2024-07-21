import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { File } from '../../files/entities/file.entity';

@Entity()
export class CourseFile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, course => course.courseFiles)
  course: Course;

  @ManyToOne(() => File, file => file.courseFiles)
  file: File;
}
