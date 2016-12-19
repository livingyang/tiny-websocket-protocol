"use strict";
var fs = require('fs');
var path = require('path');
var program = require('commander');
var generator_1 = require('../tools/generator');
program.version(require(path.join(__dirname, '../..', 'package.json'))['version']);
program
    .arguments('<yamlPath> [tsPath]')
    .usage('yamlPath [tsPath]')
    .action(function (yamlPath, tsPath) {
    if (yamlPath == null) {
        console.log('Please input yaml path.');
        return;
    }
    tsPath = tsPath || yamlPath + '.ts';
    if (fs.existsSync(yamlPath)) {
        fs.writeFileSync(tsPath, generator_1.ConvertYaml(yamlPath));
        console.log("twp convert to: " + tsPath);
    }
    else {
        console.log("Not found yaml file: " + yamlPath);
    }
});
program.parse(process.argv);
if (process.argv.length <= 2) {
    program.help();
}
//# sourceMappingURL=twp.js.map