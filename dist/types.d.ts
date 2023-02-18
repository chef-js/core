/// <reference types="node" />
type WSProp = ((...args: any[]) => any) | any | any[];
type uWS_WebSocket = {
  [prop: string]: WSProp;
};
export type WSEvent = {
  id: string;
  event: string;
  data?: any;
};
export type WSSocket = WebSocket | uWS_WebSocket;
export type WSPlugin = (ws: WSSocket, event: WSEvent) => void;
export type WSServer = {
  start: (port: number) => Promise<WSServer>;
  config: WSConfig;
  [prop: string]: WSProp;
};
export type WSRequest = (
  resOrReq: object | any,
  reqOrRes: object | any,
  next?: () => void
) => void;
export type WSFileReaderResponse = {
  mime: string;
  body: string | Buffer;
  status: number;
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
export {};
//# sourceMappingURL=types.d.ts.map
