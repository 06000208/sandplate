import BaseConstruct from "../BaseConstruct";
import { log } from "../log";
import { join } from "path";
import { create } from "filehound";
import { createRequire } from "node:module";
import { directory } from "../constants.js";
import { has } from "../util/miscellaneous.js";

/**
 * Defunct handler class
 */
export class DefunctHandler {
    constructor() {
        this.require = createRequire(directory);
    }

    /**
     * @param {string} filePath
     */
    static resolvePath(filePath) {
        if (!filePath) return new TypeError("filePath parameter is required");
        let module;
        try {
            module = this.require.resolve(filePath);
        } catch (error) {
            if (error.code === "MODULE_NOT_FOUND") {
                return null;
            } else {
                throw error;
            }
        }
        return module;
    }

    /**
     * @param {BaseConstruct} construct
     * @param {?string} [filePath]
     */
    unloadModule(construct, filePath) {
        if (!construct) return new TypeError("construct parameter is required");
        let target = null;
        let cache = false;
        let blocks = false;
        const ids = [];
        if (filePath) {
            target = DefunctHandler.resolvePath(filePath);
            if (target) {
                if (has(require.cache, target)) {
                    delete require.cache[target];
                    cache = true;
                }
            }
        }
        if (construct.idsByPath.has(target)) {
            ids = construct.idsByPath.get(target);
            for (const id of ids) {
                if (!construct.cache.has(id)) continue;
                construct.unload(construct.cache.get(id));
            }
            blocks = true;
        }
        const obj = {
            success: true,
            value: filePath,
        };
        if (blocks || cache) {
            obj.message = `Unloaded ${cache ? `"${target}" from the cache` : ""}${cache && blocks ? " and " : ""}${blocks ? (target ? `${ids.length} ${ids.length === 1 ? "block" : "blocks"} mapped to that path` : "all anonymous blocks") : ""} from the ${construct.name}`;
        } else {
            obj.message = `Didn't unload anything as "${target}" wasn't cached nor mapped to any blocks`;
        }
        return new Response(obj);
    }

    /**
     * @param {BaseConstruct} construct
     * @param {[string]} filePaths
     * @param {?string} [directoryPath=null]
     */
    unloadMultipleModules(construct, filePaths, directoryPath = null) {
        if (!construct || !filePaths) return new Response({ message: "Required parameters weren't supplied", success: false });
        if (!filePaths.length) return new Response({ message: `Unloaded 0/0 modules (No modules to unload, skipped)`, success: true });
        let successes = 0;
        const resolvedPaths = [];
        for (const filePath of filePaths) {
            const result = this.unloadModule(construct, filePath);
            if (result.success && !result.error) ++successes;
            if (result.value) resolvedPaths.push(result.value);
        }
        return new Response({
            message: `Unloaded ${successes}/${filePaths.length} modules${directoryPath ? ` in "${directoryPath}"` : ""}`,
            success: true,
            value: resolvedPaths,
        });
    }

    /**
     * @param {BaseConstruct} construct
     * @param {BaseBlock|[BaseBlock]} mod
     * @param {?string} [filePath=null]
     * @param {?string} [trimmedPath=null]
     */
    loadModule(construct, mod, filePath = null, trimmedPath = null) {
        if (!construct || !mod) return new Response({ message: "Required parameters weren't supplied", success: false });
        if (isArray(mod)) {
            for (const block of mod) {
                construct.load(block, filePath, trimmedPath);
            }
            return new Response({
                message: `Loaded ${mod.length} ${mod.length === 1 ? "block" : "blocks"} from ${!filePath ? "code anonymously" : filePath}`,
                success: true,
                value: filePath,
            });
        } else {
            construct.load(mod, filePath, trimmedPath);
            return new Response({
                message: `Loaded 1 block from ${!filePath ? "code anonymously" : `"${filePath}"`}`,
                success: true,
                value: filePath,
            });
        }
    }

    /**
     * @param {BaseConstruct} construct
     * @param {string} filePath
     * @param {boolean} [respectDisabled=false]
     */
    requireModule(construct, filePath, respectDisabled = false) {
        if (!construct || !filePath) return new Response({ message: "Required parameters weren't supplied", success: false });
        const resolvedPath = Handler.resolvePath(filePath);
        if (!resolvedPath.success || resolvedPath.error) return resolvedPath;
        const trimmedPath = this.trimPath(resolvedPath.value);
        // Putting the path in an array prevents periods from being interpreted as traversing the db
        if (!this.modules.has([trimmedPath]).value()) {
            this.modules.set([trimmedPath], true).write();
        } else if (respectDisabled && !this.modules.get([trimmedPath]).value()) {
            log.debug(`Skipping disabled module "${resolvedPath.value}"`);
            return new Response({ message: `Module "${resolvedPath.value}" was disabled`, success: true });
        }
        let mod;
        try {
            mod = require(resolvedPath.value);
        } catch (error) {
            log.error("[requireModule]", error);
            return new Response({ message: "Error while requiring module", success: false, error: error });
        }
        if (isNil(mod)) return new Response({ message: `Something went wrong while requiring module "${resolvedPath.value}" but didn't result in an error`, success: false });
        // The use of cloneDeep prevents the require.cache from being affected by changes to the module
        return this.loadModule(construct, cloneDeep(mod), resolvedPath.value, trimmedPath);
    }

    /**
     * @param {BaseConstruct} construct
     * @param {[string]} filePaths
     * @param {boolean} [respectDisabled=false]
     * @param {?string} [directoryPath=null]
     */
    requireMultipleModules(construct, filePaths, respectDisabled = false, directoryPath = null) {
        if (!construct || !filePaths) return new Response({ message: "Required parameters weren't supplied", success: false });
        if (!filePaths.length) return new Response({ message: `Loaded 0/0 modules (No modules to require, skipped)`, success: true });
        let successes = 0, disabled = 0;
        const resolvedPaths = [];
        for (const filePath of filePaths) {
            const result = this.requireModule(construct, filePath, respectDisabled);
            if (result.success && !result.error) {
                if (!result.value) {
                    ++disabled;
                } else {
                    ++successes;
                    resolvedPaths.push(result.value);
                }
            }
        }
        return new Response({
            message: `Loaded ${successes}/${filePaths.length - disabled} modules${disabled ? ` (${disabled} disabled)` : ""}${directoryPath ? ` in "${directoryPath}"` : ""}`,
            success: true,
            value: resolvedPaths,
        });
    }

    /**
     * @param {string} directoryPath
     */
    static async searchDirectory(directoryPath) {
        if (!directoryPath) return new Response({ message: "Required parameters weren't supplied", success: false });
        const filePaths = await create().paths(directoryPath).ext(".js").find().catch(error => {
            log.error(error);
            return new Response({ message: "Error while attempting to search directory", success: false, error: error });
        });
        if (isNil(filePaths)) return new Response({ message: "Something went wrong while searching directory but didn't result in an error", success: false });
        if (!filePaths.length) return new Response({ message: `No files found in "${directoryPath}", skipping`, success: true, value: null });
        return new Response({
            message: `Found ${filePaths.length} ${!filePaths.length ? "file" : "files"} under "${directoryPath}"`,
            success: true,
            value: filePaths.map(filePath => join("..", filePath)),
        });
    }

    /**
     * @param {BaseConstruct} construct
     * @param {string} directoryPath
     * @param {boolean} [respectDisabled=false]
     */
    async requireDirectory(construct, directoryPath, respectDisabled = false) {
        if (!construct || !directoryPath) return new Response({ message: "Required parameters weren't supplied", success: false });
        const result = await Handler.searchDirectory(directoryPath);
        if (!result.value || !result.success) return result;
        return this.requireMultipleModules(construct, result.value, respectDisabled, directoryPath);
    }

    /**
     * @param {BaseConstruct} construct
     * @param {string} directoryPath
     */
    async unloadDirectory(construct, directoryPath) {
        if (!construct || !directoryPath) return new Response({ message: "Required parameters weren't supplied", success: false });
        const result = await Handler.searchDirectory(directoryPath);
        if (!result.value || !result.success) return result;
        return this.unloadMultipleModules(construct, result.value, directoryPath);
    }
}

export default Handler;
