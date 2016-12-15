import { GenerateMessage } from './protocol';
import { FrameNotice, LoginRsp, GetWalletReq, MessageId, TypedWebSocketMessageHandle } from './message';

let buffer = [MessageId.FrameNotice, 13];
let message = GenerateMessage(buffer);
let f1 = new FrameNotice;
f1.ms = 50;
console.log(f1);
console.log(message);

buffer = [MessageId.LoginRsp];
message = GenerateMessage(buffer);
console.log(message);
console.log(message.buffer);

class Handle {
    frameNotice(m: FrameNotice) {
        console.log('onFrameNotice');
        console.log(m);
    }

    loginRsp(m: LoginRsp) {
        console.log('onLoginRsp');
        console.log(m);
    }

    getWalletRsp(m: GetWalletReq) {
        console.log('getWalletRsp');
        console.log(m);
    }
}

let handle = new Handle;

let mh = new TypedWebSocketMessageHandle();

mh.onFrameNotice(handle, handle.frameNotice);
mh.onLoginRsp(handle, handle.loginRsp);
mh.onGetWalletReq(handle, handle.getWalletRsp);

mh.emit(f1);
mh.emit(message);

let m = new GetWalletReq();
m.money = 100;
m.diamond = 300;
mh.emit(m);