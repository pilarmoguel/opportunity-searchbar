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