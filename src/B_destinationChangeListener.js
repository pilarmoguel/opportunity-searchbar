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