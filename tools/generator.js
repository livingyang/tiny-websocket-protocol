let config = require('./twp.json');

let result = '';

// 输出 import
result += "import { Message, MessageMap, WebSocketMessageHandle } from './protocol';\n\n";

// 输出 MessageId
result += 'export enum MessageId {\n';
for (let key in config) {
    result += `    ${key},\n`;
}
result += '}\n\n';

// 然后输出Handle
result += 'export class TypedWebSocketMessageHandle extends WebSocketMessageHandle {\n';

for (let key in config) {
    // on
    result += `    on${key}(target, handle: (m: ${key}) => void) {\n`;
    result += `        this.on(MessageId.${key}, target, handle);\n`;
    result += '    }\n';

    // off
    result += `    off${key}(target, handle: (m: ${key}) => void) {\n`;
    result += `        this.off(MessageId.${key}, target, handle);\n`;
    result += '    }\n';
}

result += '}\n\n';

// 最后输出类定义
for (let key in config) {
    let value = config[key];
    result += `export class ${key} extends Message {\n`;

    // 输出类的默认数据
    result += `    buffer = [MessageId.${key}`;
    for (let field in value) {
        result += `, ${value[field]}`;
    }
    result += '];\n'

    // 输出类的字段
    let fieldIndex = 1;
    for (let field in value) {
        // get
        result += `    get ${field}() {\n`;
        result += `        return this.buffer[${fieldIndex}];\n`
        result += '    }\n';

        // set
        result += `    set ${field}(${field}: ${typeof value[field]}) {\n`;
        result += `        this.buffer[${fieldIndex}] = ${field};\n`
        result += '    }\n';
        
        ++fieldIndex;
    }

    result += '}\n';
    result += `MessageMap[MessageId.${key}] = ${key};\n\n`;
}

console.log(result);
