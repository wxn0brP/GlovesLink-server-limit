import { GLSocket } from "@wxn0brp/gloves-link-server";

export interface SpamThresholds {
    warningDelay: number;
    warnLimit: number;
    spamLimit: number;
    disconnectLimit: number;
    resetInterval: number;
    banDuration: number;
}

declare module "@wxn0brp/gloves-link-server" {
    interface GLSocket {
        onLimit: (event: string, limit: number, fn: Function) => void;
    }
}

export type Socket_event = `${Lowercase<string>}` & Exclude<string, `.${string}` | `${string}.`>;

export type Socket_StandardRes_Error = [
    "error" | "error.valid",
    Socket_event,
    ...any[]
];

export interface Socket_StandardRes<T = any> {
    err: false | Socket_StandardRes_Error[];
    res?: T;
}

export type Events = [
    string,
    number,
    boolean,
    (socket: GLSocket, ...args: any[]) => Promise<Socket_StandardRes> | Socket_StandardRes
]

export type ProcessSocketError = (res: Socket_StandardRes, cb?: Function) => boolean;
export type SocketOnError = (e: Error) => void;

export interface SocketLimit {
    socket: GLSocket;
    onError: SocketOnError;
    processSocketError: ProcessSocketError;
}
