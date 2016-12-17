import * as fs from 'fs';
import * as assert from 'assert';
import {Convert} from '../tools/generator';
import {GenerateMessage, FrameNotice, LoginRsp, TypedWebSocketMessageHandle} from '../src/protocol'

describe('twp', function() {
    it('json to protocol', function() {
        assert.equal(Convert(require('../../tools/twp.json')), fs.readFileSync('./src/protocol.ts').toString());
    })

    it('message', function() {
        let frameNotice = new FrameNotice;
        let message = GenerateMessage(frameNotice.buffer);
        assert.ok(message instanceof FrameNotice);
        assert.equal(frameNotice.buffer, message.buffer);
    })
});