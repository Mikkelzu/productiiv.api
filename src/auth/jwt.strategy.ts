import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: (req) => {
                if (req.headers.cookie) {
                    return req.headers.cookie.replace('access_token=', '')
                }

                return null;
            },
            ignoreExpiration: true, // for now we ignore this
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return {userId: payload.sub, username: payload.username};
    }
}