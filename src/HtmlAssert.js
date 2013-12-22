//-------------- Tag class
var Tag = function(tag, attributes) {
    this.tag = tag;

    if ((attributes.length % 2) === 1) {
        throw tag + " attributes should be defined in pair";
    }
    this.attributesMap = {};
    for (var attributeName, attributeValue, i = 0; i < attributes.length; i+=2) {
        attributeName = attributes[i];
        attributeValue =  attributes[i + 1];
        this.attributesMap[attributeName] = attributeValue;
    }
}
var Tagp = Tag.prototype;
Tagp.getTag = function () {
   return this.tag;
}
Tagp.getAttribute = function (key) {    //TODO add for wildcard support '*'
   return this.attributesMap[key];
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
var HtmlAssert = function (html) {
    this.assertionError = null;
    this.tagsList = new Array();

    var doctype = document.implementation.createDocumentType(
        'html',
        '-//W3C//DTD XHTML 1.0 Strict//EN',
        'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'
    );
    var dom = document.implementation.createDocument(
        'http://www.w3.org/1999/xhtml',
        'html',
        doctype
    );
    dom.documentElement.innerHTML = html;
    this.html = dom;
};

HtmlAssert.it = function (title, currentTest) {
    var found = currentTest().processTagsList();
    if (found !== true) {
        var msg = 'Error when it \'' + title + '\'. Tag not found:' + currentTest().assertionError;
        throw msg;
    }
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
Tp.a = function() {
    return this.tag('a', arguments);
};

Tp.br = function() {
    return this.tag('br', arguments);
};

Tp.div = function() {
    return this.tag('div', arguments);
};

Tp.p = function() {
    return this.tag('p', arguments);
};

//-------------
Tp.tag = function(tagName, args) {
    var argsArray = Array.prototype.slice.call(args, 0);

    if (typeof argsArray == "undefined") {
        this.tagsList.push(new Tag(tagName, new Array()));
    } else {
        this.tagsList.push(new Tag(tagName, argsArray));
    }
    return this;
};

Tp.toJSON = function () {
    return JSON.stringify(this.tagsList);
}

Tp.processTagsList = function() {
    return this.findTags(this.html, 0);
}

Tp.findTags = function(currentNode, index) {
    if (index == this.tagsList.length) { // if we reach this, then we found all tags in stack
        return true;
    }
    var tag = this.tagsList[index];

    var elements = this.getElementsByTag(currentNode, tag);

    var oneExist = false;
    index++;

    for (var i = 0; i < elements.length; i++) {
        oneExist = oneExist || this.findTags(elements[i], index);
    }

    if (oneExist === false && this.assertionError === null) {
        this.assertionError = JSON.stringify(tag);
    }
/*
    if (oneExist === false) {
        if (this.assertionErrorIndex === -1) {
            this.assertionErrorIndex = index;
            this.assertionError = 'Tag=' + tag.getTag() + ', Attr=' + tag.getAttributes();
        } else if (this.assertionErrorIndex === index) {
            this.assertionError = this.assertionError + ', ' + tag.getAttributes();
        }
    }
*/
    return oneExist;
}


/**
 * This takes a Node (normally an Element) into which we'll look for children Nodes (Elements) have all the attributes
 * contained in the Tag. We return an Array for matching Nodes.
 * @param node current Node
 * @param tag tag we are looking for
 * @returns {Array} Array of matching Nodes
 */
Tp.getElementsByTag = function(node, tag) {
    var nodes = new Array();
    var elements = node.getElementsByTagName(tag.getTag());

    for (var element, matchedAttributesMap, i = 0; i < elements.length; i++) {
        element = elements[i];
        matchedAttributesMap = {};

        var matching = true;
        for (var attr, j = 0, attrs = element.attributes, l = attrs.length; j < l; j++) {
            attr = attrs.item(j)
            if (tag.getAttribute(attr.nodeName) !== attr.nodeValue) {
                matching = false;
            }
        }

        if (matching) {
            nodes.push(element);
        }
    }
    return nodes;
}
