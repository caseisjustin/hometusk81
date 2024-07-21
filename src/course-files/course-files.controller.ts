import { Controller, Post, Body, UseGuards, Get, Param, Delete } from '@nestjs/common';
import { CourseFilesService } from './course-files.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('course-file')
export class CourseFilesController {
  constructor(private readonly courseFilesService: CourseFilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('set-course-file')
  setCourseFile(@Body('courseId') courseId: number, @Body('fileId') fileId: number) {
    return this.courseFilesService.assignFileToCourse(courseId, fileId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':courseId')
  getCourseFiles(@Param('courseId') courseId: number) {
    return this.courseFilesService.getCourseFiles(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':courseId/file/:fileId')
  deleteCourseFile(@Param('courseId') courseId: number, @Param('fileId') fileId: number) {
    return this.courseFilesService.deleteCourseFile(courseId, fileId);
  }
}
