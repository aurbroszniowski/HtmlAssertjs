describe("A suite", function () {
    it("contains spec with an expectation", function () {
        HtmlAssert.it("should contain those divs", function () {
            var html = "<dZv><div><div id=\"someid\"></div></div></dZv>";
            var htmlAssert = new HtmlAssert(html);
            console.info(">>> >> \n" + htmlAssert.div().div("id", "someid").toString());
        });
    });
});

