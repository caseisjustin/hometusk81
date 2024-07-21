import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: { login: string, password: string }) {
    return this.authService.signup(body.login, body.password);
  }

  @Post('signin')
  async signin(@Body() body: { login: string, password: string }) {
    return this.userService.login(body.login, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getMe')
  async getMe(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req) {
    // Implement token invalidation logic
    return { message: 'Logged out successfully' };
  }
}
