
/**
 * given raw html, return parsed string
 * @param {raw html} str 
 */
export function HTMLDecode(str) {
    const parser = new DOMParser
    return parser.parseFromString('<!doctype html><body>' + str,
        'text/html').body.textContent
}


/**
 * check if it is a valid date
 * @param {date} d 
 */
function IsValidDate(d) {
    if (Object.prototype.toString.call(d) === "[object Date]") {
        // it is a date
        if (isNaN(d.getTime())) {  // d.valueOf() could also work
            // date is not valid
            return false
        }
        else {
            // date is valid
            return true
        }
    }
    else {
        // not a date
        return false
    }
}

/**
 * given date time, format as string
 * @param {datetime} str 
 */
export function FormatDateTime(str) {
    let date = new Date(str)
    if (IsValidDate(date)) {
        return date.toLocaleDateString() + " " + date.toLocaleTimeString()
    } else {
        return "--"
    }
}