declare namespace drowsy {
  interface DrowsyInstance<T, U, V = any> {
    (): U;
    (config?: V): U;
    (...args: any[]): U;
    [lookup: string]: DrowsyInstance<T, U, V>;
    [lookup: number]: DrowsyInstance<T, U, V>;
  }

  interface DrowsyBuilder {
    <T, U, V = any>(handler: T, url: string, action?: keyof T): DrowsyInstance<T, U>;

    handleLookup<T, U, V = any>(action: keyof T, url: string, handler: T, lookup: any): DrowsyInstance<T, U, V>;
    handleRequest<T, U, V = any>(action: keyof T, url: any, handler: T, args: any): U;
  }
}

declare var drowsy: drowsy.DrowsyBuilder;
export = drowsy;
