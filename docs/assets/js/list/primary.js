var primaryExport = ""; // Used to convert the new data to reusable query data.

// Load the data into HTML format.
function loadPrimaryWeapons() {    
    Object.keys(primaryWeapons).forEach(function(key) {
        
        var primary = primaryWeapons[key];
        var name = key;
        var image = 'assets/img/PrimaryWeapons/' + key + '.png';
        var cellName = strip(name) + '-cell';
        var orokinType = 'Catalyst';
        
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
            primary.crafted = input.is(':checked');
            exportPrimaryWeapons();
        });
        
        $(boxCell).find('input').click(function() {
            var input = $(this);
            input.prop('checked', !input.is(':checked'));
            primary.crafted = input.is(':checked');
            exportPrimaryWeapons();
        });
        
        var formaObj = $(boxCell).find('.forma');
        
        $(boxCell).find('.forma-up').click(function() {
            incForma(MAX_FORMA, $(boxCell).find('.forma'), primary);
            refreshForma(formaObj, primary);
            exportPrimaryWeapons();
            return false;
        });
        
        $(boxCell).find('.forma-down').click(function() {
            decForma(MIN_FORMA, formaObj, priamry);
            refreshForma(formaObj, primary);
            exportPrimaryWeapons();
            return false;
        });
        
        var orokinObj = $(boxCell).find('.orokin-' + orokinType.toLowerCase());
        
        orokinObj.click(function() {
            toggleOrokin($(this), primary);
            exportPrimaryWeapons();
            return false; 
        });

        $("#primary-content tbody").append(row);
        
        // Load the query data.
        loadData(primary, name);
        
        if(crafted(primary)) {
            var input = $('#' + cellName + ' input');
            input.prop('checked', true);
        }
        
        if(!primary.hasOwnProperty('forma')) {
            primary.forma = 0;
        }
        
        if(!primary.hasOwnProperty('orokin')) {
            primary.orokin = false;
        }
        
        $(boxCell).find('.forma').html('x' + primary.forma);
        refreshForma(formaObj, primary);
        refreshOrokin(orokinObj, primary);
    });
}

// Export the data as a query for future use.
function exportPrimaryWeapons() {
    var exportText = [];
    Object.keys(primaryWeapons).forEach(function(key) {
        var primary = primaryWeapons[key];
        
        if(crafted(primary)) {
            exportText.push(
                primary.id + '=' +
                (primary.crafted ? 1 : 0) + // Crafted
                pad(primary.forma, 2) + // Forma
                (primary.orokin ? 1 : 0)
            );
        }
    });
    
    exportText = exportText.join('&');
    primaryExport = exportText;
    
    exportAll();
}

// A list of all priamry weapons and corresponding data.
var primaryWeapons = {
    "Amprex": { id: 51 /* crafted: false, level: 0 */}
}