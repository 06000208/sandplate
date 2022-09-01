/**
 * Event listeners used for the node.js process
 * @see https://nodejs.org/api/process.html
 * @module scripts/processEvents
 */

import process from "node:process";
import { log } from "../log.js";

process.on("uncaughtException", (error, origin) => {
    console.error(`${origin},`, error);
    log.fatal({ "error": error.name || null, "stack": error.stack || null }, origin + (error.message ? `, ${error.message}` : ""));
    process.exit(1); // Always let code exit on uncaught exceptions
});
process.on("unhandledRejection", (reason, promise) => {
    if (reason instanceof Error) {
        console.error(`unhandledRejection,`, reason, promise);
        log.error({ "error": reason.name || null, "stack": reason.stack || null }, `unhandledRejection, ${reason.message || "no message"}`);
    } else {
        console.error(`unhandledRejection\n`, promise, reason);
        log.error("unhandledRejection, see console for further information");
    }
    process.exit(1); // Always let code exit on unhandled rejections
});
process.on("rejectionHandled", (promise) => {
    console.log("rejectionHandled\n", promise);
    log.debug("rejectionHandled, see console for further information");
});
process.on("warning", (warning) => log.warn(warning));
process.on("exit", (code) => code === 0 ? console.log("Exiting peacefully") : console.warn(`Exiting abnormally with code ${code}`));
