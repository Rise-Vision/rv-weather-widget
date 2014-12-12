var system = require("system");
var e2ePort = system.env.E2E_PORT || 8099;

/* less granularity than unit testing, focusing on making sure the UI looks as expected from an end user perspective. */
casper.test.begin("Weather Widget - e2e Testing", function (test) {
  casper.start("http://localhost:"+e2ePort+"/src/current-e2e.html",
    function () {
      test.assertTitle("Weather Widget - Current", "Test page has loaded");
    }
  );

  // casper.waitFor(
  //   function check() {
  //     return this.evaluate(function() {
  //       return document.querySelectorAll(".day").length === 6;
  //     });
  //   },
  //   function then() {
  casper.then(function() {

  });
  //   }
  // );

  casper.run(function() {
    test.done();
  });
});
