import { Controller, Post, Body, UseGuards, Get, Param, Delete } from '@nestjs/common';
import { UserCoursesService } from './user-courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user-course')
export class UserCoursesController {
  constructor(private readonly userCoursesService: UserCoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('set-user-course')
  setUserCourse(@Body('userId') userId: number, @Body('courseId') courseId: number) {
    return this.userCoursesService.assignCourseToUser(userId, courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getUserCourses(@Param('userId') userId: number) {
    return this.userCoursesService.getUserCourses(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/course/:courseId')
  removeUserFromCourse(@Param('userId') userId: number, @Param('courseId') courseId: number) {
    return this.userCoursesService.removeUserFromCourse(userId, courseId);
  }
}
