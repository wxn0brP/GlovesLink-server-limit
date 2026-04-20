import { SocketEventEngine } from "./engine.js";
import { SocketEventLimiter } from "./limiter.js";
export function setupSocket(socket, all_events, logError = (e) => console.log("Error: ", e)) {
    const limiter = new SocketEventLimiter(socket);
    socket.onLimit = limiter.onLimit.bind(limiter);
    function processSocketError(res, cb) {
        if (!res) {
            console.error("[GlovesLinkServer] Response is empty", res);
            const stack = new Error().stack;
            if (stack)
                console.error(stack);
            return false;
        }
        const err = res.err;
        if (!Array.isArray(err))
            return false;
        const [event, ...args] = err;
        if (cb)
            cb(...args);
        else
            socket.emit(event, ...args);
        return true;
    }
    const socketLimit = {
        socket,
        onError: logError,
        processSocketError
    };
    const engine = new SocketEventEngine(socketLimit);
    for (const events of all_events)
        for (const event of events)
            engine.add(event[0], event[1], event[2], event[3]);
    return {
        engine,
        limiter
    };
}
