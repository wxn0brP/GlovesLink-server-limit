import { GLSocket } from "@wxn0brp/gloves-link-server";
import { SpamThresholds } from "./types.js";
import { AnotherCache } from "@wxn0brp/ac";
export declare const bannedUsers: AnotherCache<any, string>;
export declare class SocketEventLimiter {
    socket: GLSocket;
    eventCounters: Record<string, number>;
    resetTimers: Record<string, NodeJS.Timeout>;
    spamThresholds: SpamThresholds;
    constructor(socket: GLSocket, spamThresholds?: Partial<SpamThresholds>);
    /**
     * Limits the number of times a specific event can be emitted from the socket.
     *
     * @param eventName - The name of the event to limit.
     * @param thresholds - Custom threshold values for spam detection. Number of times the event can be emitted.
     * @param originalCallback - The original callback to be called when the event is not limited.
     * @returns The event handler function.
     */
    onLimit(eventName: string, thresholdsParams: Partial<SpamThresholds> | number, originalCallback: Function): (...data: any[]) => void;
}
