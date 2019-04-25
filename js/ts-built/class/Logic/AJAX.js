export class AJAX {
    constructor() {
        this.formatParameters = function (parameters) {
            var r = "";
            for (var i = 0; i < parameters.length; i += 2) {
                r += parameters[i] + "=" + parameters[i + 1];
                if (i < parameters.length - 2)
                    r += "&";
            }
            return r;
        };
        this.JSONPHandlerToXMLDom = function (string, doctype) {
            string = string.replace(/<!DOCTYPE(.*?)>/, '<!DOCTYPE ' + doctype + '>');
            string = string.replace(/JSONPHandler\("|"\)|\\n|\\r/g, '');
            string = string.replace(/\\"/g, '"');
            string = string.replace(/\\\//g, '/');
            var xmlDoc = null;
            if (window.DOMParser) {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(string, "text/xml");
            }
            else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(string);
            }
            return xmlDoc;
        };
    }
    static e() {
        if (!this.hasOwnProperty('f'))
            this.f = AJAX.onResponseReady;
        if (this.readyState == 4 && this.status == 200)
            this.f();
    }
    ;
    static send(method, filename, myFunction, parameters) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = myFunction;
        xhttp.open(method, filename, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parameters);
    }
}
AJAX.onResponseReady = null;
AJAX.get = function (path, parameters) {
    if (parameters.length > 0)
        path = path + "?" + this.formatParameters(parameters);
    this.send("GET", path, AJAX.e);
};
AJAX.post = function (path, parameters) {
    var p = '';
    if (parameters.length > 0)
        p = this.formatParameters(parameters);
    this.send("POST", path, AJAX.e, p);
};
