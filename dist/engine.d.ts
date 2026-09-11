import { SocketLimit } from "./types.js";
export declare class SocketEventEngine {
    socketLimitConfig: SocketLimit;
    constructor(socketLimitConfig: SocketLimit);
    add(evt: string, time: number, isReturn: boolean, cpu: Function): void;
}
