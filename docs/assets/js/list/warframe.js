var warframesExport = ""; // Used to convert the new data to reusable query data.

// Load the data into HTML format.
function loadWarframes() {    
    Object.keys(warframes).forEach(function(key) {
        
        var warframe = warframes[key];
        var name = key;
        var image = 'assets/img/Warframes/' + key + '.png';
        var cellName = strip(name) + '-cell';
        var orokinType = 'Reactor';
        
        var row = $('<tr id="' + cellName + '"></tr>');
        var imgCell = $('<td class="image"><img class="img-circle img-responsive" src="' + image + '" alt="' + name + '" width="65" height="65" />' + name + '</td>');
        imgCell.find('img').error(function() {
            $(this).attr('src', 'assets/img/nani.png');
        });
        
        var boxCell = $('<td class="name-choice"></td>');
        var craftBox = $('<span class="selector"><label class="checkbox-inline"><input type="checkbox" /></label></span>');
        var orokin = $('<div class="orokin-holder">' +
                       '<span class="orokin-' + orokinType.toLowerCase() + ' img-responsive"></span>' +
                       '</div>');
        var forma = $('<div class="forma-holder">' +
                      '<i class="forma-counter fa fa-minus-circle forma-down" aria-hidden="true"></i>' +
                      '<span class="forma img-responsive"></span>' +
                      '<i class="forma-counter fa fa-plus-circle forma-up" aria-hidden="true"></i>' +
                      '</div>');
        
        $(boxCell).append(forma);
        $(boxCell).append(orokin);
        $(boxCell).append(craftBox);
        
        $(row).append(imgCell);
        $(row).append(boxCell);
        
        $(row).click(function() {
            var input = $('#' + cellName + ' input');
            input.prop('checked', !input.is(':checked'));
            warframe.crafted = input.is(':checked');
            exportWarframes();
        });
        
        $(boxCell).find('input').click(function() {
            var input = $(this);
            input.prop('checked', !input.is(':checked'));
            warframe.crafted = input.is(':checked');
            exportWarframes();
        });
        
        var formaObj = $(boxCell).find('.forma');
        
        $(boxCell).find('.forma-up').click(function() {
            incForma(MAX_FORMA, $(boxCell).find('.forma'), warframe);
            refreshForma(formaObj, warframe);
            exportWarframes();
            return false;
        });
        
        $(boxCell).find('.forma-down').click(function() {
            decForma(MIN_FORMA, formaObj, warframe);
            refreshForma(formaObj, warframe);
            exportWarframes();
            return false;
        });
        
        var orokinObj = $(boxCell).find('.orokin-reactor');
        
        orokinObj.click(function() {
            toggleOrokin($(this), warframe);
            exportWarframes();
            return false; 
        });

        $("#warframe-content tbody").append(row);
        
        // Load the query data.
        loadData(warframe, name);
        
        if(crafted(warframe)) {
            var input = $('#' + cellName + ' input');
            input.prop('checked', true);
        }
        
        if(!warframe.hasOwnProperty('forma')) {
            warframe.forma = 0;
        }
        
        if(!warframe.hasOwnProperty('orokin')) {
            warframe.orokin = false;
        }
        
        $(boxCell).find('.forma').html('x' + warframe.forma);
        refreshForma(formaObj, warframe);
        refreshOrokin(orokinObj, warframe);
        exportWarframes();
    });
}

// Export the data as a query for future use.
function exportWarframes() {
    var exportText = [];
    Object.keys(warframes).forEach(function(key) {
        var warframe = warframes[key];
        
        if(crafted(warframe)) {
            exportText.push(
                warframe.id + '=' +
                (warframe.crafted ? 1 : 0) + // Crafted
                pad(warframe.forma, 2) + // Forma
                (warframe.orokin ? 1 : 0)
            );
        }
    });
    
    exportText = exportText.join('&');
    warframesExport = exportText;
    
    exportAll();
}

// A list of all warframes and corresponding data.
var warframes = {
    "Ash": { id: 0 /* crafted: false, level: 0 */},
    "Ash Prime": { id: 1 },
    
    "Atlas": { id: 2 },
    
    "Banshee": { id: 3 },
    "Banshee Prime": { id: 4 },
    
    "Chroma": { id: 5 },
    
    "Ember": { id: 6 },
    "Ember Prime": { id: 7 },
    
    "Equinox": { id: 8 },
    
    "Excalibur": { id: 9 },
    "Excalibur Prime": { id: 10 },
    
    "Frost": { id: 11 },
    "Frost Prime": { id: 12 },
    
    "Harrow": { id: 13 },
    
    "Hydroid": { id: 14 },
    "Hydroid Prime": { id: 15 },
    
    "Inaros": { id: 16 },
    
    "Ivara": { id: 17 },
    
    "Limbo": { id: 18 },
    
    "Loki": { id: 19 },
    "Loki Prime": { id: 20 },
    
    "Mag": { id: 21 },
    "Mag Prime": { id: 22 },
    
    "Mesa": { id: 23 },
    
    "Mirage": { id: 24 },
    
    "Nekros": { id: 25 },
    "Nekros Prime": { id: 26 },
    
    "Nezha": { id: 27 },
    
    "Nidus": { id: 28 },
    
    "Nova": { id: 29 },
    "Nova Prime": { id: 30 },
    
    "Nyx": { id: 31 },
    "Nyx Prime": { id: 32 },
    
    "Oberon": { id: 33 },
    "Oberon Prime": { id: 34 },
    
    "Octavia": { id: 35 },
    
    "Rhino": { id: 36 },
    "Rhino Prime": { id: 37 },
    
    "Saryn": { id: 38 },
    "Saryn Prime": { id: 39 },
    
    "Titania": { id: 40 },
    
    "Trinity": { id: 41 },
    "Trinity Prime": { id: 42 },
    
    "Valkyr": { id: 43 },
    "Valkyr Prime": { id: 44 },
    
    "Vauban": { id: 45 },
    "Vauban Prime": { id: 46 },
    
    "Volt": { id: 47 },
    "Volt Prime": { id: 48 },
    
    "Wukong": { id: 49 },
    
    "Zephyr": { id: 50 }
}