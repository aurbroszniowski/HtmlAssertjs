var htmlassert = require("../lib/htmlassert.js");

casper.test.begin('HtmlAssert core', 0, function suite(test) {

    var html;
    var htmlToTest;

    html = "<dZv><p><div class=\"someclass\" id=\"someid\"></div></p></dZv>";
    htmlToTest = htmlassert.containing(html);
    test.assert(htmlassert.that("it tests a passing div", htmlToTest.contains.p().div("id", "someid", "class", "someclass")));

    html = "<p><div class=\"someclass&nbsp;\"></div></p>";
    htmlToTest = htmlassert.containing(html);
    test.assert(htmlassert.that("it tests a & with a wildcard", htmlToTest.contains.p().div("class", "*&nbsp;")));


    html = " <div>           <td title=\"en-gb\"\n" +
        "                style=\"166px;\">en-gb</td></div>\n";
    htmlToTest = htmlassert.containing(html);
    test.assert(htmlassert.that("it tests a passing div",
        htmlToTest.contains.td("title", "en-gb", "style", "166px;"))
    );


    html = " <td class=\"main_column main_column1\" title=\"1.26e+3k  (1257592)\" style=\"min-width: 166px; width: 166px; max-width: 166px;\"></td>";
    htmlToTest = htmlassert.containing(html);
    test.assert(htmlassert.that("it tests Attribute With Spaces",
        htmlToTest.contains.td("class", "main_column main_column1", "title", "1.26e+3k  (1257592)", "style", "min-width: 166px; width: 166px; max-width: 166px;"))
    );

    //TODO test with accesskey attribute with no value

    html = "<div><table><tr><div class=\"somediv\"><tr><span id=\"someid\"><div id=\"id1\"><td></td></div></span></tr><div>" +
        "<div class=\"somediv\"><tr><span id=\"someid\"><div id=\"id2\"><td></td></div></span></tr><div>" +
        "<div class=\"somediv\"><tr><span id=\"someid\"><div id=\"id3\"><td></td></div></span></tr>" +
        "<div></div></div></div></div></div></div></tr> </table></div>";
    htmlToTest = htmlassert.containing(html);
    test.assert(htmlassert.that("it tests Similar Multiple Lines",
        htmlToTest.contains.tr().div("class", "somediv").tr().span("id", "someid").div("id", "id2"))
    );


    html = "<dZv><div></div></dZv>";
    htmlToTest = htmlassert.containing(html);
    test.assert(htmlassert.that("it tests Passing Lenient Empty Div",
        htmlToTest.contains.div()
    ));


    html = "<div><div></div></div>";
    htmlToTest = htmlassert.containing(html);
    test.assert(htmlassert.that("it tests Passing Strict Empty Div",
        htmlToTest.contains.div()
    ));

    //TODO   public void testFailingLenientEmptyDiv() {

    //TODO   public void testFailingStrictEmptyDiv() {

    html = "<div><div id=\"someid\" class=\"someclass\"><div class=\"someclass\" ><div></div></div></div></div>";
    htmlToTest = htmlassert.containing(html);
    test.assert(htmlassert.that("it tests Passing Lenient Ordered Filled Div",
        htmlToTest.contains.div("id", "someid", "class", "someclass")
    ));


    html = "<div><div id=\"someid\" class=\"someclass\"><div class=\"someclass\" ><div></div></div></div></div>";
    htmlToTest = htmlassert.containing(html);
    test.assert(htmlassert.that("it tests Passing Lenient Multiple Filled Div",
        htmlToTest.contains.div("id", "someid", "class", "someclass").div("class", "someclass")
    ));


    html = "<div><div id=\"someid\" class=\"someclass\"><div class=\"someclass\" ><div></div></div></div></div>";
    htmlToTest = htmlassert.containing(html);
    test.assert(htmlassert.that("it tests Passing Lenient Multiple Mixed Div",
        htmlToTest.contains.div("id", "someid", "class", "someclass").div()
    ));

    //TODO public void testPassingStrictOrderedFilledDiv() {
    //TODO public void testPassingStrictUnorderedFilledDiv() {
    //TODO public void testPassingStrictMultipleFilledDiv() {
    //TODO public void testPassingStrictMultipleMixedDiv() {

    html = "<div><div id=\"someid\" class=\"someNONclass\"><div class=\"someclass\" ><div></div></div></div></div>";
    htmlToTest = htmlassert.containing(html);
    try {
        htmlassert.that("it tests Failing Lenient Ordered Filled Div",
            htmlToTest.contains.div("id", "someid", "class", "someclass")
        );
        casper.test.fail("Exception not thrown");
    } catch (err) {
        casper.test.pass("Exception thrown");
    }


    html = "<div><div id=\"someid\" class=\"someNONclass\"><div class=\"someclass\" ><div></div></div></div></div>";
    htmlToTest = htmlassert.containing(html);
    try {
        htmlassert.that("it tests Failing Lenient Unordered Filled Div",
            htmlToTest.contains.div("class", "someclass", "id", "someid")
        );
        casper.test.fail("Exception not thrown");
    } catch (err) {
        casper.test.pass("Exception thrown");
    }


    html = "<div><div id=\"someid\" class=\"someclass\"><div class=\"someNONclass\" ><div></div></div></div></div>";
    htmlToTest = htmlassert.containing(html);
    try {
        htmlassert.that("it tests Failing Lenient Multiple Filled Div",
            htmlToTest.contains.div("id", "someid", "class", "someclass").div("class", "someclass")
        );
        casper.test.fail("Exception not thrown");
    } catch (err) {
        casper.test.pass("Exception thrown");
    }


    html = "<div><div id=\"someNONid\" class=\"someclass\"><div class=\"someclass\" ><div></div></div></div></div>";
    htmlToTest = htmlassert.containing(html);
    try {
        htmlassert.that("it tests Failing Lenient Multiple Mixed Div",
            htmlToTest.contains.div("id", "someid", "class", "someclass").div()
        );
        casper.test.fail("Exception not thrown");
    } catch (err) {
        casper.test.pass("Exception thrown");
    }

    //TODO   public void testFailingStrictOrderedFilledDiv() {
    //TODO   public void testFailingStrictUnorderedFilledDiv() {
    //TODO   public void testFailingStrictMultipleFilledDiv() {
    //TODO   public void testFailingStrictMultipleMixedDiv() {


    html = "<div><div id=\"someid\" class=\"someclass\" hidden=\"\"><div class=\"someclass\" ><div></div></div></div></div>";
    htmlToTest = htmlassert.containing(html);
    try {
        htmlassert.that("it tests Failing Lenient Too Many Attr Div",
            htmlToTest.contains.div("id", "someid", "class", "someclass")
        );
        casper.test.fail("Exception not thrown");
    } catch (err) {
        casper.test.pass("Exception thrown");
    }


    html = " <td class=\"main_column main_column1\" title=\"1.26e+3k  (1257592)\" style=\"min-width: 166px; width: 166px; max-width: 166px;\"></td>";
    htmlToTest = htmlassert.containing(html);
    test.assert(htmlassert.that("it tests Attribute with wildcards",
        htmlToTest.contains.td("class", "main_column main_column1", "title", "1.26*)", "style", "min-width: *; width: *; max-width: *;")
    ));

    //TODO text() function search for text
    /*
     html ="<div><tr>content</tr></div>";
     htmlToTest = htmlassert.containing(html);
     test.assert(htmlassert.that("it tests Text Value",
     htmlToTest.contains.div().text("content");
     ));
     */


    /*
     html =
     htmlToTest = htmlassert.containing(html);
     test.assert(htmlassert.that("it ",
     htmlToTest.contains
     ));
     */


    test.done();
});