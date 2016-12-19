"use strict";
var Message = (function () {
    function Message() {
    }
    Message.prototype.getId = function () {
        return (this.buffer != null && this.buffer.length > 0) ? this.buffer[0] : -1;
    };
    return Message;
}());
exports.Message = Message;
// ------------ Message Generator
exports.MessageMap = {};
function GenerateMessage(buffer) {
    if (buffer != null && exports.MessageMap[buffer[0]] != null) {
        var message = new exports.MessageMap[buffer[0]];
        if (message.buffer.length === buffer.length) {
            message.buffer = buffer;
            return message;
        }
    }
    return null;
}
exports.GenerateMessage = GenerateMessage;
var WebSocketMessageHandle = (function () {
    function WebSocketMessageHandle() {
        this.eventInvokerMap = {};
    }
    WebSocketMessageHandle.prototype.emit = function (message) {
        if (message != null) {
            for (var _i = 0, _a = this.getInvokerList(message.getId()); _i < _a.length; _i++) {
                var invoker = _a[_i];
                invoker.handler.call(invoker.target, message);
            }
        }
    };
    WebSocketMessageHandle.prototype.getInvokerList = function (event) {
        return this.eventInvokerMap[event] || [];
    };
    WebSocketMessageHandle.prototype.on = function (event, target, handler) {
        if (handler === void 0) { handler = target[event]; }
        if (handler == null) {
            throw "Client.on event: " + event + ", handle is null";
        }
        if (this.eventInvokerMap[event] == null) {
            this.eventInvokerMap[event] = [];
        }
        if (target != null) {
            this.eventInvokerMap[event].push({ target: target, handler: handler });
        }
    };
    WebSocketMessageHandle.prototype.off = function (event, target, handler) {
        if (handler === void 0) { handler = target[event]; }
        if (this.eventInvokerMap[event] != null) {
            this.eventInvokerMap[event] = this.eventInvokerMap[event].filter(function (v, i, a) {
                return (target !== v.target || handler !== v.handler);
            });
        }
    };
    return WebSocketMessageHandle;
}());
exports.WebSocketMessageHandle = WebSocketMessageHandle;
// ------------- WebSocket Message 
//# sourceMappingURL=template.js.map