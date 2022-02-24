/// <reference types="node" />
declare type WSProp = ((...args: any[]) => any) | any | any[];
declare type uWS_WebSocket = {
  [prop: string]: WSProp;
};
export declare type WSEvent = {
  id: string;
  event: string;
  data?: any;
};
export declare type WSSocket = WebSocket | uWS_WebSocket;
export declare type WSPlugin = (ws: WSSocket, event: WSEvent) => void;
export declare type WSServer = {
  start: (port: number) => Promise<WSServer>;
  config: WSConfig;
  [prop: string]: WSProp;
};
export declare type WSRequest = (
  resOrReq: object | any,
  reqOrRes: object | any,
  next?: () => void
) => void;
export declare type WSFileReaderResponse = {
  mime: string;
  body: string | Buffer;
  status: number;
};
export declare type WSConfig = {
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
};
export {};
//# sourceMappingURL=types.d.ts.map
