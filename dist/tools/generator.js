"use strict";
var fs = require('fs');
function GetObjectInterface(obj) {
    if (typeof (obj) === 'object') {
        if (obj instanceof Array) {
            if (obj.length > 0) {
                return GetObjectInterface(obj[0]) + "[]";
            }
            else {
                return 'any[]';
            }
        }
        else {
            if (obj == null) {
                return 'any';
            }
            else {
                var keyCount = 0;
                var result = '';
                result += '{';
                for (var key in obj) {
                    ++keyCount;
                    result += key + ": " + GetObjectInterface(obj[key]) + ", ";
                }
                if (keyCount > 0) {
                    // result += '}';
                    // result[result.length - 1] = '}';
                    return result.substr(0, result.length - 2) + '}';
                }
                else {
                    return 'any';
                }
            }
        }
    }
    else {
        return typeof (obj);
    }
}
function Convert(jsonObject) {
    var result = '';
    // 加入头部
    result += fs.readFileSync(__dirname + "/../../tools/template.ts");
    // 输出 MessageId
    result += 'export enum MessageId {\n';
    for (var key in jsonObject) {
        result += "    " + key + ",\n";
    }
    result += '}\n\n';
    // 然后输出Handle
    result += 'export class TypedWebSocketMessageHandle extends WebSocketMessageHandle {\n';
    for (var key in jsonObject) {
        // on
        result += "    on" + key + "(target, handle: (m: " + key + ") => void) {\n";
        result += "        this.on(MessageId." + key + ", target, handle);\n";
        result += '    }\n';
        // off
        result += "    off" + key + "(target, handle: (m: " + key + ") => void) {\n";
        result += "        this.off(MessageId." + key + ", target, handle);\n";
        result += '    }\n';
    }
    result += '}\n\n';
    // 最后输出类定义
    for (var key in jsonObject) {
        var value = jsonObject[key];
        result += "export class " + key + " extends Message {\n";
        // 输出buff的默认类型
        result += '    buffer: [MessageId';
        for (var field in value) {
            result += ", " + GetObjectInterface(value[field]);
        }
        result += '] = ';
        // 输出buff的默认数据
        result += "[MessageId." + key;
        for (var field in value) {
            result += ", " + JSON.stringify(value[field]);
        }
        result += '];\n';
        // 输出类的字段
        var fieldIndex = 1;
        for (var field in value) {
            // get
            result += "    get " + field + "() {\n";
            result += "        return this.buffer[" + fieldIndex + "];\n";
            result += '    }\n';
            // set
            result += "    set " + field + "(" + field + ": " + GetObjectInterface(value[field]) + ") {\n";
            result += "        this.buffer[" + fieldIndex + "] = " + field + ";\n";
            result += '    }\n';
            ++fieldIndex;
        }
        result += '}\n';
        result += "MessageMap[MessageId." + key + "] = " + key + ";\n\n";
    }
    return result;
}
exports.Convert = Convert;
// fs.writeFileSync(`${__dirname}/../src/protocol.ts`, Convert(require('./twp.json')));
// console.log('write down'); 
//# sourceMappingURL=generator.js.map