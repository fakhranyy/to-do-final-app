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
    // first find the user
    const user = await this.usersService.findOne(username);
    // then, check if the user is exist
    if (user) {
      // then, compare the passwords (the user password $ the password that i recived as a param from req)
      //  check if they were the same by the method comparePasswords
      const matched = comparePasswords(password , user.password)
       // if they're matched (passwords equal each other) do ->
      if(matched){
        console.log('User Validation is success!');
        return user;
       // if they're not matched (passwords equal each other) do ->
      } else {
        console.log('Password do not match !');
        return null;
      }
    }
    // return user;
  }
    
  async login(user: any){
    const payload = {name: user.name , sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
