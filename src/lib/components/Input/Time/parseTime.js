
/**
 * @type {Record<string, string>}
 */
const map24 = {
    "12": "12",
    "01": "13",
    "02": "14",
    "03": "15",
    "04": "16",
    "05": "17",
    "06": "18",
    "07": "19",
    "08": "20",
    "09": "21",
    "10": "22",
    "11": "23",
};

/**
 * @param {string} timeString
 * @returns {boolean}
 */
export function isValid(timeString) {
    const time = timeString.trim().match(/(\d+)(?::(\d\d))?\s*(a|p)?/i);
    const time24hr = timeString.trim().match(/(\d\d)[:.]?(\d\d)/);
    const num = timeString.replace(/[^0-9]/g, "");

    if (!time && !time24hr) {
        return false;
    }
    if (time && !time[1]) {
        return false;
    }
    if (num.length > 4) {
        return false;
    }
    if (num.length === 2 && parseInt(num) > 12) {
        return false;
    }
    return true;
}

/**
 * @param {string} time
 * @returns {string}
 */
export function removeSpacer(time) {
    return time.replace(/[:.]/, "");
}

/**
 * @param {string} time
 * @returns {string}
 */
export function formatSemi24(time) {
    if (time.length === 1) {
        return `0${time}00`;
    }
    if (time.length === 2) {
        return `${time}00`;
    }
    if (time.length === 3) {
        return `0${time}`;
    }
    return time;
}

/**
 * @param {string} hour
 * @param {string} meridiem
 * @returns {string|null}
 */
export function checkHour(hour, meridiem) {
    if (hour > "24") {
        return null;
    }
    if (hour === "12" && meridiem === "a") {
        return "00";
    }
    if (hour < "12" && meridiem === "p") {
        return map24[hour];
    }
    return hour;
}

/**
 * @param {string} minute
 * @returns {string|null}
 */
export function checkMinute(minute) {
    if (minute > "59") {
        return null;
    }
    return minute;
}

/**
 * @param {string} time
 * @returns {{ hour: number; minute: number } | null }
 */
export function convertTo24hrTime(time) {
    const timeArray = time.split(/(p|a)/);
    const [, meridiem] = timeArray;

    const semi24 = formatSemi24(timeArray[0]);
    const hour = checkHour(semi24.substring(0, 2), meridiem);
    const minute = checkMinute(semi24.substring(2, 4));

    if (!hour || !minute) {
        return null;
    }
    return {
        hour: parseInt(hour),
        minute: parseInt(minute),
    };
}

/**
 * @param {{ hour: number; minute: number } | null } time
 * @returns {Date}
 */
export function assignToDate(time) {
    const dateTime = new Date();
    dateTime.setHours(time.hour);
    dateTime.setMinutes(time.minute);
    dateTime.setSeconds(0, 0);
    return dateTime;
}

/**
 * @param {string} time
 * @returns {string | Date}
 */
export default (time) => {
    if (!isValid(time.toString())) {
        throw new Error("invalid time format");
    }
    const time1 = removeSpacer(time.toString());
    const time2 = convertTo24hrTime(time1);

    if (!time2) {
        throw new Error("invalid time format");
    }
    return assignToDate(time2);
};
