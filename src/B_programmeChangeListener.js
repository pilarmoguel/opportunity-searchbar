var programmeChangeListener = function(dom) {
    dom.getElementById('programme').addEventListener('change', function(event) {
        event.target.form.action = 'https://opportunities.aiesec.org/programmes/' + event.target.value;
    });
};