type Path<T> = T extends object ? {
    [K in keyof T]: K extends string ? `${K}` | `${K}.${Path<T[K]>}` : never
}[keyof T] : '';

type ObserverId = number;

type ObservableType = string | number | null | bigint | boolean;

type ObserverDelegate<T extends ObservableType> = (value:T)=> PromiseLike<any> | void;

interface Observable<T extends ObservableType> extends Subscribable<T> {

    /**
     * Returns the Current Value of the Observable
     */
    get value() : T;

}

interface Subscribable<T extends ObservableType> {

    /**
     * Subscribes to changes
     * @param delegate Update Function
     * @returns ID that should be sent to unsubscribe
     */
    subscribe(delegate: ObserverDelegate<T>): ObserverId;

    /**
     * Updates an Element until the node is removed from the DOM
     * @param delegate Update Function
     * @param node Element the update is tied to
     */
    subscribeElement(delegate:ObserverDelegate<T>, node:HTMLElement):void;

    /**
     * Unsubscribes from changes
     * @param id ID returned when subscribe was called
     */
    unsubscribe(id: ObserverId): void;
}

type ObservableArrayType = ObservableType | object;

type ArrayUpdate<T extends ObservableArrayType> = {
    change: 'add' | 'remove' | 'change';
    oldindex: number | null;
    newindex: number | null;
    newvalue: T;
}

type ObserverArrayDelegate<T extends ObservableArrayType> = (updates:Array<ArrayUpdate<T>>)=> PromiseLike<any> | void;

interface ObservableArr<T extends ObservableArrayType> extends SubscribableArr<T> {

    /**
     * Returns the Current Value of the Observable
     */
    get value() : Array<T>;

}

interface SubscribableArr<T extends ObservableArrayType> {

    /**
     * Subscribes to changes
     * @param delegate Update Function
     * @returns ID that should be sent to unsubscribe
     */
    subscribe(delegate: ObserverArrayDelegate<T>): ObserverId;

    /**
     * Updates an Element until the node is removed from the DOM
     * @param delegate Update Function
     * @param node Element the update is tied to
     */
    subscribeElement(delegate:ObserverArrayDelegate<T>, node:HTMLElement):void;

    /**
     * Unsubscribes from changes
     * @param id ID returned when subscribe was called
     */
    unsubscribe(id: ObserverId): void;
}