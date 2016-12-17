"use strict";
var fs = require('fs');
var path = require('path');
var program = require('commander');
var generator_1 = require('../tools/generator');
program.version(require(path.join(__dirname, '../..', 'package.json'))['version']);
program
    .arguments('<jsonPath> [tsPath]')
    .usage('jsonPath [tsPath]')
    .action(function (jsonPath, tsPath) {
    if (jsonPath == null) {
        console.log('Please input json path.');
        return;
    }
    tsPath = tsPath || jsonPath + '.ts';
    if (fs.existsSync(jsonPath)) {
        fs.writeFileSync(tsPath, generator_1.Convert(JSON.parse(fs.readFileSync(jsonPath).toString())));
        console.log("twp convert to: " + tsPath);
    }
    else {
        console.log("Not found json file: " + jsonPath);
    }
});
program.parse(process.argv);
if (process.argv.length <= 2) {
    program.help();
}
//# sourceMappingURL=twp.js.map