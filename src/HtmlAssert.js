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
    var index = 0;
    return this.findTags(this.html, index);
}

Tp.findTags = function(currentNode, index) {
    if (index == this.tagsList.length) { // if we reach this, then we found all tags in stack
        return true;
    }
    var tag = this.tagsList[index];

    var attributesMap = this.getAttributes(tag);

    var elements = currentNode.getElementsByTagName(tag.getTag());
    elements = this.removeUnmatchingElements(elements, attributesMap);

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

Tp.getAttributes = function(tag) {
   var attributes = tag.getAttributes();
    if ((attributes.length % 2) === 1) {
        throw tag + " attributes should be defined in pair";
    }
    var attributesMap = {};
    for (var attributeName, attributeValue, i = 0; i < attributes.length; i+=2) {
        attributeName = attributes[i];
        attributeValue =  attributes[i + 1];
        attributesMap[attributeName] = attributeValue;
    }
    return attributesMap;
}

Tp.removeUnmatchingElements = function (elements, attributesMap) {
    var elementsToRemove = new Array();
    for (var element, matchedAttributesMap, i = 0; i < elementsToRemove.length; i++) {
        element = elementsToRemove[i];
        matchedAttributesMap = {};

        for (var attr, j = 0, attrs = element.attributes, l = attrs.length; j < l; j++) {
            attr = attrs.item(j)
            matchedAttributesMap[attr.nodeName] = attr.nodeValue;
        }

        if (!this.hashMapsAreEqual(attributesMap, matchedAttributesMap)) {
            elementsToRemove.add(element);
        }
    }
    return this.removeAll(elements, elementsToRemove);
}

Tp.hashMapsAreEqual = function(map1, map2) {
    if (Object.keys(map1).length !== Object.keys(map2).length) {
        return false;
    }

    var keys1 = Object.keys(map1);
    for (var s, i = 0; i < keys1.length; i++) {
        s = keys1[i];
        if (map1[s] === null) {
            if (map2[s] !== null) {
                return false;
            }
        } else if (map1[s].contains("*")) {
            //... TODO : implement comparison with regex
        } else if (map1[s].toUpperCase() !== map2[s].toUpperCase()) {
            return false;
        }
    }
    return true;
}

Tp.removeAll = function (elements, elementsToRemove) {
    for (var el, i = 0; i < elementsToRemove.length; i++) {
        el = elementsToRemove[i];
        var idx = elements.indexOf(el);
        if (idx != -1) {
            elements.splice(idx, 1);
        }
    }
    return elements;
}