var system = require("system");
var e2ePort = system.env.E2E_PORT || 8099;

casper.test.begin("Weather Widget - Current and 3 Day Forecast - e2e Testing", function (test) {
  casper.start("http://localhost:"+e2ePort+"/src/current-and-three-day-e2e.html",
    function () {
      test.assertTitle("Weather - Current and 3 Day Forecast", "Test page has loaded");
    }
  );

  casper.viewport(1024, 768);

  casper.waitForSelectorTextChange(".temp:nth-child(3)", function() {
    casper.then(function() {
      var today = new Date().getDay(),
        tomorrow = (today + 1) > 7 ? 1 : today + 1,
        nextDay = (tomorrow + 1 > 7) ? 1 : tomorrow + 1,
        days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        images = ["img/mostly_sunny.png", "img/mostly_sunny.png", "img/showers.png", "img/mostly_cloudy.png",
          "img/partly_cloudy.png", "img/mostly_cloudy.png", "img/mostly_sunny.png"],
        titles = ["More sun than clouds. Cool.", "More sun than clouds. Cool.", "Scattered showers. Mostly cloudy. Cool.",
          "Mostly cloudy. Cool.", "Morning clouds. Cool.", "Partly sunny. Cool.", "More sun than clouds. Cool."],
        temps = ["3° / 1°", "5° / 1°", "5° / 3°", "5° / 2°", "3° / 0°", "3° / 0°", "2° / 0°"];


      casper.test.comment("Weather Details");

      test.assertSelectorHasText(".city", "Glen Eden Ski Area, Ontario", "City is correct");
      test.assertSelectorHasText(".humidity", "Humidity 44%", "Humidity is correct");
      test.assertSelectorHasText(".wind", "Wind NW at 18 kph", "Wind is correct");


      casper.test.comment("Current Weather");

      test.assertEquals(this.getElementAttribute(".current-icon", "src"), "img/mostly_cloudy.png", "Image is correct");
      test.assertEquals(this.getElementAttribute(".current-icon", "title"), "Partly sunny. Chilly.", "Image title is correct");
      test.assertSelectorHasText(".current-temp", "2°C", "Temperature is correct");


      casper.test.comment("Forecasted Weather");
      casper.test.comment("Today");

      test.assertSelectorHasText(".day:nth-child(1) .day-of-week", this.evaluate(
        function(today, days) {
          return days[today];
        }, today, days), "Day is correct");

      test.assertEquals(this.getElementAttribute(".day:nth-child(1) .icon", "src"), this.evaluate(
        function(today, images) {
          return images[today];
        }, today, images), "Image is correct");

      test.assertEquals(this.getElementAttribute(".day:nth-child(1) .icon", "title"), this.evaluate(
        function(today, titles) {
          return titles[today];
        }, today, titles), "Image title is correct");

      test.assertSelectorHasText(".day:nth-child(1) .temp", this.evaluate(
        function(today, temps) {
          return temps[today];
        }, today, temps), "Temperature is correct");


      casper.test.comment("Tomorrow");

      test.assertSelectorHasText(".day:nth-child(2) .day-of-week", this.evaluate(
        function(tomorrow, days) {
          return days[tomorrow];
        }, tomorrow, days), "Day is correct");

      test.assertEquals(this.getElementAttribute(".day:nth-child(2) .icon", "src"), this.evaluate(
        function(tomorrow, images) {
          return images[tomorrow];
        }, tomorrow, images), "Image is correct");

      test.assertEquals(this.getElementAttribute(".day:nth-child(2) .icon", "title"), this.evaluate(
        function(tomorrow, titles) {
          return titles[tomorrow];
        }, tomorrow, titles), "Image title is correct");

      test.assertSelectorHasText(".day:nth-child(2) .temp", this.evaluate(
        function(tomorrow, temps) {
          return temps[tomorrow];
        }, tomorrow, temps), "Temperature is correct");


      casper.test.comment("Two days from now");

      test.assertSelectorHasText(".day:nth-child(3) .day-of-week", this.evaluate(
        function(nextDay, days) {
          return days[nextDay];
        }, nextDay, days), "Day is correct");

      test.assertEquals(this.getElementAttribute(".day:nth-child(3) .icon", "src"), this.evaluate(
        function(nextDay, images) {
          return images[nextDay];
        }, nextDay, images), "Image is correct");

      test.assertEquals(this.getElementAttribute(".day:nth-child(3) .icon", "title"), this.evaluate(
        function(nextDay, titles) {
          return titles[nextDay];
        }, nextDay, titles), "Image title is correct");

      test.assertSelectorHasText(".day:nth-child(3) .temp", this.evaluate(
        function(nextDay, temps) {
          return temps[nextDay];
        }, nextDay, temps), "Temperature is correct");


      casper.test.comment("Error Message");

      test.assertNotVisible(".error", "Error message is not displayed");
    });
  });

  casper.run(function() {
    test.done();
  });
});
