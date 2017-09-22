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
            decForma(MIN_FORMA, formaObj, primary);
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
        exportPrimaryWeapons();
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
"Amprex": { "id": 51 },
"Arca Plasmor": { "id": 52 },
"Attica": { "id": 53 },
"Boar": { "id": 54 },
"Boar Prime": { "id": 55 },
"Boltor": { "id": 56 },
"Boltor Prime": { "id": 57 },
"Braton": { "id": 58 },
"Braton Prime": { "id": 59 },
"Braton Vandal": { "id": 60 },
"Burston": { "id": 61 },
"Burston Prime": { "id": 62 },
"Buzlok": { "id": 63 },
"Cernos": { "id": 64 },
"Cernos Prime": { "id": 65 },
"Convectrix": { "id": 66 },
"Daikyu": { "id": 67 },
"Dera": { "id": 68 },
"Dera Vandal": { "id": 69 },
"Dex Sybaris": { "id": 70 },
"Drakgoon": { "id": 71 },
"Dread": { "id": 72 },
"Ferrox": { "id": 73 },
"Flux Rifle": { "id": 74 },
"Glaxion": { "id": 75 },
"Gorgon": { "id": 76 },
"Gorgon Wraith": { "id": 77 },
"Grakata": { "id": 78 },
"Grinlok": { "id": 79 },
"Harpak": { "id": 80 },
"Hek": { "id": 81 },
"Hema": { "id": 82 },
"Hind": { "id": 83 },
"Ignis": { "id": 84 },
"Ignis Wraith": { "id": 85 },
"Javlok": { "id": 86 },
"Karak": { "id": 87 },
"Karak Wraith": { "id": 88 },
"Kohm": { "id": 89 },
"Lanka": { "id": 90 },
"Latron": { "id": 91 },
"Latron Prime": { "id": 92 },
"Latron Wraith": { "id": 93 },
"Lenz": { "id": 94 },
"Miter": { "id": 95 },
"MK1-Braton": { "id": 96 },
"MK1-Paris": { "id": 97 },
"MK1-Strun": { "id": 98 },
"Mutalist Cernos": { "id": 99 },
"Mutalist Quanta": { "id": 100 },
"Ogris": { "id": 101 },
"Opticor": { "id": 102 },
"Panthera": { "id": 103 },
"Paracyst": { "id": 104 },
"Paris": { "id": 105 },
"Paris Prime": { "id": 106 },
"Penta": { "id": 107 },
"Phage": { "id": 108 },
"Prisma Gorgon": { "id": 109 },
"Prisma Grakata": { "id": 110 },
"Prisma Tetra": { "id": 111 },
"Quanta": { "id": 112 },
"Quanta Vandal": { "id": 113 },
"Rakta Cernos": { "id": 114 },
"Rubico": { "id": 115 },
"Sancti Tigris": { "id": 116 },
"Scourge": { "id": 117 },
"Secura Penta": { "id": 118 },
"Simulor": { "id": 119 },
"Snipetron": { "id": 120 },
"Snipetron Vandal": { "id": 121 },
"Sobek": { "id": 122 },
"Soma": { "id": 123 },
"Soma Prime": { "id": 124 },
"Stradavar": { "id": 125 },
"Strun": { "id": 126 },
"Strun Wraith": { "id": 127 },
"Supra": { "id": 128 },
"Supra Vandal": { "id": 129 },
"Sybaris": { "id": 130 },
"Sybaris Prime": { "id": 131 },
"Synapse": { "id": 132 },
"Synoid Simulor": { "id": 133 },
"Telos Boltor": { "id": 134 },
"Tenora": { "id": 135 },
"Tetra": { "id": 136 },
"Tiberon": { "id": 137 },
"Tigris": { "id": 138 },
"Tigris Prime": { "id": 139 },
"Tonkor": { "id": 140 },
"Torid": { "id": 141 },
"Vaykor Hek": { "id": 142 },
"Vectis": { "id": 143 },
"Vectis Prime": { "id": 144 },
"Vulkar": { "id": 145 },
"Vulkar Wraith": { "id": 146 },
"Zarr": { "id": 147 },
"Zenith": { "id": 148 },
"Zhuge": { "id": 149 }
};