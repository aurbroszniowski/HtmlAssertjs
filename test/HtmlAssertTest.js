describe("A suite", function() {
    it("contains spec with an expectation", function() {
        var html = "<dZv><div></div></dZv>";
        var htmlAssert = new HtmlAssert(html);

        console.info(">>> >> "+htmlAssert.div().div().toString());
    });
});

