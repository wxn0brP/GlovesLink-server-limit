import { Socket_event, Socket_StandardRes } from "./types";

export class SocketRes {
    constructor(public module: Socket_event) { }

    valid(...err: any[]): Socket_StandardRes {
        return {
            err: ["error.valid", this.module, ...err]
        }
    }

    err(...err: any[]): Socket_StandardRes {
        return {
            err: ["error", this.module, ...err]
        }
    }

    data(...data: any[]): Socket_StandardRes {
        return {
            err: false,
            res: data
        }
    }
}
