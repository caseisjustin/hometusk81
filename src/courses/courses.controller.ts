import { Controller, Post, Body, UseGuards, Req, Get, Query, Param, Put, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('course')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addCourse(@Body('name') name: string, @Req() req) {
    return this.coursesService.addCourse(name, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getCourses(@Query('page') page: number, @Query('limit') limit: number) {
    return this.coursesService.getCourses(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getCourse(@Param('id') id: number) {
    return this.coursesService.getCourseById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateCourse(@Param('id') id: number, @Body('name') name: string) {
    return this.coursesService.updateCourse(id, name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCourse(@Param('id') id: number) {
    return this.coursesService.deleteCourse(id);
  }
}
