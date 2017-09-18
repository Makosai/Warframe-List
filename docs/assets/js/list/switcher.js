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
    console.log(1);
    contents.forEach(function(content) {
        if(content == name)
            $('#' + content + '-content').css('display', 'block');
        else
            $('#' + content + '-content').css('display', 'none');
    });
}

function setupSwitchers() {
    console.log(2);
    contents.forEach(function(content) {
        $('#' + content + '-button').click(function() {
            showContent(content);
            return false;
        });
    });
}