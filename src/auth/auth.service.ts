import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from './encrypt/encrypt';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const matched = comparePasswords(password , user.password)
      if(matched){
        console.log('User Validation is success!');
        return user;
      } else {
        console.log('Password do not match !');
        return null;
      }
    }
    return user;
  }
    
  async login(user: any){
    const payload = {name: user.name , sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
