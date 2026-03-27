import { Socket_event, Socket_StandardRes } from "./types";

export class SocketRes {
    module: Socket_event;

    constructor(module: Socket_event) {
        this.module = module;
    }

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

    send(...data: any[]): Socket_StandardRes {
        return {
            err: false,
            res: data
        }
    }
}
