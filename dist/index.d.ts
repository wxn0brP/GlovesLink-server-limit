import { GLSocket } from "@wxn0brp/gloves-link-server";
import { SocketEventEngine } from "./engine.js";
import { SocketEventLimiter } from "./limiter.js";
import { Events, SocketOnError } from "./types.js";
export declare function setupSocket(socket: GLSocket, all_events: Events[][], logError?: SocketOnError): {
    socket: GLSocket<{
        _id?: string;
    }>;
    engine: SocketEventEngine;
    limiter: SocketEventLimiter;
};
