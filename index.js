const AWS = require('aws-sdk');
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const { parseCoverage } = require('./src/parse-coverage.js');

const inputBucket = core.getInput('bucket');
const inputLocalFile = core.getInput('localFile');
const inputRemoteFile = core.getInput('remoteFile');
const inputFailureThreshold = core.getInput('failureThreshold');

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

    const difference = Number(localCoverage - remoteCoverage).toFixed(2);
    const localPercent = `${localCoverage.toFixed(2)}%`;
    let description;

    if (difference === 0.00) {
        description = `Coverage is ${localPercent} - unchanged.`;
    } else if (difference > 0) {
        description = `Coverage is ${localPercent} - up by ${Math.abs(difference)}%`;
    } else {
        description = `Coverage is ${localPercent} - down by ${Math.abs(difference)}%`;
    }

    let emoji;
    if (difference >= 0) {
        emoji = ':white_check_mark:';
    } else if (difference >= -1) {
        emoji = ':warning:'
    } else {
        emoji = ':x:';
    }

    core.setOutput('description', description);
    core.setOutput('emoji', emoji);
    core.setOutput('difference', difference);

    // true if inputFailureThreshold is truthy and "difference" dips lower than it
    if (inputFailureThreshold) {
        core.setOutput('failure', Number(difference) < Number(inputFailureThreshold));
        console.log({ difference, inputFailureThreshold });
        console.log('failure:', Number(difference) < Number(inputFailureThreshold));
    } else {
        core.setOutput('failure', false);
    }
}

handle().catch(error => core.setFailed(error));
