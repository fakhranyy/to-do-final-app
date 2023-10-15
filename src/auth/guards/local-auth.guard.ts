import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
     async canActivate(context: ExecutionContext) {
        // @param context
        // Current execution context. Provides access to details about the current request pipeline.

        // @returns
        // Value indicating whether or not the current request is allowed to proceed.
        const result = ( await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();

        await super.logIn(request);
        return result;
    }
}