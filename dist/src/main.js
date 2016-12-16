"use strict";
var fs = require('fs');
var path = require('path');
var program = require('commander');
var generator_1 = require('../tools/generator');
program.version(require(path.join(__dirname, '../..', 'package.json'))['version']);
program
    .option('-f, --file <path>', 'json path.')
    .option('-o, --outFile <path>', 'out ts file path.')
    .parse(process.argv);
var file = program['file'];
var outFile = program['outFile'] || file + ".ts";
if (fs.existsSync(file)) {
    fs.writeFileSync(outFile, generator_1.Convert(JSON.parse(fs.readFileSync(file).toString())));
    console.log("twp convert to: " + outFile);
}
else {
    console.log("Not found json file: " + file);
}
//# sourceMappingURL=main.js.map