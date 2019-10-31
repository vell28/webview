const exec = require('child_process').exec; 
const fs = require('fs');
const moment = require('moment');

const BUILD_REVISION_FILE = '.build_revision';

exec('hg id -i', (err, stdout, stderr) => {
    let revision = 'unknown';

    if (err) {
        if (fs.existsSync(BUILD_REVISION_FILE)) {
        revision = fs.readFileSync(BUILD_REVISION_FILE, 'utf8');
        }
        else {

        return;
        }
    }
    else {
        revision = stdout.replace('+', '');
    }

    const packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const pipeline = process.env.pipeline || 'manual';

    const time = moment().format('DD.MM.YYYY HH:mm');
    const jsonData = {
        version: packageJSON.version,
        creationDate: time,
        revision: revision.trim(),
        pipeline: pipeline,
    };

    fs.writeFileSync('./dist/buildInfo.json', JSON.stringify(jsonData)); 
});