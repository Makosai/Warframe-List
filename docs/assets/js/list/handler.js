// Checks if the item is crafted.
function crafted(item) {
    if(item.hasOwnProperty('crafted') && item.crafted == true) {
        return true;
    } else {
        return false;
    }
}

// Strips spaces and makes the string lowercase.
function strip(string) {
    return string.toLowerCase().replace(/\s/g, '');
}

// Merges all exports together into 1 query string.
// TODO: Use a shorter format (attach a number to each index and reference 1 = ash, and set ash's value based on the query index '1')
function exportAll() {
    var allExports = warframesExport/* + '&' + primaryExport */;
    history.pushState(null, null, 'index.html?' + allExports);
}

// Loads the query data back into the JSON.
function loadData(obj, name) {
    if(parsedQuery.hasOwnProperty(strip(name) + 'Crafted')) {
        obj.crafted = true;
    }
}

// https://stackoverflow.com/a/13419367 ~moka
var parsedQuery = parseQuery(window.location.href);
function parseQuery(qstr) {
    var query = {};
    qstr = qstr.substring(qstr.indexOf('?'));
    var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}