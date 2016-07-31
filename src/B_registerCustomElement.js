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