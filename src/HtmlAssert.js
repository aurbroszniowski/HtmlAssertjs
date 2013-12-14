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
    console.info('---------------------------');
    console.info(title);
    var params = currentTest().toJSON();
    console.info(params);
    // call local server with title + json params
    // or interpret it later
};

var Tp = HtmlAssert.prototype;
Tp.toString = function () {
    var ret = "";
    for (var i=0; i < this.tagsList.length; i++) {
        ret += this.tagsList[i].toString() + "\n";
    }
    return ret;
};
//------------ list all Html tags methods
Tp.a = function(args) {
    return this.tag('a', args);
};

Tp.br = function(args) {
    return this.tag('br', args);
};

Tp.div = function(args) {
    return this.tag('div', args);
};

Tp.p = function(args) {
    return this.tag('p', args);
};

//-------------
Tp.tag = function(tagName, args) {
    if (typeof args == "undefined") {
        this.tagsList.push(new Tag(tagName, new Array()));
    } else {
        this.tagsList.push(new Tag(tagName, args));
    }
    return this;
};

Tp.toJSON = function () {
    return JSON.stringify(this.tagsList);
}