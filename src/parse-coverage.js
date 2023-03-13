
/**
 * Takes a coverage.txt or jest-coverage.txt file contents and outputs a Number representing the line coverage percent.
 * @param {String} fileContents 
 * @return {Number} coverage
 */
function parseCoverage(fileContents) {
    try {
        // matches jest, vitest, c8, and phpunit coverage patterns:
        //|Lines        : 17.78% ( 210/1181 )
        //|  Lines:   90.44% (1060/1172)
        const [line, coverage] = fileContents.toString().match(/^ *Lines *: *([\d\.]+)%/m);
        return Number(coverage);

    } catch (error) {
        console.warn(error);
        return 0;
    }
}

module.exports = { parseCoverage };