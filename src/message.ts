import { Message, MessageMap, WebSocketMessageHandle } from './protocol';

export enum MessageId {
    LoginRsp,
    FrameNotice,
    GetWalletReq,
}

export class TypedWebSocketMessageHandle extends WebSocketMessageHandle {
    onLoginRsp(target, handle: (m: LoginRsp) => void) {
        this.on(MessageId.LoginRsp, target, handle);
    }
    offLoginRsp(target, handle: (m: LoginRsp) => void) {
        this.off(MessageId.LoginRsp, target, handle);
    }
    onFrameNotice(target, handle: (m: FrameNotice) => void) {
        this.on(MessageId.FrameNotice, target, handle);
    }
    offFrameNotice(target, handle: (m: FrameNotice) => void) {
        this.off(MessageId.FrameNotice, target, handle);
    }
    onGetWalletReq(target, handle: (m: GetWalletReq) => void) {
        this.on(MessageId.GetWalletReq, target, handle);
    }
    offGetWalletReq(target, handle: (m: GetWalletReq) => void) {
        this.off(MessageId.GetWalletReq, target, handle);
    }
}

export class LoginRsp extends Message {
    buffer = [MessageId.LoginRsp];
}
MessageMap[MessageId.LoginRsp] = LoginRsp;

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

export class GetWalletReq extends Message {
    buffer = [MessageId.GetWalletReq, 0, 0];
    get money() {
        return this.buffer[1];
    }
    set money(money: number) {
        this.buffer[1] = money;
    }
    get diamond() {
        return this.buffer[2];
    }
    set diamond(diamond: number) {
        this.buffer[2] = diamond;
    }
}
MessageMap[MessageId.GetWalletReq] = GetWalletReq;

