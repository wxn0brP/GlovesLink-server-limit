import { SocketLimit } from "./types";

export class SocketEventEngine {
    constructor(public socketLimitConfig: SocketLimit) { }

    add(evt: string, time: number, isReturn: boolean, cpu: Function) {
        const { socket, processSocketError, onError } = this.socketLimitConfig;

        socket.onLimit(evt, time, async (...args: any) => {
            try {
                const data = await cpu(socket.user, ...args);

                if (processSocketError(data)) return;

                if (isReturn) {
                    const cb = typeof args[args.length - 1] === "function" ? args.pop() : null;
                    const res = data.res || [];
                    if (cb) cb(...res);
                    else socket.emit(evt, ...res);
                }
            } catch (e) {
                onError(e);
            }
        });
    }
}
