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