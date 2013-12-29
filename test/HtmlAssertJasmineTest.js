//var htmlassert = require("../lib/htmlassert.js");
describe("HtmlAssert core", function () {

    it("test a passing div", function () {
        console.log('eeee');
        var htmlassert = new MY_HTMLASSERT_MODULE;

        var html = "<dZv><p><div class=\"someclass\" id=\"someid\"></div></p></dZv>";
        var htmlToTest = htmlassert.containing(html);
        htmlassert.that("it is a first test", htmlToTest.contains.p().div("id", "someid", "class", "someclass"));
    });
});