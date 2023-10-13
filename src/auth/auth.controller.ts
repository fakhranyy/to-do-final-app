import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LazyModuleLoader } from '@nestjs/core'
import { AuthModule } from './auth.module';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';

@ApiTags('Auth users api')
@Controller('auth')
export class AuthController {
  constructor(private lazyModuleLoader: LazyModuleLoader){}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const moduleRef = await this.lazyModuleLoader.load(() => AuthModule)
    const service = moduleRef.get(AuthService);
    return service.signIn(signInDto.username, signInDto.password);
  }

  
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}