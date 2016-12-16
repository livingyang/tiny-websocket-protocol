"use strict";
var fs = require('fs');
var assert = require('assert');
var generator_1 = require('../tools/generator');
var protocol_1 = require('../src/protocol');
describe('twp', function () {
    it('json to protocol', function () {
        assert.equal(generator_1.Convert(require('../../tools/twp.json')), fs.readFileSync('./src/protocol.ts').toString());
    });
    it('message', function () {
        var frameNotice = new protocol_1.FrameNotice;
        var message = protocol_1.GenerateMessage(frameNotice.buffer);
        assert.ok(message instanceof protocol_1.FrameNotice);
        assert.equal(frameNotice.buffer, message.buffer);
    });
});
//# sourceMappingURL=twp.spec.js.map