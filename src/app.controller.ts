import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService) { }

	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() request) {
		return this.authService.login(request.user);
	}

	@Post('register')
    register(@Request() req) {
		return this.authService.register(req.body);
    }

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() request) {
		return request.user;
	}
}
