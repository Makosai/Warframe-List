var warframesExport = ""; // Used to convert the new data to reusable query data.

// Load the data into HTML format.
function loadWarframes() {    
    Object.keys(warframes).forEach(function(key) {
        
        var warframe = warframes[key];
        var name = key;
        var image = "assets/img/" + (warframe.hasOwnProperty('image') ? 'Warframes/' + warframe.image : 'nani.png');
        var cellName = strip(name) + '-cell';
        
        row = $('<tr id="' + cellName + '"></tr>');
        imgCell = $('<td class="image"><img class="img-circle img-responsive" src="' + image + '" alt="' + name + '" width="65" height="65" />' + name + '</td>');
        boxCell = $('<td class="name-choice"><span><label class="checkbox-inline"><input type="checkbox" /></label></span></td>');

        $(row).append(imgCell);
        $(row).append(boxCell);
        
        $(row).click(function() {
            var input = $('#' + cellName + ' input');
            input.prop('checked', !input.is(':checked'));
            warframe.crafted = input.is(':checked');
            exportWarframes();
        });
        

        $("#warframe-content tbody").append(row);
        
        // Load the query data.
        loadData(warframe, name);
        
        if(crafted(warframe)) {
            var input = $('#' + cellName + ' input');
            input.prop('checked', true);
        }
    });
}

// Export the data as a query for future use.
function exportWarframes() {
    var exportText = [];
    Object.keys(warframes).forEach(function(key) {
        var warframe = warframes[key];
        
        if(crafted(warframe)) {
            exportText.push(
                strip(key) + 'Crafted=' + warframe.crafted
                + '&' +
                strip(key) + 'Level=' + 0);
        }
    });
    
    exportText = exportText.join('&');
    warframesExport = exportText;
    
    exportAll();
}

// A list of all warframes and corresponding data.
var warframes = {
    "Ash": {image: "Ash.png", /* crafted: false, level: 0 */},
    "Ash Prime": {},
    
    "Atlas": {},
    
    "Banshee": {},
    "Banshee Prime": {},
    
    "Chroma": {},
    
    "Ember": {},
    "Ember Prime": {},
    
    "Equinox": {},
    
    "Excalibur": {},
    "Excalibur Prime": {},
    
    "Frost": {},
    "Frost Prime": {},
    
    "Harrow": {},
    
    "Hydroid": {},
    "Hydroid Prime": {},
    
    "Inaros": {},
    
    "Ivara": {},
    
    "Limbo": {},
    
    "Loki": {},
    "Loki Prime": {},
    
    "Mag": {},
    "Mag Prime": {},
    
    "Mesa": {},
    
    "Mirage": {},
    
    "Nekros": {},
    "Nekros Prime": {},
    
    "Nezha": {},
    
    "Nidus": {},
    
    "Nova": {},
    "Nova Prime": {},
    
    "Nyx": {},
    "Nyx Prime": {},
    
    "Oberon": {},
    "Oberon Prime": {},
    
    "Octavia": {},
    
    "Rhino": {},
    "Rhino Prime": {},
    
    "Saryn": {},
    "Saryn Prime": {},
    
    "Titania": {},
    
    "Trinity": {},
    "Trinity Prime": {},
    
    "Valkyr": {},
    "Valkyr Prime": {},
    
    "Vauban": {},
    "Vauban Prime": {},
    
    "Volt": {},
    "Volt Prime": {},
    
    "Wukong": {},
    
    "Zephyr": {}
}