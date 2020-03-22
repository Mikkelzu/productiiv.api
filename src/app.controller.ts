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
			options: {
				signed: false,
				domain: 'localhost',
				httpOnly: true,
			secure: false,
			sameSite: 'strict',
			path: '/'
		},
		}];

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

	@UseGuards(JwtAuthGuard)
	@Post('auth/logout')
	logout() {

	}

	@Get('test')
	test(@Cookies() cookies) {
		if (cookies.access_token) {
			return {cookies: cookies}
			
		}
		else {
			return { error: 'lmao err', message: 'nothing' }
		}
	}
}
