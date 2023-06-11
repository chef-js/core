export type ServerContext = {
  to: (topic: string) => {
    emit: (event: string, id: string, data?: any) => void;
  };
};

// to allow declaration without including libraries with types
export type Property = ((...args: any[]) => any) | any | any[];

export type UWebSocket = {
  [property: string]: Property;
};

export type Event = {
  id: string;
  event: string;
  data?: any;
};

export type Socket = WebSocket | UWebSocket;

export type Plugin = (websocket: Socket, event: Event) => void;

export type Server = {
  start: (port: number) => Promise<Server>;
  config: Config;
  [property: string]: Property;
};

/**
 * responseOrRequest - depending on flavor socket/uws
 * requestOrResponse - depending on flavor socket/uws
 */
export type Request = (
  responseOrRequest: object | any,
  requestOrResponse: object | any,
  next?: () => void
) => void;

export type FileReaderResponse = {
  mime: string;
  body: string | Buffer;
  status: number;
};

export type FileReader = (url: string) => FileReaderResponse;

export type FileReaderCache = { get: FileReader };

export type Config = {
  port: number;
  folder: string;
  join: string;
  leave: string;
  type: string;
  debug: boolean;
  plugins: { [plugin: string]: Plugin };
  ssl?: { key: string; cert: string };
  maxCacheSize: number;
};

export type CoreConsumer = {
  createServer(config: Config): Promise<Server>;
  requestHandler(fileReaderCache: FileReaderCache): Request;
};
