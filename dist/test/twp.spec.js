"use strict";
var fs = require('fs');
var assert = require('assert');
var generator_1 = require('../tools/generator');
var twp_yaml_1 = require('../src/twp.yaml');
describe('twp', function () {
    it('json to protocol', function () {
        assert.equal(generator_1.ConvertYaml('./src/twp.yaml'), fs.readFileSync('./src/twp.yaml.ts').toString());
    });
    it('message', function () {
        var frameNotice = new twp_yaml_1.FrameNotice;
        var message = twp_yaml_1.GenerateMessage(frameNotice.buffer);
        assert.ok(message instanceof twp_yaml_1.FrameNotice);
        assert.equal(frameNotice.buffer, message.buffer);
    });
});
//# sourceMappingURL=twp.spec.js.map