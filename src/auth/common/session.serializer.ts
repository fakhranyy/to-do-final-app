import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: Function) {
        // throw new Error("Method not implemented.");
        done(null, {id: user.id });
    }
    deserializeUser(payload: any, done: Function) {
        // throw new Error("Method not implemented.");
        done(null, payload);

    }
}