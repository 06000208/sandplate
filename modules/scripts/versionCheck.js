const process = require("node:process");
const log = require("../log.js");

const [nodeMajor, nodeMinor] = process.versions.node.split(".");
if (Number(nodeMajor) < 16 || Number(nodeMinor) < 9) {
    log.fatal(`node.js v16.9+ is required, currently ${process.version}`);
    process.exit(1);
}
