import { FrameNotice, GeneratorMessage, MessageId } from './protocol';

let buffer = [MessageId.FrameNotice, 13];
let message = GeneratorMessage(buffer);
let f1 = new FrameNotice;
f1.frame = 50;
console.log(f1);
console.log(message);

buffer = [MessageId.LoginRsp];
message = GeneratorMessage(buffer);
console.log(message);


