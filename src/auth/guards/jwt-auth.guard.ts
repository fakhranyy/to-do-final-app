import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
// jwt strategy
export class JwtAuthGuard extends AuthGuard('jwt'){

}