import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Req, Get, Query, Param, Delete, Put, Body, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = uuidv4();
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file, @Req() req) {
    return this.filesService.uploadFile(file.filename, file.path, file.mimetype, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  listFiles(@Query('page') page: number, @Query('limit') limit: number, @Req() req) {
    return this.filesService.listFiles(page, limit, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getFile(@Param('id') id: number) {
    return this.filesService.getFileById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteFile(@Param('id') id: number) {
    return this.filesService.deleteFile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateFile(@Param('id') id: number, @Body('filename') filename: string) {
    return this.filesService.updateFile(id, filename);
  }

  @UseGuards(JwtAuthGuard)
  @Get('download/:id')
  async downloadFile(@Param('id') id: number, @Res() res) {
    const file = await this.filesService.getFileById(id);
    res.download(file.path, file.filename);
  }
}
