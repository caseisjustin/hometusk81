import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async uploadFile(filename: string, path: string, mimetype: string, userId: number): Promise<File> {
    const file = this.filesRepository.create({ filename, path, mimetype, user: { id: userId } });
    return this.filesRepository.save(file);
  }

  async listFiles(page: number, limit: number, userId: number): Promise<File[]> {
    return this.filesRepository.find({
      where: { user: { id: userId } },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getFileById(id: number): Promise<File> {
    return this.filesRepository.findOne({ where: { id } });
  }

  async deleteFile(id: number): Promise<void> {
    await this.filesRepository.delete(id);
  }

  async updateFile(id: number, filename: string): Promise<File> {
    const file = await this.filesRepository.findOne({ where: { id } });
    file.filename = filename;
    return this.filesRepository.save(file);
  }
}
