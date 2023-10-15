import { PassportStrategy } from "@nestjs/passport";
import { Strategy , ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({ // config for jwts Strategy
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // part of security
            secretOrKey: 'SECRET' // protect this by moving to env vars
        });
    }

    async validate(payload: any) {
        // const user = await this.userService.findOne("payload.sub")
        return {
            id: payload.sub,
            name: payload.name
        }
    }
}