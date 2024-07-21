import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async addCourse(name: string, userId: number): Promise<Course> {
    const course = this.coursesRepository.create({ name, userCourses: [{ id: userId }] });
    return this.coursesRepository.save(course);
  }

  async getCourses(page: number, limit: number): Promise<Course[]> {
    return this.coursesRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getCourseById(id: number): Promise<Course> {
    return this.coursesRepository.findOne({ where: { id } });
  }

  async updateCourse(id: number, name: string): Promise<Course> {
    const course = await this.coursesRepository.findOne({ where: { id } });
    course.name = name;
    return this.coursesRepository.save(course);
  }

  async deleteCourse(id: number): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}
