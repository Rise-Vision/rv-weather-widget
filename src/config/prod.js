/* global config: true */
/* exported config */
if (typeof angular !== "undefined") {
  angular.module("risevision.widget.weather.config", [])
    .value("current", "http://s3.amazonaws.com/Widget-Weather/current.html")
    .value("threeDay", "http://s3.amazonaws.com/Widget-Weather/three-day.html")
    .value("currentAndThreeDay", "http://s3.amazonaws.com/Widget-Weather/current-and-three-day.html")
  ;
}
