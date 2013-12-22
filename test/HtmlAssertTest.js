//describe("A suite", function () {
//    it("contains spec with an expectation", function () {
//        var html = "<dZv><div><div id=\"someid\"></div></div></dZv>";
//        var htmlAssert = new HtmlAssert(html);
//        HtmlAssert.it("should contain those divs", function() { return htmlAssert.div().p("class", "someid", "id", "someied")});
//    });
//});

describe("A suite", function () {
    it("contains spec with an expectation", function () {
        var html = "<dZv><p><div class=\"someclass\" id=\"someid\"></div></p></dZv>";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain those divs", function() { return htmlAssert.p().div("id", "someid", "class", "someclass")});
    });
});

