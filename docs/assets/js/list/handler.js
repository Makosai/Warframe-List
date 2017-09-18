// Checks if the item is crafted.
function crafted(item) {
    if(item.hasOwnProperty('crafted') && item.crafted == true) {
        return true;
    } else {
        return false;
    }
}

function toggleOrokin(elem, obj) {
    obj.orokin = !obj.orokin;
    elem.css('background-position', obj.orokin ? 'center top' : 'center bottom');
    
    if(!obj.crafted) {
        var input = elem.parent().parent().find('input');   
        input.prop('checked', true);
        obj.crafted = true;
    }
}

function refreshOrokin(elem, obj) {
    if(!obj.orokin) {
        elem.css('background-position', 'center bottom');
    } else {
        elem.css('background-position', 'center top');
    }
}

function refreshForma(elem, obj) {
    if(obj.forma <= 0) {
        elem.css('background-position', 'center bottom');
    } else if(obj.forma > 0) {
        elem.css('background-position', 'center top');
    }
}

function incForma(max, elem, obj) {    
    if(obj.forma < max) {
        obj.forma++;
        elem.html('x' + obj.forma);   
    }
    
    if(!obj.crafted) {
        var input = elem.parent().parent().find('input');   
        input.prop('checked', true);
        obj.crafted = true;
    }
}

function decForma(min, elem, obj) {
    if(obj.forma > min) {
        obj.forma--;
        elem.html('x' + obj.forma);   
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
    history.pushState(null, null, '?' + allExports);
}

// Loads the query data back into the JSON.
function loadData(obj, name) {
    if(parsedQuery.hasOwnProperty(obj.id)) {
        var query = parsedQuery[obj.id];
        obj.crafted = query.substr(0, 1) == '1' ? true : false;
        obj.forma = parseInt(query.substr(1, 2));
        obj.orokin = query.substr(3, 1) == '1' ? true : false;
    }
}

function pad(num, len) {
    if(num.toString().length < len) {
        return ('0').repeat(len - num.toString().length) + num;
    } else {
        return num;
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