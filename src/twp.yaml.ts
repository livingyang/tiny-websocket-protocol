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
export enum MessageId {
    LoginRsp,
    FrameNotice,
    UserDataNotice,
    MatchingSuccessRsp,
    GetWalletReq,
    TestObjectReq,
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
    onUserDataNotice(target, handle: (m: UserDataNotice) => void) {
        this.on(MessageId.UserDataNotice, target, handle);
    }
    offUserDataNotice(target, handle: (m: UserDataNotice) => void) {
        this.off(MessageId.UserDataNotice, target, handle);
    }
    onMatchingSuccessRsp(target, handle: (m: MatchingSuccessRsp) => void) {
        this.on(MessageId.MatchingSuccessRsp, target, handle);
    }
    offMatchingSuccessRsp(target, handle: (m: MatchingSuccessRsp) => void) {
        this.off(MessageId.MatchingSuccessRsp, target, handle);
    }
    onGetWalletReq(target, handle: (m: GetWalletReq) => void) {
        this.on(MessageId.GetWalletReq, target, handle);
    }
    offGetWalletReq(target, handle: (m: GetWalletReq) => void) {
        this.off(MessageId.GetWalletReq, target, handle);
    }
    onTestObjectReq(target, handle: (m: TestObjectReq) => void) {
        this.on(MessageId.TestObjectReq, target, handle);
    }
    offTestObjectReq(target, handle: (m: TestObjectReq) => void) {
        this.off(MessageId.TestObjectReq, target, handle);
    }
}

export class LoginRsp extends Message {
    buffer: [MessageId] = [MessageId.LoginRsp];
    LoginRsp() {}
}
MessageMap[MessageId.LoginRsp] = LoginRsp;

export class FrameNotice extends Message {
    buffer: [MessageId, number] = [MessageId.FrameNotice, 0];
    FrameNotice() {}
    get ms() {
        return this.buffer[1];
    }
    set ms(ms: number) {
        this.buffer[1] = ms;
    }
}
MessageMap[MessageId.FrameNotice] = FrameNotice;

export class UserDataNotice extends Message {
    buffer: [MessageId, string] = [MessageId.UserDataNotice, ""];
    UserDataNotice() {}
    get account() {
        return this.buffer[1];
    }
    set account(account: string) {
        this.buffer[1] = account;
    }
}
MessageMap[MessageId.UserDataNotice] = UserDataNotice;

export class MatchingSuccessRsp extends Message {
    buffer: [MessageId, string, string[]] = [MessageId.MatchingSuccessRsp, "", [""]];
    MatchingSuccessRsp() {}
    get selfAccount() {
        return this.buffer[1];
    }
    set selfAccount(selfAccount: string) {
        this.buffer[1] = selfAccount;
    }
    get accountList() {
        return this.buffer[2];
    }
    set accountList(accountList: string[]) {
        this.buffer[2] = accountList;
    }
}
MessageMap[MessageId.MatchingSuccessRsp] = MatchingSuccessRsp;

export class GetWalletReq extends Message {
    buffer: [MessageId, number, number] = [MessageId.GetWalletReq, 0, 0];
    GetWalletReq() {}
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

export class TestObjectReq extends Message {
    buffer: [MessageId, {num: number}, {str: string, subArray: number[], subObj: {num: number}}[], any] = [MessageId.TestObjectReq, {"num":1}, [{"str":"","subArray":[0],"subObj":{"num":1}}], null];
    TestObjectReq() {}
    get obj() {
        return this.buffer[1];
    }
    set obj(obj: {num: number}) {
        this.buffer[1] = obj;
    }
    get array() {
        return this.buffer[2];
    }
    set array(array: {str: string, subArray: number[], subObj: {num: number}}[]) {
        this.buffer[2] = array;
    }
    get nullobj() {
        return this.buffer[3];
    }
    set nullobj(nullobj: any) {
        this.buffer[3] = nullobj;
    }
}
MessageMap[MessageId.TestObjectReq] = TestObjectReq;

