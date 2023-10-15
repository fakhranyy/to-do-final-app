import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService){
        super(); // this is also the place where if your strategy requires other configuration 
        // this is where you you pass in that configuration
    }

    async validate(username: string, password: string) :Promise<any> {
        const user  = await this.authService.validateUser(username, password);

        if(!user){
            throw new UnauthorizedException("The User doesn't Exist");
        }
        return user;
    }
}
