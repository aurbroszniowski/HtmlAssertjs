HtmlAssert.js
=============

HtmlAssert.js is a Javascript DSL based assertion API to assert HTML path and content.

Huh? What?
----------

Let's imagine you have some HTML content

    <div id="someId">
      <p class="someClass">
         <span>text</span>
      </p>
    </div>

And you have a (javascript) test that needs to verify that you *actually* have :

- a &lt;div> tag with an *id* attribute having the "someId" value.
- inside this &lt;div>, a &lt;p> tag with a *class* attribute having the "someClass" value.
- inside this &lt;p>, a &lt;span> tag.


HtmlAssert.js is the answer to this problem by providing an easy API that will let you write such assertions.

HtmlAssert.js uses a DSL based interface, using methods chaining, in order to allow to write tests that are as explicit as possible.
Testing the above HTML code would be done like this :

    htmlassert.that("it tests a passing div", htmlToTest.contains.div("id", "someid").p("class","someClass").span());


Quickstart
---------------------

1) Include the library in your project:

    npm install htmlassert.js --save-dep

2) This is how we write a simple test:

    var htmlassert = require("htmlassert.js");

    var html = "<p><div class=\"someclass\" id=\"someid\"></div></p>";

    var htmlToTest = htmlassert.containing(html);
    htmlassert.that("it tests some basic HTML", 
                     htmlToTest.contains.p().div("id", "someid", "class", "someclass")
                   );
3) You do two main steps : providing the HTML, then calling the assertions

    var htmlToTest = htmlassert.containing(html);

by calling the *containing(html)* method, you create an object that contains the HTML.

then you can call the assertions on this object, by calling the *that* method

    htmlassert.that("it tests some assertion", 
                     htmlToTest.contains.p().div().span()
                   );

At this point, you can call several assertions on the same html object, e.g.:

    var htmlToTest = htmlassert.containing(html);

    htmlassert.that("it tests some assertion number 1", 
                     htmlToTest.contains.p().div().span()
                   );
    htmlassert.that("it tests some assertion number 2", 
                     htmlToTest.contains.p().span()
                   );


4) By default, the assertion is lenient, it means that if you do not need to include all tags in your assertion:

    var htmlassert = require("htmlassert.js");

    var html = "<p><div class=\"someclass\"><span></span></div></p>";

    var htmlToTest = htmlassert.containing(html);
    htmlassert.that("it tests some basic HTML", 
                     htmlToTest.contains.p().div("id", "someid", "class", "someclass").span()
                   );
    htmlassert.that("it tests some basic HTML leniently", 
                     htmlToTest.contains.p().span()
                   );

both of those assertions will work, even the second where you did not indicated the &lt;div> tag.

*Note* : A strict mode will be implemented

5) Testing the attributes of a tag is sometimes heavy, so you can use a wildcard

    var html = "<div style=\"font-size: 150%; color: red;\"></div>";
    htmlassert.that("it tests some attributes with a wildcard", 
                     htmlToTest.contains.div("style", "font-size:*color:*")
                   );


Problems?
-------------
I'm not an expert in Javascript, so if you have any feedback, you're welcome to do it, please raise a issue on github : 
[HtmlAssert.js issues and comments](https://github.com/jsoftbiz/HtmlAssert.js/issues) 

Contributing
------------

The tests are included in the test directory and are using casperjs. 

- You need casperjs v1.1.x installed (globally)
- then install the node modules : npm install
- then execute the tests : grunt test

The code is in the lib directory