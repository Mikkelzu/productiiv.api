import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SetCookies, Cookies } from '@nestjsplus/cookies';

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService) { }

	@SetCookies()
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() request) {
		const jwtAuthToken = await this.authService.login(request.user);

		request._cookies = [{
			name: 'access_token',
			value: jwtAuthToken,
			
		}];

		console.log(request._cookies)

		return request.user;
		// return this.authService.login(request.user);
	}

	@Post('register')
	register(@Request() req) {
		return this.authService.register(req.body);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() request, @Cookies() cookies) {
		console.log(cookies)
		return request.user;
	}

	@Get('test')
	test(@Cookies() cookies) {
		console.log('cookies:' + cookies)
		return cookies;
	}
}
