/* global global process */

export const LANGUAGE_DEFAULT = "en";

let _isWindows = false;
let _isMacintosh = false;
let _isLinux = false;
let _isIPad = false;
let _isNative = false;
let _isWeb = false;
let _locale= undefined;
let _language = LANGUAGE_DEFAULT;
let _translationsConfigFile = undefined;

const isElectronRenderer = (
    typeof process !== "undefined" &&
    typeof process.versions !== "undefined" &&
    typeof process.versions.electron !== "undefined" &&
    process.type === "renderer"
);

// OS detection
if (typeof navigator === "object" && !isElectronRenderer) {
    const userAgent = navigator.userAgent;
    _isWindows = userAgent.indexOf("Windows") >= 0;
    _isMacintosh = userAgent.indexOf("Macintosh") >= 0;
    _isLinux = userAgent.indexOf("Linux") >= 0;
    _isIPad = (userAgent.indexOf("iPad") >= 0);
    _isWeb = true;
    _locale = navigator.language;
    _language = _locale;
} else if (typeof process === "object") {
    _isWindows = (process.platform === "win32");
    _isMacintosh = (process.platform === "darwin");
    _isLinux = (process.platform === "linux");
    _locale = LANGUAGE_DEFAULT;
    _language = LANGUAGE_DEFAULT;
    _isNative = true;
}

const Platform = {
    Web: "Web",
    Mac: "Mac",
    Linux: "Linux",
    Windows: "Windows",
};

let _platform = Platform.Web;
if (_isNative) {
    if (_isMacintosh) {
        _platform = Platform.Mac;
    } else if (_isWindows) {
        _platform = Platform.Windows;
    } else if (_isLinux) {
        _platform = Platform.Linux;
    }
}

export const isWindows = _isWindows;
export const isMacintosh = _isMacintosh;
export const isLinux = _isLinux;
export const isNative = _isNative;
export const isWeb = _isWeb;
export const platform = _platform;
export const isIPad = _isIPad;

export function isRootUser() {
    return _isNative && !_isWindows && (process.getuid() === 0);
}

/**
 * The language used for the user interface. The format of
 * the string is all lower case (e.g. zh-tw for Traditional
 * Chinese)
 */
export const language = _language;

/**
 * The OS locale or the locale specified by --locale. The format of
 * the string is all lower case (e.g. zh-tw for Traditional
 * Chinese). The UI is not necessarily shown in the provided locale.
 */
export const locale = _locale;

/**
 * The translatios that are available through language packs.
 */
export const translationsConfigFile = _translationsConfigFile;

const _globals = (
    typeof self === "object"
        ? self
        : typeof global === "object"
            ? global
            : {});
export const globals = _globals;

let _setImmediate = null;
export function setImmediate(callback) {
    if (_setImmediate === null) {
        if (globals.setImmediate) {
            _setImmediate = globals.setImmediate.bind(globals);
        } else if (typeof process !== "undefined" && typeof process.nextTick === "function") {
            _setImmediate = process.nextTick.bind(process);
        } else {
            _setImmediate = globals.setTimeout.bind(globals);
        }
    }
    return _setImmediate !== null && _setImmediate(callback);
}

const OperatingSystem = {
    Windows: 1,
    Macintosh: 2,
    Linux: 3,
};

export const OS = (
    _isMacintosh
        ? OperatingSystem.Macintosh
        : (_isWindows
            ? OperatingSystem.Windows
            : OperatingSystem.Linux)
);
