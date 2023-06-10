/// <reference types="node" />
export type WSProp = ((...args: any[]) => any) | any | any[];
export type uWS_WebSocket = {
    [property: string]: WSProp;
};
export type WSEvent = {
    id: string;
    event: string;
    data?: any;
};
export type WSSocket = WebSocket | uWS_WebSocket;
export type WSPlugin = (websocket: WSSocket, event: WSEvent) => void;
export type WSServer = {
    start: (port: number) => Promise<WSServer>;
    config: WSConfig;
    [property: string]: WSProp;
};
export type WSRequest = (responseOnRequest: object | any, requestOrResponse: object | any, next?: () => void) => void;
export type WSFileReaderResponse = {
    mime: string;
    body: string | Buffer;
    status: number;
};
export type WSFileReader = (url: string) => WSFileReaderResponse;
export type WSFileReaderCache = {
    get: (url: string) => WSFileReaderResponse;
};
export type WSConfig = {
    port: number;
    folder: string;
    join: string;
    leave: string;
    type: string;
    debug: boolean;
    plugins: {
        [plugin: string]: WSPlugin;
    };
    ssl?: {
        key: string;
        cert: string;
    };
    maxCacheSize: number;
};
export type WSCoreConsumer = {
    createServer(config: WSConfig): Promise<WSServer>;
    requestHandler(fileReaderCache: WSFileReaderCache): WSRequest;
};
//# sourceMappingURL=types.d.ts.map