import * as fs from 'fs';
import * as path from 'path';
import * as program from 'commander';
import {Convert} from '../tools/generator';

program.version(require(path.join(__dirname, '../..', 'package.json'))['version']);

program
  .option('-f, --file <path>', 'json path.')
  .option('-o, --outFile <path>', 'out ts file path.')
  .parse(process.argv);

let file = program['file'];
let outFile = program['outFile'] || `${file}.ts`;

if (fs.existsSync(file)) {
    fs.writeFileSync(outFile, Convert(JSON.parse(fs.readFileSync(file).toString())))
    console.log(`twp convert to: ${outFile}`);
}
else {
    console.log(`Not found json file: ${file}`);
}
