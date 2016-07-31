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