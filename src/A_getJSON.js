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