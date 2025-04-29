/**
 * shortcut in plugin for
 * this.to(topic).emit(event, id, data)
 */
export type ServerEmitEvent = (event: string, id: string, data?: any) => void;

/**
 * can emit events
 */
export type ServerToTopic = (topic: string) => {
  emit: ServerEmitEvent;
};

/**
 * the context of plugin to a topic
 */
export type ServerContext = {
  to: ServerToTopic;
};

/**
 * to allow without including libraries with types as dependency
 */
export type Property = ((...args: any[]) => any) | any | any[];

/**
 * to allow without including UWS as dependency
 */
export type UWebSocket = {
  [property: string]: Property;
};

/**
 * base event
 */
export type Event = {
  id: string;
  event: string;
  data?: any;
};

/**
 * socket is either weboscket (socket.io) or uwebsocket (uws)
 */
export type Socket = WebSocket | UWebSocket;

/**
 * each plugin is a function that takes in websocket and event as arguments
 * and is called each time a socket emits to topic after handshake (see chat)
 */
export type Plugin = (websocket: Socket, event: Event) => void;

/**
 * each server, be it express or uws has those props
 */
export type Server = {
  start: (port: number) => Promise<Server>;
  config: Config;
  [property: string]: Property;
};

export type NextFunction = () => void;

export type ResponseOrRequest = Record<string, any>;

/**
 * responseOrRequest - depending on flavor socket/uws
 * requestOrResponse - depending on flavor socket/uws
 */
export type RequestHandler = (
  responseOrRequest: ResponseOrRequest,
  requestOrResponse: ResponseOrRequest,
  next?: NextFunction,
) => boolean | void;

/**
 * each filereader response should contain those
 */
export type FileReaderResponse = {
  mime: string;
  body: string | Buffer;
  status: number;
};

/**
 * filereader is a function that returns a filereader response for an url
 */
export type FileReader = (url: string) => FileReaderResponse;

/**
 * filereader cache is a latermom cache with config.cache
 */
export type FileReaderCache = { get: FileReader };

/**
 * chef config
 */
export type Config = {
  spa: boolean;
  port: number;
  folder: string;
  join: string;
  leave: string;
  debug: boolean;
  type: "core" | "express" | "socket" | "uws";
  plugins: { [plugin: string]: Plugin };
  ssl: { key: string; cert: string } | null;
  cache: number;
};

/**
 * chef-core consumer props
 */
export type CoreConsumer = {
  createServer(config: Config): Promise<Server>;
  requestHandler(fileReaderCache: FileReaderCache): RequestHandler;
};
