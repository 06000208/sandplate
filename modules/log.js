import pino from "pino";
import { DateTime } from "luxon";
const startTime = DateTime.now();

const log = pino({
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

export { log };
