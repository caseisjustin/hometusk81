import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CourseFile } from '../../course-files/entities/course-file.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @ManyToOne(() => User, user => user.files)
  user: User;

  @OneToMany(() => CourseFile, courseFile => courseFile.file)
  courseFiles: CourseFile[];
}
