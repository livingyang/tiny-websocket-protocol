"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
(function (MessageId) {
    MessageId[MessageId["LoginRsp"] = 0] = "LoginRsp";
    MessageId[MessageId["FrameNotice"] = 1] = "FrameNotice";
    MessageId[MessageId["UserDataNotice"] = 2] = "UserDataNotice";
    MessageId[MessageId["MatchingSuccessRsp"] = 3] = "MatchingSuccessRsp";
    MessageId[MessageId["GetWalletReq"] = 4] = "GetWalletReq";
    MessageId[MessageId["TestObjectReq"] = 5] = "TestObjectReq";
})(exports.MessageId || (exports.MessageId = {}));
var MessageId = exports.MessageId;
var TypedWebSocketMessageHandle = (function (_super) {
    __extends(TypedWebSocketMessageHandle, _super);
    function TypedWebSocketMessageHandle() {
        _super.apply(this, arguments);
    }
    TypedWebSocketMessageHandle.prototype.onLoginRsp = function (target, handle) {
        this.on(MessageId.LoginRsp, target, handle);
    };
    TypedWebSocketMessageHandle.prototype.offLoginRsp = function (target, handle) {
        this.off(MessageId.LoginRsp, target, handle);
    };
    TypedWebSocketMessageHandle.prototype.onFrameNotice = function (target, handle) {
        this.on(MessageId.FrameNotice, target, handle);
    };
    TypedWebSocketMessageHandle.prototype.offFrameNotice = function (target, handle) {
        this.off(MessageId.FrameNotice, target, handle);
    };
    TypedWebSocketMessageHandle.prototype.onUserDataNotice = function (target, handle) {
        this.on(MessageId.UserDataNotice, target, handle);
    };
    TypedWebSocketMessageHandle.prototype.offUserDataNotice = function (target, handle) {
        this.off(MessageId.UserDataNotice, target, handle);
    };
    TypedWebSocketMessageHandle.prototype.onMatchingSuccessRsp = function (target, handle) {
        this.on(MessageId.MatchingSuccessRsp, target, handle);
    };
    TypedWebSocketMessageHandle.prototype.offMatchingSuccessRsp = function (target, handle) {
        this.off(MessageId.MatchingSuccessRsp, target, handle);
    };
    TypedWebSocketMessageHandle.prototype.onGetWalletReq = function (target, handle) {
        this.on(MessageId.GetWalletReq, target, handle);
    };
    TypedWebSocketMessageHandle.prototype.offGetWalletReq = function (target, handle) {
        this.off(MessageId.GetWalletReq, target, handle);
    };
    TypedWebSocketMessageHandle.prototype.onTestObjectReq = function (target, handle) {
        this.on(MessageId.TestObjectReq, target, handle);
    };
    TypedWebSocketMessageHandle.prototype.offTestObjectReq = function (target, handle) {
        this.off(MessageId.TestObjectReq, target, handle);
    };
    return TypedWebSocketMessageHandle;
}(WebSocketMessageHandle));
exports.TypedWebSocketMessageHandle = TypedWebSocketMessageHandle;
var LoginRsp = (function (_super) {
    __extends(LoginRsp, _super);
    function LoginRsp() {
        _super.apply(this, arguments);
        this.buffer = [MessageId.LoginRsp];
    }
    LoginRsp.prototype.LoginRsp = function () { };
    return LoginRsp;
}(Message));
exports.LoginRsp = LoginRsp;
exports.MessageMap[MessageId.LoginRsp] = LoginRsp;
var FrameNotice = (function (_super) {
    __extends(FrameNotice, _super);
    function FrameNotice() {
        _super.apply(this, arguments);
        this.buffer = [MessageId.FrameNotice, 0];
    }
    FrameNotice.prototype.FrameNotice = function () { };
    Object.defineProperty(FrameNotice.prototype, "ms", {
        get: function () {
            return this.buffer[1];
        },
        set: function (ms) {
            this.buffer[1] = ms;
        },
        enumerable: true,
        configurable: true
    });
    return FrameNotice;
}(Message));
exports.FrameNotice = FrameNotice;
exports.MessageMap[MessageId.FrameNotice] = FrameNotice;
var UserDataNotice = (function (_super) {
    __extends(UserDataNotice, _super);
    function UserDataNotice() {
        _super.apply(this, arguments);
        this.buffer = [MessageId.UserDataNotice, ""];
    }
    UserDataNotice.prototype.UserDataNotice = function () { };
    Object.defineProperty(UserDataNotice.prototype, "account", {
        get: function () {
            return this.buffer[1];
        },
        set: function (account) {
            this.buffer[1] = account;
        },
        enumerable: true,
        configurable: true
    });
    return UserDataNotice;
}(Message));
exports.UserDataNotice = UserDataNotice;
exports.MessageMap[MessageId.UserDataNotice] = UserDataNotice;
var MatchingSuccessRsp = (function (_super) {
    __extends(MatchingSuccessRsp, _super);
    function MatchingSuccessRsp() {
        _super.apply(this, arguments);
        this.buffer = [MessageId.MatchingSuccessRsp, "", [""]];
    }
    MatchingSuccessRsp.prototype.MatchingSuccessRsp = function () { };
    Object.defineProperty(MatchingSuccessRsp.prototype, "selfAccount", {
        get: function () {
            return this.buffer[1];
        },
        set: function (selfAccount) {
            this.buffer[1] = selfAccount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatchingSuccessRsp.prototype, "accountList", {
        get: function () {
            return this.buffer[2];
        },
        set: function (accountList) {
            this.buffer[2] = accountList;
        },
        enumerable: true,
        configurable: true
    });
    return MatchingSuccessRsp;
}(Message));
exports.MatchingSuccessRsp = MatchingSuccessRsp;
exports.MessageMap[MessageId.MatchingSuccessRsp] = MatchingSuccessRsp;
var GetWalletReq = (function (_super) {
    __extends(GetWalletReq, _super);
    function GetWalletReq() {
        _super.apply(this, arguments);
        this.buffer = [MessageId.GetWalletReq, 0, 0];
    }
    GetWalletReq.prototype.GetWalletReq = function () { };
    Object.defineProperty(GetWalletReq.prototype, "money", {
        get: function () {
            return this.buffer[1];
        },
        set: function (money) {
            this.buffer[1] = money;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GetWalletReq.prototype, "diamond", {
        get: function () {
            return this.buffer[2];
        },
        set: function (diamond) {
            this.buffer[2] = diamond;
        },
        enumerable: true,
        configurable: true
    });
    return GetWalletReq;
}(Message));
exports.GetWalletReq = GetWalletReq;
exports.MessageMap[MessageId.GetWalletReq] = GetWalletReq;
var TestObjectReq = (function (_super) {
    __extends(TestObjectReq, _super);
    function TestObjectReq() {
        _super.apply(this, arguments);
        this.buffer = [MessageId.TestObjectReq, { "num": 1 }, [{ "str": "", "subArray": [0], "subObj": { "num": 1 } }], null];
    }
    TestObjectReq.prototype.TestObjectReq = function () { };
    Object.defineProperty(TestObjectReq.prototype, "obj", {
        get: function () {
            return this.buffer[1];
        },
        set: function (obj) {
            this.buffer[1] = obj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestObjectReq.prototype, "array", {
        get: function () {
            return this.buffer[2];
        },
        set: function (array) {
            this.buffer[2] = array;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestObjectReq.prototype, "nullobj", {
        get: function () {
            return this.buffer[3];
        },
        set: function (nullobj) {
            this.buffer[3] = nullobj;
        },
        enumerable: true,
        configurable: true
    });
    return TestObjectReq;
}(Message));
exports.TestObjectReq = TestObjectReq;
exports.MessageMap[MessageId.TestObjectReq] = TestObjectReq;
//# sourceMappingURL=twp.yaml.js.map