var contents = {
    "warframe": 0,
    "primary": 0,
    "secondary": 0,
    "melee": 0,
    "sentinel": 0,
    "companions": 0,
    "archwing": 0,
    "archgun": 0,
    "archmelee": 0
}

function showContent(name) {
    Object.keys(contents).forEach(function(content) {
        if(content == name) {
            $('#' + content + '-content').css('display', 'block');
            $('#' + content + '-button').attr('class', 'btn btn-primary');
        }
        else {
            $('#' + content + '-content').css('display', 'none');
            $('#' + content + '-button').attr('class', 'btn btn-default');
        }
    });
}

function loadContent(name) {
    if(contents[name] == 0) {
        switch(name) {
            case "warframe":
                loadWarframe();
                break;
            case "primary":
                loadPrimaryWeapons();
                break;
            case "secondary":
                loadSecondaryWeapons();
                break;
        }
        
        contents[name] = 1; // set as loaded
    }
}

function setupSwitchers() {
    Object.keys(contents).forEach(function(content) {
        $('#' + content + '-button').click(function() {
            loadContent(content);
            showContent(content);
            return false;
        });
    });
}