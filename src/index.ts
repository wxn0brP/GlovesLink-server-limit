import { GLSocket } from "@wxn0brp/gloves-link-server";
import { SocketEventEngine } from "./engine";
import { SocketEventLimiter } from "./limiter";
import { Events, Socket_StandardRes, Socket_StandardRes_Error, SocketLimit, SocketOnError } from "./types";

export function setupSocket(
    socket: GLSocket,
    all_events: Events[][],
    logError: SocketOnError = (e) => console.log("Error: ", e)
) {
    const limiter = new SocketEventLimiter(socket);
    socket.onLimit = limiter.onLimit.bind(limiter);

    function processSocketError(res: Socket_StandardRes, cb?: Function) {
        if (!res) {
            console.error("[GlovesLinkServer] Response is empty", res);
            const stack = new Error().stack;
            if (stack)
                console.error(stack);
            return false;
        }

        const err = res.err;
        if (!Array.isArray(err)) return false;

        const [event, ...args] = err as Socket_StandardRes_Error;
        if (cb) cb(...args);
        else socket.emit(event, ...args);
        return true;
    }

    const socketLimit: SocketLimit = {
        socket,
        onError: logError,
        processSocketError
    }

    const engine = new SocketEventEngine(socketLimit);

    for (const events of all_events)
        for (const event of events)
            engine.add(event[0], event[1], event[2], event[3]);

    return {
        engine,
        limiter
    }
}
