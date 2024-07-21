import { Controller, Post, Body, Get, UseGuards, Req, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    return this.authService.signup(login, password);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.validateUser(login, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getMe')
  getMe(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return this.authService.logout();
  }
}
