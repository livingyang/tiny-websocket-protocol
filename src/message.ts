import { Message, MessageMap, WebSocketMessageHandle } from './protocol';

// -------------- Message List
export enum MessageId {
    FrameNotice,
    LoginRsp,
}

export class TypedWebSocketMessageHandle extends WebSocketMessageHandle {
    onFrameNotice(target, handle: (m: FrameNotice) => void) {
        this.on(MessageId.FrameNotice, target, handle);
    }

    offFrameNotice(target, handle: (m: FrameNotice) => void) {
        this.off(MessageId.FrameNotice, target, handle);
    }
    
    onLoginRsp(target, handle: (m: LoginRsp) => void) {
        this.on(MessageId.LoginRsp, target, handle);
    }

    offLoginRsp(target, handle: (m: LoginRsp) => void) {
        this.off(MessageId.LoginRsp, target, handle);
    }
}

export class FrameNotice extends Message {
    buffer = [MessageId.FrameNotice, 0];
    
    get ms() {
        return this.buffer[1];
    }

    set ms(ms: number) {
        this.buffer[1] = ms;
    }
}
MessageMap[MessageId.FrameNotice] = FrameNotice;

export class LoginRsp extends Message {
    buffer = [MessageId.LoginRsp];
}
MessageMap[MessageId.LoginRsp] = LoginRsp;