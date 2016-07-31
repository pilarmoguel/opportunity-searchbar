(function(){
var Promise = function(source) {
    var data = null;
    var loaded = false;
    var loading = false;
    var waiting = [];

    this.get = function(callback) {
        if(loading) {
            waiting.push(callback);
        } else if(loaded) {
            callback(data);
        } else {
            loading = true;
            waiting.push(callback);
            source(function(success, d) {
                if(success) {
                    loaded = true;
                    data = d;
                    loading = false;
                    for(var i = 0; i < waiting.length; i++) {
                        waiting[i](data);
                    }
                    waiting = [];
                } else {
                    waiting = [];
                }
            });
        }
    }
};
var accessToken = function() {
    return 'e316ebe109dd84ed16734e5161a2d236d0a7e6daf499941f7c110078e3c75493';
};
var getJSON = function(url, success, error) {
    if(window.XMLHttpRequest) {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function() {
            if(http.readyState == 4) {
                if(http.status == 200) {
                    try {
                        var data = JSON.parse(http.responseText);
                    } catch(e) {
                        data = undefined;
                        console.error("JSON Error: " + e);
                        error(-1, e);
                    }
                    if(data != undefined) success(data);
                } else {
                    error(http.status);
                }
            }
        };

        http.open("GET", url);
        http.send();
    } else {
        console.error("XML HTTP Request not available");
    }
};
var destinationChangeListener = function(dom) {

    var MAX = 5;

    var timeout = null;
    var suggestions = dom.getElementById('destination_suggestions');
    var input = dom.getElementById('destination');
    var id = dom.getElementById('destination_id');
    var latestValue = null;

    input.addEventListener('keyup', function(event) {
        id.name = "";
        if(timeout !== null) {
            clearTimeout(timeout);
        }
        latestValue = input.value;
        timeout = setTimeout(proceed, 300);
    });

    var proceed = function() {
        var value = latestValue;
        destinations.regions.get(function(data) {
            if(value === latestValue) {
                var selection = [];
                for(var i = 0; i < data.length && selection.length <= MAX; i++) {
                    if(data[i].name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                        selection.push({id: data[i].id, name: data[i].name, type: 'regions', human: 'Region'});
                    }
                }
                if(selection.length == MAX) {
                    proceedSelection(value, selection);
                } else {
                    destinations.home_mcs.get(function(data) {
                        if(value === latestValue) {
                            for(var i = 0; i < data.length && selection.length <= MAX; i++) {
                                if(data[i].name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                                    selection.push({id: data[i].id, name: data[i].name, type: 'home_mcs', human: 'Country'});
                                }
                            }
                            proceedSelection(value, selection);
                        }
                    })
                }
            }
        });
    };

    var proceedSelection = function(value, selection) {
        if(value === latestValue) {
            var html = "<ul>";
            for(var i = 0; i < selection.length; i++) {
                html += '<li data-type="' + selection[i].type + '" data-id="' + selection[i].id + '">' + selection[i].name + ' (' + selection[i].human + ')</li>';
            }
            html += '</ul>';
            suggestions.innerHTML = html;
            var lis = suggestions.getElementsByTagName('li');
            for(var i = 0; i < lis.length; i++) {
                lis[i].addEventListener('click', select);
            }
            suggestions.style.display = "block";
        }
    };

    var select = function(event) {
        suggestions.style.display = "none";
        input.value = event.target.innerText;
        id.name = event.target.dataset.type + '[]';
        id.value = event.target.dataset.id;
    }
};
var destinations = {
    regions : new Promise(function(callback) {
        var url = 'https://gis-api.aiesec.org:443/v2/lists/regions.json?access_token=' + accessToken();
        getJSON(url, function(data) {
            callback(true, data);
        }, function(code) {
            console.error('Could not load regions. Code: ' + code);
            callback(false);
        });
    }),
    home_mcs : new Promise(function(callback) {
        var url = 'https://gis-api.aiesec.org:443/v2/lists/mcs.json?access_token=' + accessToken();
        getJSON(url, function(data) {
            callback(true, data);
        }, function(code) {
            console.error('Could not load MCs. Code: ' + code);
            callback(false);
        });
    })
};
var innerHtml = '<form action="https://opportunities.aiesec.org/programmes/GCDP">' +
    '<select id="programme" required>' +
        '<option value="GCDP">Volunteer Abroad</option>' +
        '<option value="GIP">Intern Abroad</option>' +
        '<option value="TMP+TLP">Join in Campus</option>' +
    '</select>' +
    '<input name="earliest_start_date" type="date" required/>' +
    '<input id="destination" type="text" autocomplete="off" />' +
    '<input id="destination_id" type="hidden" />' +
    '<div id="destination_suggestions" style="display: none;"></div>' +
    '<input type="submit" value="Search" />' +
'</form>';
var programmeChangeListener = function(dom) {
    dom.getElementById('programme').addEventListener('change', function(event) {
        event.target.form.action = 'https://opportunities.aiesec.org/programmes/' + event.target.value;
    });
};
var registerCustomElement = function() {
    var prototype = Object.create(HTMLElement.prototype);

    prototype.createdCallback = function () {
        var shadow = this.createShadowRoot();
        shadow.innerHTML = innerHtml;

        var pCL = new programmeChangeListener(shadow);
        var dCL = new destinationChangeListener(shadow);
    };

    return document.registerElement('opportunity-searchbar', {prototype: prototype});
};
if ('registerElement' in document) {
    registerCustomElement();
} else {
    alert("Your browser is not yet supported or maybe not anymore. It seems like it doesn't support HTML5 so the best thing to do is to update your browser.");
}
})();
