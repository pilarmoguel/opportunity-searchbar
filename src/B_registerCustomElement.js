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