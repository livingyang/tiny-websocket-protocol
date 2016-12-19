import * as fs from 'fs';
import * as jsyaml from 'js-yaml';

function GetObjectInterface(obj): string {
    if (typeof(obj) === 'object') {
        if (obj instanceof Array) {
            if (obj.length > 0) {
                return `${GetObjectInterface(obj[0])}[]`;
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
                let keyCount = 0;
                let result = '';
                result += '{';
                for (let key in obj) {
                    ++keyCount;
                    result += `${key}: ${GetObjectInterface(obj[key])}, `;
                }
                if (keyCount > 0) {
                    return result.substr(0, result.length - 2) + '}';
                }
                else {
                    return 'any';
                }
            }
        }
    }
    else {
        return typeof(obj);
    }
}

export function Convert(jsonObject) {
    let result = '';

    // 加入头部
    result += fs.readFileSync(`${__dirname}/../../tools/template.ts`);

    // 输出 MessageId
    result += 'export enum MessageId {\n';
    for (let key in jsonObject) {
        result += `    ${key},\n`;
    }
    result += '}\n\n';

    // 然后输出Handle
    result += 'export class TypedWebSocketMessageHandle extends WebSocketMessageHandle {\n';

    for (let key in jsonObject) {
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
    for (let key in jsonObject) {
        let value = jsonObject[key];
        result += `export class ${key} extends Message {\n`;

        // 输出buff的默认类型
        result += '    buffer: [MessageId';
        for (let field in value) {
            result += `, ${GetObjectInterface(value[field])}`;
        }
        result += '] = ';

        // 输出buff的默认数据
        result += `[MessageId.${key}`;
        for (let field in value) {
            result += `, ${JSON.stringify(value[field])}`;
        }
        result += '];\n'

        // 为了防止duck 类型匹配，加入每个类的唯一方法
        result += `    ${key}() {}\n`;

        // 输出类的字段
        let fieldIndex = 1;
        for (let field in value) {
            // get
            result += `    get ${field}() {\n`;
            result += `        return this.buffer[${fieldIndex}];\n`
            result += '    }\n';

            // set
            result += `    set ${field}(${field}: ${GetObjectInterface(value[field])}) {\n`;
            result += `        this.buffer[${fieldIndex}] = ${field};\n`
            result += '    }\n';
            
            ++fieldIndex;
        }

        result += '}\n';
        result += `MessageMap[MessageId.${key}] = ${key};\n\n`;
    }

    return result;
}

export function ConvertYaml(yamlPath: string) {
    return Convert(jsyaml.safeLoad(fs.readFileSync(yamlPath).toString()));
}