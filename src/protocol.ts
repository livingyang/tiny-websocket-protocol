export enum MessageId {
    FrameNotice,
    LoginRsp,
}

class Message {
    buffer: Buffer = [];
}

interface MessageClass {
    new(): Message;
}

let MessageMap: {[id: number]: MessageClass} = {};

// Buffer[0] == MessageId 
type Buffer = any[];

export function GeneratorMessage(buffer: Buffer) {
    if (buffer != null && MessageMap[buffer[0]] != null) {
        let message = new MessageMap[buffer[0]];
        if (message.buffer.length === buffer.length) {
            message.buffer = buffer;
            return message;
        }
    }
    
    return null;
}

export class FrameNotice extends Message
{
    buffer = [MessageId.FrameNotice, 0];

    get event() {
        return this.buffer[0];
    }

    get frame() {
        return this.buffer[1];
    }

    set frame(ms: number) {
        this.buffer[1] = ms;
    }
}
MessageMap[MessageId.FrameNotice] = FrameNotice;

export class LoginRsp extends Message {
    buffer = [MessageId.LoginRsp];
}
MessageMap[MessageId.LoginRsp] = LoginRsp;