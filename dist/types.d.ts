/// <reference types="node" />
export declare type WSGet = (res: any, req: any, next?: any) => any;
export declare type WSServer = {
  get: (path: string, cb: WSGet) => any;
  post: (path: string, cb: WSGet) => any;
  any: (path: string, cb: WSGet) => any;
  listen: (port: number) => any;
  config?: WSConfig;
};
export declare type WSEvent = {
  id: string;
  event: string;
  data?: any;
};
export declare type WSPlugin = (ws: WebSocket | any, event: WSEvent) => void;
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
//# sourceMappingURL=types.d.ts.map
