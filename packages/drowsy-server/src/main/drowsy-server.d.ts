import  { Server, RequestListener } from "http";

declare function DrowsyServer(): DrowsyServer.Impl;

declare namespace DrowsyServer {
  type Impl = Server & {
    [method in "get" | "post" | "put" | "patch" | "delete"]: (url: string, handler: RequestListener) => void;
  };
}

export = DrowsyServer;
