const pino = require("pino");
const { startTime } = require("./constants.js");

module.exports = pino({
    level: "trace",
    transport: {
        targets: [
            {
                target: "pino/file",
                level: "trace",
                options: { destination: `logs/${startTime.toISODate()}_${startTime.toMillis()}.log` },
            },
            {
                target: "pino-pretty",
                level: "trace",
            },
        ],
    },
});
