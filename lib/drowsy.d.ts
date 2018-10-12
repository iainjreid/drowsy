declare namespace drowsy {
    interface DrowsyInstance<T, U> {
        (): U
        [lookup: string]: DrowsyInstance<T, U>
        [lookup: number]: DrowsyInstance<T, U>
    }

    interface DrowsyBuilder {
        <T, U>(handler: T, url: string,  action?: keyof T): DrowsyInstance<T, U>;

        handleLookup<T, U>(action: keyof T, url: string, handler: T, lookup: any): DrowsyInstance<T, U>
        handleRequest<T, U>(action: keyof T, url: any, handler: T, args: any): U;
    }
}

declare var drowsy: drowsy.DrowsyBuilder
export = drowsy
