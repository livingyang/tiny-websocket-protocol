import * as fs from 'fs';
import * as path from 'path';
import * as program from 'commander';
import { Convert } from '../tools/generator';

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
            fs.writeFileSync(tsPath, Convert(JSON.parse(fs.readFileSync(jsonPath).toString())))
            console.log(`twp convert to: ${tsPath}`);
        }
        else {
            console.log(`Not found json file: ${jsonPath}`);
        }
    });

program.parse(process.argv);

if (process.argv.length <= 2) {
    program.help();
}
