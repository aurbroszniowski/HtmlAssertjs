describe("HtmlAssert core", function () {
    it("test a passing div", function () {
        var html = "<dZv><p><div class=\"someclass\" id=\"someid\"></div></p></dZv>";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain those divs", function() { return htmlAssert.p().div("id", "someid", "class", "someclass")});
    });

    it("test HTML on Multiple Lines", function () {
        var html = " <div>           <td title=\"en-gb\"\n" +
            "                style=\"166px;\">en-gb</td></div>\n";
        var htmlAssert = new HtmlAssert(html);
        HtmlAssert.it("should contain this td", function() { return htmlAssert.td("title", "en-gb", "style", "166px;")});
    });

});

