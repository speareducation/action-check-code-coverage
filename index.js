const AWS = require('aws-sdk');
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

const inputBucket = core.getInput('bucket');
const inputLocalFile = core.getInput('localFile');
const inputRemoteFile = core.getInput('remoteFile');

/**
 * Takes a coverage.txt or jest-coverage.txt file contents and outputs a Number representing the line coverage percent.
 * @param {String} fileContents 
 * @return {Number} coverage
 */
 function parseCoverage(fileContents) {
    try {
        // matches jest and phpunit coverage patterns:
        //|Lines        : 17.78% ( 210/1181 )
        //|  Lines:   90.44% (1060/1172)
        const [line, coverage] = fileContents.toString().match(/^ *Lines *: *([\d\.]+)%/m);
        return Number(coverage);

    } catch (error) {
        console.warn(error);
        return 0;
    }
}

/**
 * Main Handler
 */
async function handle() {
    let remoteCoverage = 0;
    let localCoverage = 0;

    try {
        const rsp = fs.readFileSync(inputLocalFile);
        localCoverage = parseCoverage(rsp.toString());
    } catch (error) {
        console.warn(error);
    }

    try {
        const S3 = new AWS.S3();
        const rsp = await S3.getObject({ Bucket: inputBucket, Key: inputRemoteFile }).promise();
        remoteCoverage = parseCoverage(rsp.Body.toString())
    } catch (error) {
        console.warn(error);
    }

    const difference = Math.round(localCoverage - remoteCoverage, 2);
    let description;

    if (difference === 0.00) {
        description = 'Coverage is unchanged.';
    } else if (difference > 0) {
        description = `Coverage up by ${difference}%`;
    } else {
        description = `Coverage down by ${difference}%`;
    }

    core.setOutput('description', description);
    core.setOutput('difference', difference > 0 ? `Coverage up by ${difference}%` : `Coverage down by ${difference}%`)

}

handle().catch(error => core.setFailed(error));
