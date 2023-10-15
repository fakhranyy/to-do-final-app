import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LazyModuleLoader } from '@nestjs/core'
import { AuthModule } from './auth.module';
import { ApiResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth users api')
@Controller('auth')
export class AuthController {
  constructor(private lazyModuleLoader: LazyModuleLoader){}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({description: 'The user is authenticated'})
  @ApiBadRequestResponse({description: 'The user is not authenticated'})
  async signIn(@Request() req) {
    const moduleRef = await this.lazyModuleLoader.load(() => AuthModule)
    const service = moduleRef.get(AuthService);
    return service.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({description: 'Getting all authenticated users'})
  @ApiBadRequestResponse({description: 'Cannot getting all authenticated users'}) 
  @Get('protected')
  getProfile(@Request() req) {
    return req.user
  }
}