import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCourse } from './entities/user-course.entity';

@Injectable()
export class UserCoursesService {
  constructor(
    @InjectRepository(UserCourse)
    private userCoursesRepository: Repository<UserCourse>,
  ) {}

  async assignCourseToUser(userId: number, courseId: number): Promise<UserCourse> {
    const userCourse = this.userCoursesRepository.create({ user: { id: userId }, course: { id: courseId } });
    return this.userCoursesRepository.save(userCourse);
  }

  async getUserCourses(userId: number): Promise<UserCourse[]> {
    return this.userCoursesRepository.find({ where: { user: { id: userId } } });
  }

  async removeUserFromCourse(userId: number, courseId: number): Promise<void> {
    await this.userCoursesRepository.delete({ user: { id: userId }, course: { id: courseId } });
  }
}
