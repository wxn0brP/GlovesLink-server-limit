import type { ValidationSchema } from "@wxn0brp/falcon-frame/types";
import { Socket_event, Socket_StandardRes } from "./types.js";
export declare class SocketRes {
    module: Socket_event;
    constructor(module: Socket_event);
    valid(...err: any[]): Socket_StandardRes;
    check(schema: ValidationSchema, data: any, regexRules?: Record<string, RegExp | string>): Socket_StandardRes | null;
    err(...err: any[]): Socket_StandardRes;
    data(...data: any[]): Socket_StandardRes;
}
