export class SocketEventEngine {
    socketLimitConfig;
    constructor(socketLimitConfig) {
        this.socketLimitConfig = socketLimitConfig;
    }
    add(evt, time, isReturn, cpu) {
        const { socket, processSocketError, onError } = this.socketLimitConfig;
        socket.onLimit(evt, time, async (...args) => {
            try {
                const data = await cpu(socket, ...args);
                if (processSocketError(data))
                    return;
                if (isReturn) {
                    const cb = typeof args[args.length - 1] === "function" ? args.pop() : null;
                    const res = data.res || [];
                    if (cb)
                        cb(...res);
                    else
                        socket.emit(evt, ...res);
                }
            }
            catch (e) {
                onError(e);
            }
        });
    }
}
