//! HtmlAssert.js
//! author : Aurelien Broszniowski
//! www.jsoft.biz

(function () {

    function createDom(html) {
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
        return dom;
    }
//-------------- Tag class
    var Tag = function (tag, attributes) {
        this.tag = tag;

        if ((attributes.length % 2) === 1) {
            throw tag + " attributes should be defined in pair";
        }
        this.attributesMap = {};
        this.nbAttributes = 0;
        for (var attributeName, attributeValue, i = 0; i < attributes.length; i += 2) {
            attributeName = attributes[i];
            attributeValue = attributes[i + 1];
            this.attributesMap[attributeName] = attributeValue;
            this.nbAttributes++;
        }

    }
    var Tagp = Tag.prototype;
    Tagp.getTag = function () {
        return this.tag;
    }
    Tagp.getAttribute = function (key) {    //TODO add for wildcard support '*'
        return this.attributesMap[key];
    }
    Tagp.getNbAttributes = function () {
        return this.nbAttributes;
    }

    Tagp.toString = function () {
        var out = this.tag + '[';

        var keys = Object.keys(this.attributesMap);
        for (var i = 0; i < keys.length; i++) {
            out += keys[i] + '=' + this.attributesMap[keys[i]];
            if (i < (this.nbAttributes - 1)) {
                out += ', ';
            }
        }
        out += ']';
        return out;
    }

//-------------- HtmlAssert class
    var HtmlAssert = function () {
        Object.defineProperty(this, 'contains', {
            get: function() {
                this.tagsList = new Array();
                return this;
            }
        });
        this.assertionError = null;
        this.tagsList = new Array();
        this.html = createDom('');

        this.containing = function (html) {
            if (typeof html === "undefined") {
                throw "You need to give as parameter the html that is going to be tested";
            }
            this.html = createDom(html);
            return this;
        };

        this.that = function (title, htmlToTest) {
            var found = findTags(htmlToTest.html, htmlToTest, 0);
            if (found !== true) {
                var msg = 'Error when it \'' + title + '\'. Tag not found:' + htmlToTest.assertionError;
                throw new Error(msg);
            }
            return true;
        };

    };

    HtmlAssert.getInstance = function(){
      return new HtmlAssert();
    };

    var Tp = HtmlAssert.prototype;
    Tp.toString = function () {
        var ret = "";
        for (var i = 0; i < this.tagsList.length; i++) {
            ret += this.tagsList[i].toString() + "\n";
        }
        return ret;
    };
//------------ list all Html 5 tags methods
    Tp.contains = function () {
        return this;
    };

    Tp.a = function () {
        return this.tag('a', arguments);
    };
    Tp.abbr = function () {
        return this.tag('abbr', arguments);
    };
    Tp.address = function () {
        return this.tag('address', arguments);
    };
    Tp.area = function () {
        return this.tag('area', arguments);
    };
    Tp.article = function () {
        return this.tag('article', arguments);
    };
    Tp.aside = function () {
        return this.tag('aside', arguments);
    };
    Tp.audio = function () {
        return this.tag('audio', arguments);
    };
    Tp.b = function () {
        return this.tag('b', arguments);
    };
    Tp.base = function () {
        return this.tag('base', arguments);
    };
    Tp.bdi = function () {
        return this.tag('bdi', arguments);
    };
    Tp.bdo = function () {
        return this.tag('bdo', arguments);
    };
    Tp.blockquote = function () {
        return this.tag('blockquote', arguments);
    };
    Tp.body = function () {
        return this.tag('body', arguments);
    };
    Tp.br = function () {
        return this.tag('br', arguments);
    };
    Tp.button = function () {
        return this.tag('button', arguments);
    };
    Tp.canvas = function () {
        return this.tag('canvas', arguments);
    };
    Tp.caption = function () {
        return this.tag('caption', arguments);
    };
    Tp.cite = function () {
        return this.tag('cite', arguments);
    };
    Tp.code = function () {
        return this.tag('code', arguments);
    };
    Tp.col = function () {
        return this.tag('col', arguments);
    };
    Tp.colgroup = function () {
        return this.tag('colgroup', arguments);
    };
    Tp.command = function () {
        return this.tag('command', arguments);
    };
    Tp.datalist = function () {
        return this.tag('datalist', arguments);
    };
    Tp.dd = function () {
        return this.tag('dd', arguments);
    };
    Tp.del = function () {
        return this.tag('del', arguments);
    };
    Tp.details = function () {
        return this.tag('details', arguments);
    };
    Tp.dfn = function () {
        return this.tag('dfn', arguments);
    };
    Tp.dialog = function () {
        return this.tag('dialog', arguments);
    };
    Tp.div = function () {
        return this.tag('div', arguments);
    };
    Tp.dl = function () {
        return this.tag('dl', arguments);
    };
    Tp.dt = function () {
        return this.tag('dt', arguments);
    };
    Tp.em = function () {
        return this.tag('em', arguments);
    };
    Tp.embed = function () {
        return this.tag('embed', arguments);
    };
    Tp.fieldset = function () {
        return this.tag('fieldset', arguments);
    };
    Tp.figcaption = function () {
        return this.tag('figcaption', arguments);
    };
    Tp.figure = function () {
        return this.tag('figure', arguments);
    };
    Tp.footer = function () {
        return this.tag('footer', arguments);
    };
    Tp.form = function () {
        return this.tag('form', arguments);
    };
    Tp.h1 = function () {
        return this.tag('h1', arguments);
    };
    Tp.h2 = function () {
        return this.tag('h2', arguments);
    };
    Tp.h3 = function () {
        return this.tag('h3', arguments);
    };
    Tp.h4 = function () {
        return this.tag('h4', arguments);
    };
    Tp.h5 = function () {
        return this.tag('h5', arguments);
    };
    Tp.h6 = function () {
        return this.tag('h6', arguments);
    };
    Tp.head = function () {
        return this.tag('head', arguments);
    };
    Tp.header = function () {
        return this.tag('header', arguments);
    };
    Tp.hr = function () {
        return this.tag('hr', arguments);
    };
    Tp.html = function () {
        return this.tag('html', arguments);
    };
    Tp.i = function () {
        return this.tag('i', arguments);
    };
    Tp.iframe = function () {
        return this.tag('iframe', arguments);
    };
    Tp.img = function () {
        return this.tag('img', arguments);
    };
    Tp.input = function () {
        return this.tag('input', arguments);
    };
    Tp.ins = function () {
        return this.tag('ins', arguments);
    };
    Tp.kbd = function () {
        return this.tag('kbd', arguments);
    };
    Tp.keygen = function () {
        return this.tag('keygen', arguments);
    };
    Tp.label = function () {
        return this.tag('label', arguments);
    };
    Tp.legend = function () {
        return this.tag('legend', arguments);
    };
    Tp.li = function () {
        return this.tag('li', arguments);
    };
    Tp.link = function () {
        return this.tag('link', arguments);
    };
    Tp.main = function () {
        return this.tag('main', arguments);
    };
    Tp.map = function () {
        return this.tag('map', arguments);
    };
    Tp.mark = function () {
        return this.tag('mark', arguments);
    };
    Tp.menu = function () {
        return this.tag('menu', arguments);
    };
    Tp.meta = function () {
        return this.tag('meta', arguments);
    };
    Tp.meter = function () {
        return this.tag('meter', arguments);
    };
    Tp.nav = function () {
        return this.tag('nav', arguments);
    };
    Tp.noscript = function () {
        return this.tag('noscript', arguments);
    };
    Tp.object = function () {
        return this.tag('object', arguments);
    };
    Tp.ol = function () {
        return this.tag('ol', arguments);
    };
    Tp.optgroup = function () {
        return this.tag('optgroup', arguments);
    };
    Tp.option = function () {
        return this.tag('option', arguments);
    };
    Tp.output = function () {
        return this.tag('output', arguments);
    };
    Tp.p = function () {
        return this.tag('p', arguments);
    };
    Tp.param = function () {
        return this.tag('param', arguments);
    };
    Tp.pre = function () {
        return this.tag('pre', arguments);
    };
    Tp.progress = function () {
        return this.tag('progress', arguments);
    };
    Tp.q = function () {
        return this.tag('q', arguments);
    };
    Tp.rp = function () {
        return this.tag('rp', arguments);
    };
    Tp.rt = function () {
        return this.tag('rt', arguments);
    };
    Tp.ruby = function () {
        return this.tag('ruby', arguments);
    };
    Tp.s = function () {
        return this.tag('s', arguments);
    };
    Tp.samp = function () {
        return this.tag('samp', arguments);
    };
    Tp.script = function () {
        return this.tag('script', arguments);
    };
    Tp.section = function () {
        return this.tag('section', arguments);
    };
    Tp.select = function () {
        return this.tag('select', arguments);
    };
    Tp.small = function () {
        return this.tag('small', arguments);
    };
    Tp.source = function () {
        return this.tag('source', arguments);
    };
    Tp.span = function () {
        return this.tag('span', arguments);
    };
    Tp.strong = function () {
        return this.tag('strong', arguments);
    };
    Tp.style = function () {
        return this.tag('style', arguments);
    };
    Tp.sub = function () {
        return this.tag('sub', arguments);
    };
    Tp.summary = function () {
        return this.tag('summary', arguments);
    };
    Tp.sup = function () {
        return this.tag('sup', arguments);
    };
    Tp.table = function () {
        return this.tag('table', arguments);
    };
    Tp.tbody = function () {
        return this.tag('tbody', arguments);
    };
    Tp.td = function () {
        return this.tag('td', arguments);
    };
    Tp.textarea = function () {
        return this.tag('textarea', arguments);
    };
    Tp.tfoot = function () {
        return this.tag('tfoot', arguments);
    };
    Tp.th = function () {
        return this.tag('th', arguments);
    };
    Tp.thead = function () {
        return this.tag('thead', arguments);
    };
    Tp.time = function () {
        return this.tag('time', arguments);
    };
    Tp.title = function () {
        return this.tag('title', arguments);
    };
    Tp.tr = function () {
        return this.tag('tr', arguments);
    };
    Tp.track = function () {
        return this.tag('track', arguments);
    };
    Tp.u = function () {
        return this.tag('u', arguments);
    };
    Tp.ul = function () {
        return this.tag('ul', arguments);
    };
    Tp.var = function () {
        return this.tag('var', arguments);
    };
    Tp.video = function () {
        return this.tag('video', arguments);
    };
    Tp.wbr = function () {
        return this.tag('wbr', arguments);
    };

    Tp.text = function () {
        return this.tag('text', arguments);
    };
//-------------
    Tp.tag = function (tagName, args) {
        var argsArray = Array.prototype.slice.call(args, 0);

        if (typeof argsArray == "undefined") {
            this.tagsList.push(new Tag(tagName, new Array()));
        } else {
            this.tagsList.push(new Tag(tagName, argsArray));
        }
        return this;
    }
//-------------
    Tp.toJSON = function () {
        return JSON.stringify(this.tagsList);
    }

    Tp.processTagsList = function () {
        return this.findTags(this.html, 0);
    }
    /**
     * This method will take a Tag from the array of html Tag objects (this.tagsList) and look into the Html recursively if the
     * tag is found somewhere below the current position in the DOM
     * @param currentNode the document from where we start looking in the DOM
     * @param index index in the tagsList array of tag (basically what tag we're currently looking for at this point of the DOM)
     * @returns {boolean} true if the tag with all attributes is found somewhere below the current position in the DOM
     */
    var findTags = function (currentNode, htmlToTest, index) {
        if (index == htmlToTest.tagsList.length) { // if we reach this, then we found all tags in stack
            return true;
        }
        var tag = htmlToTest.tagsList[index];

        var elements = getElementsByTag(currentNode, tag);

        var oneExist = false;
        index++;

        for (var i = 0; i < elements.length; i++) {
            oneExist = oneExist || findTags(elements[i], htmlToTest, index);
        }

        if (oneExist === false && htmlToTest.assertionError === null) {
            htmlToTest.assertionError = JSON.stringify(tag);
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
    var getElementsByTag = function (node, tag) {
        var nodes = new Array();
        var elements = node.getElementsByTagName(tag.getTag());

        for (var element, matchedAttributesMap, i = 0; i < elements.length; i++) {
            element = elements[i];
            matchedAttributesMap = {};

            var matching = true;
            if (element.attributes.length !== tag.getNbAttributes()) {
                matching = false;
            }
            else for (var attr, tagAttr, j = 0, attrs = element.attributes, l = attrs.length; j < l; j++) {
                attr = attrs.item(j);
                tagAttr = tag.getAttribute(attr.nodeName);
                if (typeof tagAttr != 'undefined') {
                    if (tagAttr.indexOf("*") != -1) {
                        tagAttr = tagAttr.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
                        tagAttr = tagAttr.replace(/\*/g, ".*");
                        var matcher = new RegExp(tagAttr, "g");
                        matching = matcher.test(attr.nodeValue);
                    } else if (tagAttr !== attr.nodeValue) {
                        matching = false;
                    }
                } else if (tagAttr !== attr.nodeValue) {
                    matching = false;
                }
            }

            if (matching) {
                nodes.push(element);
            }
        }
        return nodes;
    }

//    module.exports.that = that;
    module.exports = HtmlAssert.getInstance();

})();