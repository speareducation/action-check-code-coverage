const core = require('@actions/core');
const github = require('@actions/github');

const tag = github.context.ref.replace(/^refs\/(heads|tags)\//, '')
const [ text1, appEnv, release ] = tag.split('/');
console.log({ tag, appEnv, release })


if (!/^(sandbox|dotco|uat|staging|production)$/.test(appEnv)) {
    core.setFailed('appEnv could not be parsed from the ref, or it is invalid.')
}
if (!release) {
    core.setFailed('release could not be parsed from the ref.');
}

core.setOutput('appEnv', appEnv);
core.setOutput('release', release);
