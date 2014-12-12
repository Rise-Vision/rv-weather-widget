(function(window) {

  "use strict";

  window.gadget = window.gadget || {};

  window.gadget.settings = {
    "params": {
    },
    "additionalParams": {
      "terms": false,
      "layout": "current",
      "layoutUrl": "",
      "currentTempFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "60",
        "bold": true,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "forecastTempFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "20",
        "bold": false,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "forecastDayFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "20",
        "bold": true,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "address": "geolocation",
      "customAddress": "",
      "description": "service",
      "customDescription": "",
      "addressFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "24",
        "bold": true,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "showHumidity": true,
      "windSpeed": "kph",
      "humidityFont": {
        "font": {
          "family": "Verdana"
        },
        "size": "20",
        "bold": false,
        "italic": false,
        "underline": false,
        "color": "black",
        "highlightColor": "transparent"
      },
      "unit": "celsius",
      "background": {
        "color": "transparent"
      }
    }
  };
})(window);

// return '<?xml version="1.0" encoding="UTF-8"?>
//   <report gmt_date="2112122014" unix_date="1418418344.000000" timezone="-5" state="ON" state_name="Ontario" country="CA" iso_cc="CA" country_name="Canada" localtime="Fri, 12 Dec 2014 16:13:28 EST" localupdatetime="Fri, 12 Dec 2014 16:05:44 EST" metric="false" city_name="Glen Eden Ski Area" longitude="-79.88" latitude="43.51" tzinfo="America/Toronto" elevation="196.84" name="current_conditions" >
//   <observation city="CWWB" city_name="Burlington Piers" location="Burlington Piers" latitude="43.2900" longitude="-79.7900" elevation="74.84" state="ON" state_name="Ontario" country="CA" iso_cc="CA" country_name="Canada" daylight="D" sky_desc="*" sky="" precip_desc="*" precip="" temp_desc="5" temp="Quite cool" air_desc="*" air="" description="Quite cool." temperature="41.70" wind_speed="11.49" wind_dir="290" wind_short="W" wind_long="West" humidity="53" dew_point="25.70" comfort="35.13" baro_pressure="30.09" baro_tendency="*" barometer="" visibility="*" icon="cw_no_report_icon" icon_name="cw_no_report_icon" iso8601="2014-12-12T15:00:00.00-05:00" />
//   <observation city="CYYZ" city_name="Toronto" location="Toronto Pearson International Airport" latitude="43.6600" longitude="-79.6300" elevation="151.84" state="ON" state_name="Ontario" country="CA" iso_cc="CA" country_name="Canada" daylight="D" sky_desc="14" sky="Partly sunny" precip_desc="*" precip="" temp_desc="4" temp="Chilly" air_desc="*" air="" description="Partly sunny. Chilly." temperature="35.60" wind_speed="11.49" wind_dir="320" wind_short="NW" wind_long="Northwest" humidity="44" dew_point="15.80" comfort="27.48" baro_pressure="30.09" baro_tendency="*" barometer="" visibility="15.00" icon="6" icon_name="mostly_cloudy" iso8601="2014-12-12T15:00:00.00-05:00" />
//   <observation city="CYHM" city_name="Hamilton Airport" location="Hamilton Airport" latitude="43.1600" longitude="-79.9300" elevation="228.77" state="ON" state_name="Ontario" country="CA" iso_cc="CA" country_name="Canada" daylight="D" sky_desc="15" sky="Broken clouds" precip_desc="*" precip="" temp_desc="4" temp="Chilly" air_desc="*" air="" description="Broken clouds. Chilly." temperature="39.20" wind_speed="16.09" wind_dir="280" wind_short="W" wind_long="West" humidity="56" dew_point="24.80" comfort="30.43" baro_pressure="30.11" baro_tendency="*" barometer="" visibility="8.00" icon="6" icon_name="mostly_cloudy" iso8601="2014-12-12T15:00:00.00-05:00" />
//   <observation city="CYKF" city_name="Waterloo Well" location="Waterloo Well" latitude="43.4600" longitude="-80.3800" elevation="315.00" state="ON" state_name="Ontario" country="CA" iso_cc="CA" country_name="Canada" daylight="D" sky_desc="18" sky="Overcast" precip_desc="*" precip="" temp_desc="4" temp="Chilly" air_desc="*" air="" description="Overcast. Chilly." temperature="35.60" wind_speed="17.24" wind_dir="290" wind_short="W" wind_long="West" humidity="75" dew_point="28.40" comfort="25.45" baro_pressure="30.11" baro_tendency="*" barometer="" visibility="9.00" icon="7" icon_name="cloudy" iso8601="2014-12-12T15:00:00.00-05:00" />
//   <observation city="CYTZ" city_name="Toronto Island Airport" location="Toronto Island Airport" latitude="43.6300" longitude="-79.4000" elevation="74.84" state="ON" state_name="Ontario" country="CA" iso_cc="CA" country_name="Canada" daylight="D" sky_desc="1" sky="Sunny" precip_desc="*" precip="" temp_desc="4" temp="Chilly" air_desc="*" air="" description="Sunny. Chilly." temperature="37.40" wind_speed="9.19" wind_dir="280" wind_short="W" wind_long="West" humidity="52" dew_point="21.20" comfort="30.76" baro_pressure="30.09" baro_tendency="*" barometer="" visibility="9.00" icon="1" icon_name="sunny" iso8601="2014-12-12T15:00:00.00-05:00" />
//   <observation city="CYKZ" city_name="Toronto Buttonville" location="Toronto Buttonville" latitude="43.8600" longitude="-79.3600" elevation="197.84" state="ON" state_name="Ontario" country="CA" iso_cc="CA" country_name="Canada" daylight="D" sky_desc="9" sky="Scattered clouds" precip_desc="*" precip="" temp_desc="4" temp="Chilly" air_desc="*" air="" description="Scattered clouds. Chilly." temperature="35.60" wind_speed="10.34" wind_dir="320" wind_short="NW" wind_long="Northwest" humidity="65" dew_point="24.80" comfort="27.99" baro_pressure="30.08" baro_tendency="*" barometer="" visibility="15.00" icon="2" icon_name="mostly_sunny" iso8601="2014-12-12T15:00:00.00-05:00" />
//   <observation city="CWWZ" city_name="Port Weller" location="Port Weller" latitude="43.2500" longitude="-79.2100" elevation="74.84" state="ON" state_name="Ontario" country="CA" iso_cc="CA" country_name="Canada" daylight="D" sky_desc="*" sky="" precip_desc="*" precip="" temp_desc="4" temp="Chilly" air_desc="*" air="" description="Chilly." temperature="38.50" wind_speed="2.30" wind_dir="240" wind_short="SW" wind_long="Southwest" humidity="55" dew_point="23.40" comfort="38.50" baro_pressure="30.09" baro_tendency="*" barometer="" visibility="*" icon="cw_no_report_icon" icon_name="cw_no_report_icon" iso8601="2014-12-12T15:00:00.00-05:00" />
//   <observation city="CYSN" city_name="Saint Catharines Airport" location="Saint Catharines Airport" latitude="43.2000" longitude="-79.1600" elevation="90.84" state="ON" state_name="Ontario" country="CA" iso_cc="CA" country_name="Canada" daylight="D" sky_desc="7" sky="Passing clouds" precip_desc="*" precip="" temp_desc="4" temp="Chilly" air_desc="*" air="" description="Passing clouds. Chilly." temperature="35.60" wind_speed="8.04" wind_dir="240" wind_short="SW" wind_long="Southwest" humidity="56" dew_point="21.20" comfort="29.16" baro_pressure="30.10" baro_tendency="*" barometer="" visibility="15.00" icon="2" icon_name="mostly_sunny" iso8601="2014-12-12T15:00:00.00-05:00" />
//   <location city="GLENE" city_name="Glen Eden Ski Area" latitude="43.51" longitude="-79.88" location="Glen Eden Ski Area" state="ON" state_name="Ontario" country="CA" iso_cc="CA" country_name="Canada" distance="12.34">
//   <forecast day_sequence="1" day_of_week="7" weekday="Saturday" daylight="D" date="121314" iso8601="2014-12-13T00:00:00.00-05:00" high_temp="36.86" low_temp="32.72" sky_desc="8" sky="More sun than clouds" precip_desc="*" precip="" temp_desc="6" temp="Cool" air_desc="*" air="" description="More sun than clouds. Cool." uv_index="0" uv="Minimal" wind_speed="9.95" wind_dir="264" wind_short="W" wind_long="West" humidity="78" dew_point="29.46" comfort="28.49" rainfall="*" snowfall="*" precip_prob="0" icon="2" icon_name="mostly_sunny" beaufort="3" beaufort_desc="Gentle breeze" baro_pressure="29.97" />
//   <forecast day_sequence="2" day_of_week="1" weekday="Sunday" daylight="D" date="121414" iso8601="2014-12-14T00:00:00.00-05:00" high_temp="39.02" low_temp="34.70" sky_desc="8" sky="More sun than clouds" precip_desc="*" precip="" temp_desc="6" temp="Cool" air_desc="*" air="" description="More sun than clouds. Cool." uv_index="0" uv="Minimal" wind_speed="8.29" wind_dir="279" wind_short="W" wind_long="West" humidity="79" dew_point="31.89" comfort="31.89" rainfall="*" snowfall="*" precip_prob="10" icon="2" icon_name="mostly_sunny" beaufort="3" beaufort_desc="Gentle breeze" baro_pressure="29.91" />
//   <forecast day_sequence="3" day_of_week="2" weekday="Monday" daylight="D" date="121514" iso8601="2014-12-15T00:00:00.00-05:00" high_temp="41.72" low_temp="34.16" sky_desc="8" sky="More sun than clouds" precip_desc="*" precip="" temp_desc="6" temp="Cool" air_desc="*" air="" description="More sun than clouds. Cool." uv_index="0" uv="Minimal" wind_speed="3.76" wind_dir="197" wind_short="S" wind_long="South" humidity="89" dew_point="36.50" comfort="36.81" rainfall="*" snowfall="*" precip_prob="10" icon="2" icon_name="mostly_sunny" beaufort="1" beaufort_desc="Light air" baro_pressure="29.94" />
//   <forecast day_sequence="4" day_of_week="3" weekday="Tuesday" daylight="D" date="121614" iso8601="2014-12-16T00:00:00.00-05:00" high_temp="41.54" low_temp="39.02" sky_desc="16" sky="Mostly cloudy" precip_desc="3" precip="Scattered showers" temp_desc="6" temp="Cool" air_desc="*" air="" description="Scattered showers. Mostly cloudy. Cool." uv_index="0" uv="Minimal" wind_speed="5.26" wind_dir="146" wind_short="SE" wind_long="Southeast" humidity="89" dew_point="37.96" comfort="37.56" rainfall="0.20" snowfall="*" precip_prob="50" icon="33" icon_name="showers" beaufort="2" beaufort_desc="Light breeze" baro_pressure="29.74" />
//   <forecast day_sequence="5" day_of_week="4" weekday="Wednesday" daylight="D" date="121714" iso8601="2014-12-17T00:00:00.00-05:00" high_temp="41.18" low_temp="36.32" sky_desc="16" sky="Mostly cloudy" precip_desc="*" precip="" temp_desc="6" temp="Cool" air_desc="*" air="" description="Mostly cloudy. Cool." uv_index="0" uv="Minimal" wind_speed="12.78" wind_dir="264" wind_short="W" wind_long="West" humidity="77" dew_point="33.44" comfort="32.85" rainfall="*" snowfall="*" precip_prob="33" icon="6" icon_name="mostly_cloudy" beaufort="4" beaufort_desc="Moderate breeze" baro_pressure="29.88" />
//   <forecast day_sequence="6" day_of_week="5" weekday="Thursday" daylight="D" date="121814" iso8601="2014-12-18T00:00:00.00-05:00" high_temp="39.02" low_temp="32.18" sky_desc="32" sky="Morning clouds" precip_desc="*" precip="" temp_desc="6" temp="Cool" air_desc="*" air="" description="Morning clouds. Cool." uv_index="0" uv="Minimal" wind_speed="6.89" wind_dir="292" wind_short="W" wind_long="West" humidity="73" dew_point="30.07" comfort="32.76" rainfall="*" snowfall="*" precip_prob="0" icon="4" icon_name="partly_cloudy" beaufort="3" beaufort_desc="Gentle breeze" baro_pressure="30.27" />
//   <forecast day_sequence="7" day_of_week="6" weekday="Friday" daylight="D" date="121914" iso8601="2014-12-19T00:00:00.00-05:00" high_temp="37.94" low_temp="32.18" sky_desc="14" sky="Partly sunny" precip_desc="*" precip="" temp_desc="6" temp="Cool" air_desc="*" air="" description="Partly sunny. Cool." uv_index="0" uv="Minimal" wind_speed="6.57" wind_dir="104" wind_short="E" wind_long="East" humidity="79" dew_point="30.94" comfort="31.66" rainfall="*" snowfall="*" precip_prob="5" icon="6" icon_name="mostly_cloudy" beaufort="2" beaufort_desc="Light breeze" baro_pressure="30.24" />
//   </location>
//   </report>';
