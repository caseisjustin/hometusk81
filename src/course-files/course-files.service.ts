import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseFile } from './entities/course-file.entity';

@Injectable()
export class CourseFilesService {
  constructor(
    @InjectRepository(CourseFile)
    private courseFilesRepository: Repository<CourseFile>,
  ) {}

  async assignFileToCourse(courseId: number, fileId: number): Promise<CourseFile> {
    const courseFile = this.courseFilesRepository.create({ course: { id: courseId }, file: { id: fileId } });
    return this.courseFilesRepository.save(courseFile);
  }

  async getCourseFiles(courseId: number): Promise<CourseFile[]> {
    return this.courseFilesRepository.find({ where: { course: { id: courseId } } });
  }

  async deleteCourseFile(courseId: number, fileId: number): Promise<void> {
    await this.courseFilesRepository.delete({ course: { id: courseId }, file: { id: fileId } });
  }
}
