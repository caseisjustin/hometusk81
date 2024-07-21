import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any): Promise<{ accessToken: string }> {
    const payload = { username: user.login, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });
    return { accessToken };
  }

  async signup(login: string, password: string): Promise<any> {
    const existingUser = await this.usersService.findByLogin(login);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    const newUser = await this.usersService.createUser(login, password);
    return newUser;
  }

  async logout(): Promise<{ message: string }> {
    // Implement token invalidation logic here if using a token store
    return { message: 'Logged out successfully' };
  }
}
