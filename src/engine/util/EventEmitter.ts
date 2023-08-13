export default class EventEmitter{
    private listeners: Map<string, Function[]> = new Map<string, Function[]>();
    public on(event: string, callback: Function): void {
        if (this.listeners.has(event)) {
            this.listeners.get(event)?.push(callback);
        } else {
            this.listeners.set(event, [callback]);
        }
    }

    public addListener(event: string, callback: Function): void {
        this.on(event, callback);
    }

    public removeListener(event: string, callback: Function): void {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks?.indexOf(callback);
            if (index !== undefined && index !== -1) {
                callbacks?.splice(index, 1);
            }
        }
    }
    

    public emit(event: string, ...args: any[]): void {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            callbacks?.forEach(callback => {
                callback(...args);
            });
        }
    }
}