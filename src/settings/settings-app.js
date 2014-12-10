angular.module("risevision.widget.weather.settings", [
  "risevision.widget.weather.config",
  "risevision.widget.common",
  "risevision.widget.common.translate",
  "risevision.widget.common.tooltip",
  "risevision.widget.common.widget-button-toolbar",
  "risevision.widget.common.url-field",
  "risevision.widget.common.font-setting",
  "risevision.widget.common.background-setting"
]);

angular.module("risevision.widget.common.translate", ["pascalprecht.translate"])
  .config(["$translateProvider", function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: "locales/",
      suffix: "/translation.json"
    });

    $translateProvider.determinePreferredLanguage();

    if($translateProvider.preferredLanguage().indexOf("en_") === 0){
      //default to "en" on any of the English variants
      $translateProvider.preferredLanguage("en");
    }
  }]);
