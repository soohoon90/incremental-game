var json = {
    "viz_type": "line",
    "datasource": "53__table",
    "is_sampled": true,
    "time_range_endpoints": [
      "inclusive",
      "exclusive"
    ],
    "timezone_selector": "Africa/Abidjan",
    "granularity_sqla": "requestdate",
    "time_grain_sqla": "P1D",
    "time_range": "2023-10-01T00:00:00 : DATEADD(DATETIME(\"now\"), -2, day)",
    "metrics": [ ],
    "adhoc_filters": [
      {
        "clause": "WHERE",
        "comparator": "page.smartsearch.as.suggestions",
        "expressionType": "SQL",
        "filterOptionName": "filter_pp86dtlhf3_xpqecdfxpy",
        "hasCustomLabel": false,
        "isExtra": false,
        "isNew": true,
        "isValidFlag": true,
        "label": "pagename = 'page.smartsearch.as.suggestions'+",
        "operator": "==",
        "operatorId": "EQUALS",
        "sqlExpression": "pagename = \"page.smartsearch.as.suggestions\"",
        "subject": "pagename",
        "subjectLabel": "pagename"
      }
    ],
    "groupby": [],
    "order_desc": true,
    "row_limit": 50000,
    "color_scheme": "supersetColors",
    "show_brush": "auto",
    "rich_tooltip": true,
    "line_interpolation": "linear",
    "bottom_margin": "auto",
    "x_ticks_layout": "auto",
    "x_axis_format": "smart_date",
    "left_margin": "auto",
    "y_axis_format": "SMART_NUMBER",
    "y_axis_bounds": [null, null],
    "rolling_type": "None",
    "comparison_type": "values",
    "annotation_layers": [],
    "sqlLab_metrics": [],
    "sqlLab_groupby": [],
    "extra_form_data": {}
  };
  
  
  const title = $("div > div > h1[class]").text();
  const url = window.location.href;
  const timestamps = $('text.timestamp').map(function() {
    const date = new Date($(this).text());
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T00:00:00`;
    return formattedDate;
  }).get();
  
  var timeRangeString = "2023-10-01T00:00:00 : DATEADD(DATETIME(\"now\"), -2, day)";
  if (timestamps.length == 3){
    timeRangeString = `${timestamps[1]} : ${timestamps[2]}`;
  }
  
  json.time_range = timeRangeString;
      
  var metricsJson;
  
  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  function jsonToURI(json){ return encodeURIComponent(JSON.stringify(json)); }
  
  var fragments = $('span > div > a').map(function() {
      var fragment = {
        "expressionType": "SQL",
        "column": null,
        "aggregate": null,
        "percentile": null,
        "featureName": null,
        "metricType": null,
        "calculationType": null,
        "metricCode": null,
        "isUpscale": null,
        "adhocFilters": null,
        "sqlExpression": "",
        "isNewSql": true,
        "isNew": false,
        "hasCustomLabel": true,
        "label": "",
        "optionName": ""
      };
  
      var flightname = $(this).text();
      
      fragment.sqlExpression = "COUNT_DISTINCT(IF(flight ILIKE \"%"+flightname+"%\", muid, NULL))";
      fragment.label = flightname;
      fragment.optionName = "metric_"+makeid(10);
  
      return fragment;
      
  }).get();
  
  json.metrics = fragments;
  
  const baseURL = "https://titanweb.microsoft.com/superset/explore/?form_data=";
  const jsonURLfragment = jsonToURI(json);
  
  const URL = baseURL+jsonURLfragment;
  
  console.log(URL);
  window.open(URL, '_blank').focus();