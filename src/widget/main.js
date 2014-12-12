/* global RiseVision, gadgets, google */
(function (window, document, google, gadgets) {
  "use strict";

  var prefs = new gadgets.Prefs(),
    id = prefs.getString("id");

  // Disable context menu (right click menu)
  window.oncontextmenu = function () {
    return false;
  };

  document.body.onmousedown = function() {
    return false;
  };

  google.setOnLoadCallback(function () {
    gadgets.rpc.register("rsparam_set_" + id, RiseVision.Weather.setParams);
    gadgets.rpc.call("", "rsparam_get", null, id, ["additionalParams"]);
  });
})(window, document, google, gadgets);
