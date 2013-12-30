var htmlassert = require("../lib/htmlassert.js");


casper.test.begin('HtmlAssert core', 0, function suite(test) {


    console.log('eeee');

    var html = "<dZv><p><div class=\"someclass\" id=\"someid\"></div></p></dZv>";
    var htmlToTest = htmlassert.containing(html);
    console.log('>>'+htmlToTest.contains.toString());
//    htmlassert.that("it is a first test", htmlToTest.cin.p().div("id", "someid", "class", "someclass"));

    test.done();
});