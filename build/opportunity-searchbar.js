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
                        success(data);
                    } catch(e) {
                        error(-1, e);
                    }
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
var destinationChangeListener = function(event) {

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
    '<input name="earliest_start_date" type="date" />' +
    '<input id="destination" type="text" />' +
    '<input type="submit" value="Search" />' +
'</form>';
var programmeChangeListener = function(event) {
    event.target.form.action = 'https://opportunities.aiesec.org/programmes/' + event.target.value;
};
var registerCustomElement = function() {
    var prototype = Object.create(HTMLElement.prototype);

    prototype.createdCallback = function () {
        var shadow = this.createShadowRoot();
        shadow.innerHTML = innerHtml;

        shadow.getElementById('programme').addEventListener('change', programmeChangeListener);
        shadow.getElementById('destination').addEventListener('keyup', destinationChangeListener);
    };

    return document.registerElement('opportunity-searchbar', {prototype: prototype});
};
if ('registerElement' in document) {
    registerCustomElement();
} else {
    alert("Your browser is not yet supported");
}
})();
