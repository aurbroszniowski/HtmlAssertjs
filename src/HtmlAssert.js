var HtmlAssert = function(html) {
    this.tagsList = new Array();
    this.html = html;
};


var Tp = HtmlAssert.prototype;
Tp.toString = function () {
    var ret="";
    for (var i=0; i < this.tagsList.length; i++) {
        ret += this.tagsList[i] + "\n";
    }
    return ret;
};
Tp.div = function(attributes) { this.tagsList.push('div'); return this; };