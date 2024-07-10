const fs = require('fs');
const yargs = require('yargs');

let filenames = [];

try {
  const existingFilenames = fs.readFileSync('filenames.txt', 'utf8').trim().split('\n');
  filenames = existingFilenames;
} catch (err) {
  // file doesn't exist, create a new one
  fs.writeFileSync('filenames.txt', '');
}

yargs.command({
  command: 'write',
  describe: 'Write to a new file',
  builder: {
    filename: {
      describe: 'Filename to write to',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    const filename = argv.filename;
    if (filenames.includes(filename)) {
      console.log(`File ${filename} already exists. Please choose a new filename.`);
      process.exit(1);
    }
    fs.writeFileSync(filename, 'You are awesome!');
    filenames.push(filename);
    fs.writeFileSync('filenames.txt', filenames.join('\n'));
    console.log(`File ${filename} created successfully!`);
  }
}).demandCommand().parse();