var RiseVision = RiseVision || {};

RiseVision.Common = RiseVision.Common || {};

RiseVision.Common.Validation = (function() {
  "use strict";

  /*
  Defining the regular expressions being used
   */
  var urlRegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i,
      numericRegex = /^(\-|\+)?([0-9]+|Infinity)$/,
      decimalRegex = /^\-?[0-9]*\.?[0-9]+$/;

  function greaterThan(element, param) {
    var value = element.value.trim();

    if (!decimalRegex.test(value)) {
      return false;
    }

    return (parseFloat(value) > parseFloat(param));
  }

  function lessThan(element, param) {
    var value = element.value.trim();

    if (!decimalRegex.test(value)) {
      return false;
    }

    return (parseFloat(value) < parseFloat(param));
  }

  function numeric(element){
    var value = element.value.trim();

    /*
     Regexp being used is stricter than parseInt. Using regular expression as
     mentioned on mozilla
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
     Global_Objects/parseInt
     */
    return numericRegex.test(value);
  }

  function required(element){
    var value = element.value.trim(),
        valid = false;

    if (element.type === "checkbox" || element.type === "radio") {
      if(element.checked === true) {
        valid = true;
      }
    } else {
      if (value !== null && value !== '') {
        valid = true;
      }
    }

    return valid;
  }

  function url(element){
    var value = element.value.trim();

    // Add http:// if no protocol parameter exists
    if (value.indexOf("://") === -1) {
      value = "http://" + value;
    }
    /*
     Discussion
     http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-
     with-links#21925491

     Using
     https://gist.github.com/dperini/729294
     Reasoning
     http://mathiasbynens.be/demo/url-regex

     */
    return urlRegExp.test(value);
  }

  return {
    isGreaterThan: greaterThan,
    isLessThan: lessThan,
    isValidRequired: required,
    isValidURL: url,
    isValidNumber: numeric
  };
})();

RiseVision.Common.Utilities = (function() {

  function getFontCssStyle(className, fontObj) {
    var family = "font-family:" + fontObj.font.family + "; ";
    var color = "color: " + fontObj.color + "; ";
    var size = "font-size: " + fontObj.size + "px; ";
    var weight = "font-weight: " + (fontObj.bold ? "bold" : "normal") + "; ";
    var italic = "font-style: " + (fontObj.italic ? "italic" : "normal") + "; ";
    var underline = "text-decoration: " + (fontObj.underline ? "underline" : "none") + "; ";
    var highlight = "background-color: " + fontObj.highlightColor + "; ";

    return "." + className + " {" + family + color + size + weight + italic + underline + highlight + "}";
  }

  function addCSSRules(rules) {
    var style = document.createElement("style");

    for (var i = 0, length = rules.length; i < length; i++) {
      style.appendChild(document.createTextNode(rules[i]));
    }

    document.head.appendChild(style);
  }

  /*
   * Loads Google or custom fonts, if applicable, and injects CSS styles
   * into the head of the document.
   *
   * @param    array    settings    Array of objects with the following form:
 *                                   [{
 *                                     "class": "date",
 *                                     "fontSetting": {
 *                                         bold: true,
 *                                         color: "black",
 *                                         font: {
 *                                           family: "Akronim",
 *                                           font: "Akronim",
 *                                           name: "Verdana",
 *                                           type: "google",
 *                                           url: "http://custom-font-url"
 *                                         },
 *                                         highlightColor: "transparent",
 *                                         italic: false,
 *                                         size: "20",
 *                                         underline: false
 *                                     }
 *                                   }]
   *
   *           object   contentDoc    Document object into which to inject styles
   *                                  and load fonts (optional).
   */
  function loadFonts(settings, contentDoc) {
    settings.forEach(function(item) {
      if (item.class && item.fontSetting) {
        addCSSRules([ getFontCssStyle(item.class, item.fontSetting) ]);
      }

      if (item.fontSetting.font.type) {
        if (item.fontSetting.font.type === "custom" && item.fontSetting.font.family &&
          item.fontSetting.font.url) {
          loadCustomFont(item.fontSetting.font.family, item.fontSetting.font.url,
            contentDoc);
        }
        else if (item.fontSetting.font.type === "google" && item.fontSetting.font.family) {
          loadGoogleFont(item.fontSetting.font.family, contentDoc);
        }
      }
    });
  }

  function loadCustomFont(family, url, contentDoc) {
    var sheet = null;
    var rule = "font-family: " + family + "; " + "src: url('" + url + "');";

    contentDoc = contentDoc || document;

    sheet = contentDoc.styleSheets[0];

    if (sheet !== null) {
      sheet.addRule("@font-face", rule);
    }
  }

  function loadGoogleFont(family, contentDoc) {
    var stylesheet = document.createElement("link");

    contentDoc = contentDoc || document;

    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("type", "text/css");
    stylesheet.setAttribute("href", "https://fonts.googleapis.com/css?family=" +
      family);

    if (stylesheet !== null) {
      contentDoc.getElementsByTagName("head")[0].appendChild(stylesheet);
    }
  }

  return {
    getFontCssStyle:  getFontCssStyle,
    addCSSRules:      addCSSRules,
    loadFonts:        loadFonts,
    loadCustomFont:   loadCustomFont,
    loadGoogleFont:   loadGoogleFont
  };
})();

/* jshint ignore:start */
if (typeof angular !== "undefined") {
  angular.module("risevision.widget.weather.config", [])
    .value("current", "https://s3.amazonaws.com/widget-weather-test/0.1.0/dist/current.html")
    .value("threeDay", "https://s3.amazonaws.com/widget-weather-test/0.1.0/dist/three-day.html")
    .value("currentAndThreeDay", "https://s3.amazonaws.com/widget-weather-test/0.1.0/dist/current-and-three-day.html")
  ;
}

if (typeof config === "undefined") {
  var config = {
    urlByName: decodeURI(decodeURIComponent("%68%74%74%70%3a%2f%2f%77%77%77%2e%74%69%6e%62%75%77%65%61%74%68%65%72%2e%63%6f%6d%2f%77%78%5f%66%65%65%64%2f%77%78%5f%63%75%72%72%65%6e%74%5f%65%78%74%65%6e%64%65%64%5f%62%79%5f%6e%61%6d%65%2e%70%68%70%3f%70%61%73%73%63%6f%64%65%3d%72%69%73%65%64%69%73%70%6c%61%79%25%37%43%64%6b%61%63%26%6d%65%74%72%69%63%3d%66%61%6c%73%65")),
    urlByLocation: decodeURI(decodeURIComponent("%68%74%74%70%3a%2f%2f%77%77%77%2e%74%69%6e%62%75%77%65%61%74%68%65%72%2e%63%6f%6d%2f%77%78%5f%66%65%65%64%2f%77%78%5f%63%75%72%72%65%6e%74%5f%65%78%74%65%6e%64%65%64%5f%62%79%5f%6c%61%74%6c%6f%6e%2e%70%68%70%3f%70%61%73%73%63%6f%64%65%3d%72%69%73%65%64%69%73%70%6c%61%79%25%37%43%64%6b%61%63%26%6d%65%74%72%69%63%3d%66%61%6c%73%65"))
  };
}
/* jshint ignore:end */

/* global gadgets, config, i18n */

var RiseVision = RiseVision || {};
RiseVision.Weather = RiseVision.Weather || {};

RiseVision.Weather = (function (gadgets, config, i18n) {
  "use strict";

  var params,
    isLoading = true,
    imagesLoaded = 0,
    prefs = new gadgets.Prefs(),
    utils = RiseVision.Common.Utilities,
    refreshInterval = 1800000,
    errorInterval = 60000;

  /*
   *  Private Methods
   */
  function getWeather() {
    var address = params.address,
      geolocation = null,
      display = null,
      custom = null;

    if (address === "geolocation") {
      geolocation = new RiseVision.Weather.Geolocation(config);

      geolocation.getWeather({
        "success": showWeather,
        "error": handleErrors
      });
    }
    else if (address === "display") {
      display = new RiseVision.Weather.DisplayAddress(gadgets);

      display.getWeather({
        "success": showWeather,
        "error": handleErrors
      });
    }
    else if (address === "custom") {
      custom = new RiseVision.Weather.CustomAddress(config);

      custom.getWeather(params.customAddress, {
        "success": showWeather,
        "error": handleErrors
      });
    }
  }

  function showWeather(data) {
    var icon_name = "",
      current = null,
      location = null,
      place = "",
      windDirection = "",
      mph = 0,
      kph = 0,
      hasCity = false,
      hasHumidity = false,
      forecast = null,
      forecasts = [],
      dayOfWeek = "",
      today = new Date().getDay() + 1,
      tomorrow = (today + 1) > 7 ? 1 : today + 1,
      nextDay = (tomorrow + 1 > 7) ? 1 : tomorrow + 1;

    if (data) {
      // No weather data found for this location.
      if (data.getElementsByTagName("cw_error").length > 0) {
        retry();
      }
      else {
        $(".container").show();
        $(".error").hide();

        i18n.init({ fallbackLng: "en" }, function() {
          $(".container").i18n();

          // Find the observation tag that has an icon_name other than 'cw_no_report_icon'
          // and use that one for current weather data.
          $.each(data.getElementsByTagName("observation"), function(index, value) {
            // Skip first observation data as it doesn't seem to be very reliable.
            if (index !== 0) {
              icon_name = value.getAttribute("icon_name");

              if ((icon_name !== null) && (icon_name !== "cw_no_report_icon")) {
                current = this;
                return false;
              }
            }
          });

          // No observation data found that has an icon.
          if (current === null) {
            // Use observation data from second listing as it seems to be more reliable.
            if (data.getElementsByTagName("observation").length > 1) {
              current = data.getElementsByTagName("observation")[1];
            }
            // Use the first observation if there is only one.
            else {
              current = data.getElementsByTagName("observation")[0];
            }
          }

          // Current weather
          if (current && (params.layout !== "three-day")) {
            if (current.getAttribute("icon_name")) {
              loadImage(current.getAttribute("icon_name"), $(".current-icon"));
              $(".current-icon").attr("title", current.getAttribute("description"));
            }
            else {
              $(".current-icon").hide();
            }

            // Temperature
            $(".current-temp").html((params.unit === "celsius") ?
              convertTemp(current.getAttribute("temperature")) + "&#176;C" :
              convertTemp(current.getAttribute("temperature")) + "&#176;F");
          }

          // Description
          if (params.description === "custom") {
            $(".city").text(params.customDescription);
            hasCity = true;
          }
          else if (params.description === "service") {
            location = data.getElementsByTagName("location")[0];

            if (location) {
              place = location.getAttribute("city_name");

              if (location.getAttribute("state_name")) {
                place += ", " + location.getAttribute("state_name");
              }

              $(".city").text(place);
              hasCity = true;
            }
          }

          // Wind and humidity
          if (current) {
            if (params.showHumidity) {
              windDirection = i18n.t(current.getAttribute("wind_short"));

              if (!isNaN(current.getAttribute("humidity"))) {
                $(".humidity").text(i18n.t("humidity") + " " + current.getAttribute("humidity") + "%");
              }

              if (params.windSpeed === "mph") {
                if (current.getAttribute("wind_short") && current.getAttribute("wind_speed")) {
                  $(".wind").text(i18n.t("wind") + " " + windDirection + " " + i18n.t("at") + " " +
                    parseInt(current.getAttribute("wind_speed")) + " " + i18n.t("mph"), 10);
                }
              }
              else if (params.windSpeed === "kph") {
                if (current.getAttribute("wind_short") && current.getAttribute("wind_speed")) {
                  mph = parseInt(current.getAttribute("wind_speed"), 10);
                  kph = Math.round(mph * 1.609344);

                  $(".wind").text(i18n.t("wind") + " " + windDirection + " " + i18n.t("at") +
                    " " + kph + " " + i18n.t("kph"));
                }
              }

              hasHumidity = true;
            }
            else {
              $(".humidity-wind").hide();
            }
          }

          if (!hasCity && !hasHumidity) {
            $(".info").hide();
          }

          forecast = data.getElementsByTagName("forecast");

          // Forecasted weather
          if (forecast) {
            if (params.layout !== "current") {
              for (var i = 0; i < forecast.length; i++) {
                dayOfWeek = parseInt(forecast[i].getAttribute("day_of_week"), 10);

                if ((dayOfWeek === today)) {
                  forecasts[0] = forecast[i];
                }
                else if (dayOfWeek === tomorrow) {
                  forecasts[1] = forecast[i];
                }
                else if (dayOfWeek === nextDay) {
                  forecasts[2] = forecast[i];
                }
              }
            }

            // Images
            $(".icon").each(function(index) {
              if (forecasts[index].getAttribute("icon_name")) {
                loadImage(forecasts[index].getAttribute("icon_name"), $(this));
                $(this).attr("title", forecasts[index].getAttribute("description"));
              }
              else {
                $(this).hide();
              }
            });

            // Weekday
            $(".day-of-week").each(function(index) {
              $(this).html(i18n.t(forecasts[index].getAttribute("weekday").toLowerCase()));
            });

            // Temperature
            $(".temp").each(function(index) {
              $(this).html(convertTemp(forecasts[index].getAttribute("high_temp")) + "&#176; / " +
                convertTemp(forecasts[index].getAttribute("low_temp")) + "&#176;");
            });
          }

          setTimeout(function() {
            getWeather();
          }, refreshInterval);
        });
      }
    }
    else {
     retry();
    }

    if (isLoading) {
      isLoading = false;
      ready();
    }
  }

  function retry() {
    if (isLoading) {
      $(".container").hide();
      $(".error").text("Unable to retrieve weather data for that location.").show(); // TODO: Translate this.
    }

    setTimeout(function() {
      getWeather();
    }, errorInterval);
  }

  /* Load a weather image. */
  function loadImage(icon, $element) {
    var img = new Image(),
      url = "img/" + icon + ".png";

    img.onload = function() {
      $element.attr("src", url);
      onImageLoaded();
    };

    img.onerror = function() {
      console.log("Image " + icon + " not found on " + new Date() + " for " + $(".city").text());
      onImageLoaded();
    };

    img.src = url;
  }

  /* Event handler for when a weather image has been loaded. */
  function onImageLoaded() {
    imagesLoaded++;

    if (params.layout === "current") {
      if (imagesLoaded === 1) {
        $(document).trigger("dataPopulated");
      }
    }
    else if (params.layout === "three-day") {
      if (imagesLoaded === 3) {
        $(document).trigger("dataPopulated");
      }
    }
    else if (params.layout === "current-and-three-day") {
      if (imagesLoaded === 4) {
        $(document).trigger("dataPopulated");
      }
    }
    /* When using a custom layout, the number of images is unknown.
       The `dataPopulated` event will fire once per image. */
    else {
      $(document).trigger("dataPopulated");
    }
  }

  /* Unable to connect to the weather service. */
  function handleErrors(errors) {
    if (errors.length > 0) {
      console.log("Unable to connect to the weather service at " + new Date() +
        ". Please check your Internet connection.");

      // Keep trying to connect at a regular interval.
      setTimeout(function() {
        getWeather();
      }, errorInterval);
    }
  }

  /* Convert temperature to correct unit. */
  function convertTemp(temp) {
    if (params.unit === "celsius") {
      return parseInt(((temp - 32) * 5 / 9.0), 10);
    }
    // Default temperature is in Fahrenheit.
    else {
      return parseInt(temp, 10);
    }
  }

  function ready() {
    gadgets.rpc.call("", "rsevent_ready", null, prefs.getString("id"), true,
      true, true, true, true);
  }

  /*
   *  Public Methods
   */
  function setParams(names, values) {
    var address;

    if (Array.isArray(names) && names.length > 0 && names[0] === "additionalParams") {
      if (Array.isArray(values) && values.length > 0) {
        params = JSON.parse(values[0]);

        // Load fonts.
        var fontSettings = [
          {
            "class": "current-tmep",
            "fontSetting": params.currentTempFont
          },
          {
            "class": "forecast-temp",
            "fontSetting": params.forecastTempFont
          },
          {
            "class": "forecast-day",
            "fontSetting": params.forecastDayFont
          },
          {
            "class": "address",
            "fontSetting": params.addressFont
          },
          {
            "class": "humidity",
            "fontSetting": params.humidityFont
          }
        ];

        utils.loadFonts(fontSettings);
        document.body.style.background = params.background.color;

        if (!params.terms) {
          $(".container").hide();
          $(".error").text("You must check the Acceptance setting in order to use this Gadget.").show();
          ready();
        }

        //$container.height(prefs.getInt("rsH")); // Needed?
        getWeather();
      }
    }
    else if (Array.isArray(names) && names.length > 0 && names[0] === "displayAddress") {
      if (Array.isArray(values) && values.length > 0) {
        address = JSON.parse(values[0]);
      }
    }
  }

  return {
    "setParams": setParams
  };
})(gadgets, config, i18n);

/* global gadgets */
var RiseVision = RiseVision || {};
RiseVision.Weather = RiseVision.Weather || {};
RiseVision.Weather.Provider = {};

RiseVision.Weather.Provider = (function () {
  "use strict";

  /*
   *  Public Methods
   */
  function get(url, callbacks) {
    var params = {};

    params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.DOM;

    gadgets.io.makeRequest(url, function(resp) {
      if (resp && resp.data) {
        if (callbacks && callbacks.success && typeof(callbacks.success) === "function") {
          callbacks.success(resp.data);
        }
      }
      else if (resp && resp.errors) {
        if (callbacks && callbacks.error && typeof(callbacks.error) === "function") {
          callbacks.error(resp.errors);
        }
      }
    }, params);
  }

  return {
    "getWeather": get
  };
})();

var RiseVision = RiseVision || {};
RiseVision.Weather = RiseVision.Weather || {};

RiseVision.Weather.Geolocation = function(config) {
  "use strict";

  var errorInterval = 60000;

  /*
   *  Public Methods
   */

  /* Use geolocation to determine the location of the display. */
  function get(callbacks) {
    var weatherUrl = "";

    if (!!navigator.geolocation) {
      // This function will recover on its own if the Internet is disconnected.
      navigator.geolocation.getCurrentPosition(function(position) {
        weatherUrl = config.urlByLocation + "&lat=" + position.coords.latitude +
          "&lon=" + position.coords.longitude + "&dummy=" + Math.ceil(Math.random() * 100);

        RiseVision.Weather.Provider.getWeather(weatherUrl, {
          "success": function(data) {
            if (callbacks && callbacks.success && typeof(callbacks.success) === "function") {
              callbacks.success(data);
            }
          },
          "error": function(errors) {
            if (callbacks && callbacks.error && typeof(callbacks.error) === "function") {
              callbacks.error(errors);
            }
          }
        });
      }, function() {
        setTimeout(function() {
          get();
        }, errorInterval);

        console.log("Unable to obtain geolocation position.");
      });
    }
  }

  return {
    "getWeather": get
  };
};

var RiseVision = RiseVision || {};
RiseVision.Weather = RiseVision.Weather || {};

RiseVision.Weather.DisplayAddress = function(gadgets) {
  "use strict";

  var callbacks = null;

  /*
   *  Private Methods
   */
  function setParams(names, values) {
    var weatherUrl = "",
      address = "";

    if (Array.isArray(names) && names.length > 0 && names[0] === "displayAddress") {
      if (Array.isArray(values) && values.length > 0) {
        address = JSON.parse(values[0]);

        // Only need to use and show city and province.
        weatherUrl = weatherUrl + "&name=" + encodeURIComponent(address.city + "," + address.province) + "&dummy=" + Math.ceil(Math.random() * 100);
      }

      RiseVision.Weather.Provider.getWeather(weatherUrl, {
        "success": function(data) {
          if (callbacks && callbacks.success && typeof(callbacks.success) === "function") {
            callbacks.success(data);
          }
        },
        "error": function(errors) {
          if (callbacks && callbacks.error && typeof(callbacks.error) === "function") {
            callbacks.error(errors);
          }
        }
      });
    }
  }

  /*
   *  Public Methods
   */

  /* Make a call to the Rise Vision API to get the address of the display. */
  function get(cb) {
    var id = new gadgets.Prefs().getString("id");

    callbacks = cb;

    if (id && id !== "") {
      gadgets.rpc.register("rsparam_set_" + id, setParams);
      gadgets.rpc.call("", "rsparam_get", null, id, "displayAddress");
    }
  }

  return {
    "getWeather": get
  };
};

var RiseVision = RiseVision || {};
RiseVision.Weather = RiseVision.Weather || {};

RiseVision.Weather.CustomAddress = function(config) {
  "use strict";

  /*
   *  Public Methods
   */
  function get(address, callbacks) {
    var weatherUrl = "";

    if (address !== "") {
      weatherUrl = config.urlByName + "&name=" + encodeURIComponent(address) +
        "&dummy=" + Math.ceil(Math.random() * 100);

      RiseVision.Weather.Provider.getWeather(weatherUrl, {
        "success": function(data) {
          if (callbacks && callbacks.success && typeof(callbacks.success) === "function") {
            callbacks.success(data);
          }
        },
        "error": function(errors) {
          if (callbacks && callbacks.error && typeof(callbacks.error) === "function") {
            callbacks.error(errors);
          }
        }
      });
    }
  }

  return {
    "getWeather": get
  };
};

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

/* jshint ignore:start */
var _gaq = _gaq || [];

_gaq.push(['_setAccount', 'UA-41395348-5']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
/* jshint ignore:end */
