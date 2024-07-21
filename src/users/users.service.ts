import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(login: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({ login, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  async findByLogin(login: string): Promise<User> {
    return this.usersRepository.findOne({ where: { login } });
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.findByLogin(login);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(login: string, password: string): Promise<{ accessToken: string }> {
    const payload = { username: login, password };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });
    return { accessToken };
  }

  async logout(): Promise<{ message: string }> {
    return { message: 'Logged out successfully' };
  }
}
