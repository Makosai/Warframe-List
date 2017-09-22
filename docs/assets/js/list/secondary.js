var secondaryExport = ""; // Used to convert the new data to reusable query data.

// Load the data into HTML format.
function loadSecondaryWeapons() {
    Object.keys(secondaryWeapons).forEach(function(key) {
        
        var secondary = secondaryWeapons[key];
        var name = key;
        var image = 'assets/img/SecondaryWeapons/' + key + '.png';
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
            secondary.crafted = input.is(':checked');
            exportSecondaryWeapons();
        });
        
        $(boxCell).find('input').click(function() {
            var input = $(this);
            input.prop('checked', !input.is(':checked'));
            secondary.crafted = input.is(':checked');
            exportSecondaryWeapons();
        });
        
        var formaObj = $(boxCell).find('.forma');
        
        $(boxCell).find('.forma-up').click(function() {
            incForma(MAX_FORMA, $(boxCell).find('.forma'), secondary);
            refreshForma(formaObj, secondary);
            exportSecondaryWeapons();
            return false;
        });
        
        $(boxCell).find('.forma-down').click(function() {
            decForma(MIN_FORMA, formaObj, secondary);
            refreshForma(formaObj, secondary);
            exportSecondaryWeapons();
            return false;
        });
        
        var orokinObj = $(boxCell).find('.orokin-' + orokinType.toLowerCase());
        
        orokinObj.click(function() {
            toggleOrokin($(this), secondary);
            exportSecondaryWeapons();
            return false; 
        });

        $("#secondary-content tbody").append(row);
        
        // Load the query data.
        loadData(secondary, name);
        
        if(crafted(secondary)) {
            var input = $('#' + cellName + ' input');
            input.prop('checked', true);
        }
        
        if(!secondary.hasOwnProperty('forma')) {
            secondary.forma = 0;
        }
        
        if(!secondary.hasOwnProperty('orokin')) {
            secondary.orokin = false;
        }
        
        $(boxCell).find('.forma').html('x' + secondary.forma);
        refreshForma(formaObj, secondary);
        refreshOrokin(orokinObj, secondary);
        exportSecondaryWeapons();
    });
}

// Export the data as a query for future use.
function exportSecondaryWeapons() {
    var exportText = [];
    Object.keys(secondaryWeapons).forEach(function(key) {
        var secondary = secondaryWeapons[key];
        
        if(crafted(secondary)) {
            exportText.push(
                secondary.id + '=' +
                (secondary.crafted ? 1 : 0) + // Crafted
                pad(secondary.forma, 2) + // Forma
                (secondary.orokin ? 1 : 0)
            );
        }
    });
    
    exportText = exportText.join('&');
    secondaryExport = exportText;
    
    exportAll();
}

var secondaryWeapons = {
"Acrid": { "id": 150 },
"Afuris": { "id": 151 },
"Akbolto": { "id": 152 },
"Akbronco": { "id": 153 },
"Akbronco Prime": { "id": 154 },
"Akjagara": { "id": 155 },
"Aklato": { "id": 156 },
"Aklex": { "id": 157 },
"Aklex Prime": { "id": 158 },
"Akmagnus": { "id": 159 },
"Aksomati": { "id": 160 },
"Akstiletto": { "id": 161 },
"Akstiletto Prime": { "id": 162 },
"Akvasto": { "id": 163 },
"Akzani": { "id": 164 },
"Angstrum": { "id": 165 },
"Arca Scisco": { "id": 166 },
"Atomos": { "id": 167 },
"Azima": { "id": 168 },
"Ballistica": { "id": 169 },
"Ballistica Prime": { "id": 170 },
"Bolto": { "id": 171 },
"Brakk": { "id": 172 },
"Bronco": { "id": 173 },
"Bronco Prime": { "id": 174 },
"Castanas": { "id": 175 },
"Cestra": { "id": 176 },
"Cycron": { "id": 177 },
"Despair": { "id": 178 },
"Detron": { "id": 179 },
"Dex Furis": { "id": 180 },
"Dual Cestra": { "id": 181 },
"Dual Toxocyst": { "id": 182 },
"Embolist": { "id": 183 },
"Euphona Prime": { "id": 184 },
"Furis": { "id": 185 },
"Gammacor": { "id": 186 },
"Hikou": { "id": 187 },
"Hikou Prime": { "id": 188 },
"Knell": { "id": 189 },
"Kohmak": { "id": 190 },
"Kraken": { "id": 191 },
"Kulstar": { "id": 192 },
"Kunai": { "id": 193 },
"Lato": { "id": 194 },
"Lato Prime": { "id": 195 },
"Lato Vandal": { "id": 196 },
"Lex": { "id": 197 },
"Lex Prime": { "id": 198 },
"MK1-Furis": { "id": 199 },
"MK1-Kunai": { "id": 200 },
"Magnus": { "id": 201 },
"Mara Detron": { "id": 202 },
"Marelok": { "id": 203 },
"Nukor": { "id": 204 },
"Pandero": { "id": 205 },
"Pox": { "id": 206 },
"Prisma Angstrum": { "id": 207 },
"Pyrana": { "id": 208 },
"Rakta Ballistica": { "id": 209 },
"Sancti Castanas": { "id": 210 },
"Secura Dual Cestra": { "id": 211 },
"Seer": { "id": 212 },
"Sicarus": { "id": 213 },
"Sicarus Prime": { "id": 214 },
"Sonicor": { "id": 215 },
"Spectra": { "id": 216 },
"Spira": { "id": 217 },
"Spira Prime": { "id": 218 },
"Staticor": { "id": 219 },
"Stug": { "id": 220 },
"Synoid Gammacor": { "id": 221 },
"Talons": { "id": 222 },
"Telos Akbolto": { "id": 223 },
"Twin Grakatas": { "id": 224 },
"Twin Gremlins": { "id": 225 },
"Twin Kohmak": { "id": 226 },
"Twin Rogga": { "id": 227 },
"Twin Vipers": { "id": 228 },
"Tysis": { "id": 229 },
"Vasto": { "id": 230 },
"Vasto Prime": { "id": 231 },
"Vaykor Marelok": { "id": 232 },
"Viper": { "id": 233 },
"Wraith Twin Vipers": { "id": 234 },
"Zakti": { "id": 235 }
};