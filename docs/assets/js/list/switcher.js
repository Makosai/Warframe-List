var contents = [
    'warframe',
    'primary',
    'secondary',
    'melee',
    'sentinel',
    'companions',
    'archwing',
    'archgun',
    'archmelee'
]

function showContent(name) {
    contents.forEach(function(content) {
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

function setupSwitchers() {
    contents.forEach(function(content) {
        $('#' + content + '-button').click(function() {
            showContent(content);
            return false;
        });
    });
}