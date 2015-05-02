Frontend-nanodegree-feedreader
Application built with the Jasmine JavaScript testing library.

Description

Project with a web-based application that reads RSS feeds using Jasmine to practice the test-driven development standard. This is a way to develop where tests for possible points of failure of a proposed application are written first before developing the application. Then code is written so that the application passes the tests.

Components

index.html
js/app.js
jasmine/spec/feedreader.js

css/style.css
css/icomoon.css
css/normalize.css
jasmine/lib/jasmine-2.1.2/boot.js
jasmine/lib/jasmine-2.1.2/console.js
jasmine/lib/jasmine-2.1.2/jasmine.js
jasmine/lib/jasmine-2.1.2/jasmine-html.js
jasmine/lib/jasmine-2.1.2/jasmine.css
jasmine/lib/jasmine-2.1.2/favicon.png
fonts/icomoon.eot
fonts/icomoon.svg
fonts/icomoon.ttf

Installation

Jasmine code and installation instructions can be found at github.com https://github.com/jasmine/jasmine

Running the code

The tests are all written in the feedreader.js file which resides in the jasmine/spec/ folder.

The results of the tests can be seen by simply opening the index.html file on a browser.

Jasmine will append to the end of the page a report of how each of the tests performed. If one or more of the tests fail the overall color of the page will be red. Under the Jasmine logo there will be a sequence of dots representing the given tests. Any tests that passed are green in color and those that failed are red in color. This is followed by error tracing information pointing to the location of the specific error or errors.

Documentation

http://jasmine.github.io/