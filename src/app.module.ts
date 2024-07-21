import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { CoursesModule } from './courses/courses.module';
import { CourseFilesModule } from './course-files/course-files.module';
import { UserCoursesModule } from './user-courses/user-courses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'learningcenter',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    CoursesModule,
    CourseFilesModule,
    UserCoursesModule,
  ],
})
export class AppModule {}
