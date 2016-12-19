export type Buffer = any[]; // Buffer[0] == MessageId

export class Message {
    buffer: Buffer;
    getId(): number {
        return (this.buffer != null && this.buffer.length > 0) ? this.buffer[0] : -1;
    }
}

interface MessageClass {
    new(): Message;
}

// ------------ Message Generator

export let MessageMap: {[id: number]: MessageClass} = {};
export function GenerateMessage(buffer: Buffer) {
    if (buffer != null && MessageMap[buffer[0]] != null) {
        let message = new MessageMap[buffer[0]];
        if (message.buffer.length === buffer.length) {
            message.buffer = buffer;
            return message;
        }
    }
    
    return null;
}

// ------------- WebSocket Message Handle

interface Invoker {
    target;
    handler: Function;
}

export class WebSocketMessageHandle {
    eventInvokerMap: {[id: number]: Invoker[]} = {};

    emit(message: Message) {
        if (message != null) {
            for (let invoker of this.getInvokerList(message.getId())) {
                invoker.handler.call(invoker.target, message);
            }
        }
    }

    getInvokerList(event: number) {
        return this.eventInvokerMap[event] || [];
    }

    on(event: number | string, target, handler: Function = target[event]) {
        if (handler == null) {
            throw `Client.on event: ${event}, handle is null`;
        }
        if (this.eventInvokerMap[event] == null) {
            this.eventInvokerMap[event] = [];
        }

        if (target != null) {
            this.eventInvokerMap[event].push({ target: target, handler: handler });
        }
    }

    off(event: number | string, target, handler: Function = target[event]) {
        if (this.eventInvokerMap[event] != null) {
            this.eventInvokerMap[event] = this.eventInvokerMap[event].filter((v, i, a) => {
                return (target !== v.target || handler !== v.handler);
            });
        }
    }
}

// ------------- WebSocket Message 
