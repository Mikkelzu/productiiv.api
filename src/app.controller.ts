import { Controller, Request, Post, UseGuards, Get, Render } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SetCookies, Cookies, ClearCookies } from '@nestjsplus/cookies';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService,
		private readonly userService: UsersService) { }

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
	getProfile(@Request() request) {
		
		// return request.user;
		return this.userService.findSingleUserById(request.user.userId)
	}

	@UseGuards(JwtAuthGuard)
	@ClearCookies('access_token')
	@Get('auth/logout')
	logout(@Request() req) {
		console.log(req)
		return { success: true, message: 'cookie cleared.', cookie: req.cookies }
	}

	@UseGuards(JwtAuthGuard)
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
