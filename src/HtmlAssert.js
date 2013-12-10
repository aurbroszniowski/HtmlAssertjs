//-------------- Tag class
var Tag = function(tag, attributes) {
    this.tag = tag;
    this.attributes = attributes;
}
var Tagp = Tag.prototype;
Tagp.getTag = function () {
   return this.tag;
}
Tagp.getAttributes = function () {
   return this.attributes;
}
Tagp.toString = function () {
    var out = this.tag + '[';
    for (var i = 0; i < this.attributes.length; i++) {
        out += this.attributes[i];
        if (i < (this.attributes.length - 1)) {
            out += ', ';
        }
    }
    out += ']';
    return out;
}


//-------------- HtmlAssert class
var HtmlAssert = function(html) {
    this.tagsList = new Array();
    this.html = html;
};

HtmlAssert.it = function (title, currentTest) {
    console.info(title);
    currentTest();
};

var Tp = HtmlAssert.prototype;
Tp.toString = function () {
    var ret = "";
    for (var i=0; i < this.tagsList.length; i++) {
        ret += this.tagsList[i].toString() + "\n";
    }
    return ret;
};
Tp.div = function() {
    if (arguments.length > 0) {
            this.tagsList.push(new Tag('div', arguments));
    } else {
        this.tagsList.push(new Tag('div', new Array()));
    }
    return this;
};