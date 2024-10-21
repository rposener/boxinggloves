
export class ObservableArray<T extends ObservableArrayType> implements ObservableArr<T> {
    private _value: Array<T>;
    private _subNum: number;
    private _subscribers:Map<number,ObserverArrayDelegate<T>>;
    private _observer?: MutationObserver;

    constructor(initial: Array<T>) {
        this._subNum = 1;
        this._value = initial;
        this._subscribers = new Map();
    }

    get value(): Array<T> {
        const value = [...this._value];
        return value;
    }

    subscribe(delegate: ObserverArrayDelegate<T>): ObserverId {
        const sub = this._subNum;
        this._subscribers.set(this._subNum, delegate);
        this._subNum++;
        return sub;
    }

    subscribeElement(delegate: ObserverArrayDelegate<T>, node: HTMLElement): void {
        if (!node.parentNode) {
            console.error("No parent node set. Add the element first", node);
            return;
        }
        const sub = this.subscribe(delegate);
        this._observer = new MutationObserver((records) => {
            for(const record of records) {
                if (record.type === "childList") {
                    for(const removedNode of record.removedNodes) {
                        if (node === removedNode) {
                            this.unsubscribe(sub);
                        }
                    }
                }
            }
        })
        this._observer?.observe(node.parentNode, {childList:true});
    }

    unsubscribe(id: ObserverId): void {
        this._subscribers.delete(id);
        this._observer?.disconnect();
    }

    update(value: Array<T>) {
        throw "not implemented yet";
    }
}