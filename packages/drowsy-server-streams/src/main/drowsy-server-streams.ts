"use strict";

import { IncomingMessage , ServerResponse} from "http";
import * as oboe from "oboe";

const ref = Symbol("Server streams reference");

function middleware(req: IncomingMessage, res: ServerResponse) {
  (req as any)[ref] = (fns: Record<string, oboe.CallbackSignature>) => {
    const pending: Promise<any>[] = [];

    return new Promise((resolve) => {
      oboe(req).on("end", () => {
        Promise.all(pending).then(() => resolve());
      });

      for (const key in fns) {
        const fn = fns[key];

        fns[key] = (...args: Parameters<oboe.CallbackSignature>) => {
          pending.push(fn(...args));
        }
      }

      oboe(req).on("node", fns as any);
    });
  };
}

export { ref, middleware };
