var programmeChangeListener = function(event) {
    event.target.form.action = 'https://opportunities.aiesec.org/programmes/' + event.target.value;
};