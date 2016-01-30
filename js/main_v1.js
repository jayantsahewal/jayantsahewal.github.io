/*
Charts for explanatory data analysis for Flights delay tends
Author: Jayant Sahewal
Date: 01/08/2016
Built using d3.js and Dimple.js
*/

// Variables
var svgLineMonth = dimple.newSvg("#AvgDelayByMonthContainer", 600, 400);

var svgLineYear = dimple.newSvg("#AvgDelayByYearContainer", 600, 400);

var svgLineDate = dimple.newSvg("#AvgDelayByDateContainer", 800, 400);

var svgHistDelay = dimple.newSvg("#AvgDelayByHourContainer", 600, 400);

var svgHistCount = dimple.newSvg("#hourNumberOfFlights", 600, 400);

var monthMap = {1:"Jan", 2:"Feb", 3:"March", 4:"Apr",
                5:"May", 6:"June", 7:"July", 8:"Ago",
                9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"};

var monthArray = ["Jan", "Feb", "March", "Apr", "May", "June", "July",
                  "Ago", "Sep", "Oct", "Nov", "Dec"];

var yearArray = ['2006', '2007', '2008'];

var dateArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
              '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23',
              '24','25', '26', '27', '28', '29', '30', '31'];

var hours = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
              '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

// Read the CSV file and create charts
d3.csv("data/flights-datetime.csv", function(flights) {

  // re-format the data for plotting
  flights.forEach(function(d, i) {
    var dateArray = d.DateTime.split("-");

    d.dt = new Date(dateArray[0], dateArray[1]-1, dateArray[2], dateArray[3]);

    d.index = i;

    d.Year = +d.dt.getFullYear();
    d.Month = +d.dt.getMonth();
    d.DayOfMonth = +d.dt.getDate();
    d.Time = +d.dt.getHours();
    d.DayOfWeek = +d.dt.getDay();
    d.TimeDay = d.DayOfWeek + "-" + d.Time;

    d.DepDelay = +d.DepDelay;
    d.Count = +d.count;
    d.DepDelayTotal = d.DepDelay * d.Count;

  });

  // filter data for valid dates
  flights = flights.filter(function(d) {
    if(isNaN(d.Time)){
        return false;
    }
    d.Time = parseInt(d.Time);
    return true;
  });

  /****************** group delay data by year starts ***********************/

  var flightsDelaysByYear = d3.nest()
                          .key(function(d) { return d.Year; })
                          .rollup(function(d) {
                            return {
                              Year: d3.mean(d, function(g) {
                                  return g.Year;
                                }),
                              DepDelay: d3.sum(d, function(g) { 
                                return g.DepDelayTotal; 
                              }) / 
                              d3.sum(d, function(g) { 
                                return g.Count; 
                              })
                            }
                          })
                          .entries(flights);


  //returns a list of objects containing values
  for (var i = 0; i < flightsDelaysByYear.length; i++){
    flightsDelaysByYear[i] = flightsDelaysByYear[i].values;
  }

  /****************** group delay data by year ends ***********************/

  /****************** group delay data by month starts ********************/

  var flightsDelaysByMonth = d3.nest()
                          .key(function(d) { return d.Month; })
                          .rollup(function(d) {
                            return {
                              Month: d3.mean(d, function(g) {
                                  return g.Month + 1;
                                }),
                              DepDelay: d3.sum(d, function(g) { 
                                return g.DepDelayTotal; 
                              }) / 
                              d3.sum(d, function(g) { return g.Count; })
                            }
                          })
                          .entries(flights);

  //returns a list of objects containing values
  for (var i = 0; i < flightsDelaysByMonth.length; i++){
    flightsDelaysByMonth[i] = flightsDelaysByMonth[i].values;
    flightsDelaysByMonth[i].MonthName = monthMap[flightsDelaysByMonth[i].Month];
  }

  /****************** group delay data by month ends *********************/
  
  /*************** group delay data by day of month starts ******************/
  
  var flightsDelaysByDate = d3.nest()
                          .key(function(d) { return d.DayOfMonth; })
                          .rollup(function(d) {
                            return {
                              DayOfMonth: d3.mean(d, function(g) {
                                  return g.DayOfMonth;
                                }),
                              DepDelay: d3.sum(d, function(g) { 
                                return g.DepDelayTotal; 
                              }) / 
                              d3.sum(d, function(g) { 
                                return g.Count; 
                              })
                            }
                          })
                          .entries(flights);

  //returns a list of objects containing values
  for (var i = 0; i < flightsDelaysByDate.length; i++){
    flightsDelaysByDate[i] = flightsDelaysByDate[i].values;
  }

  /***************** group delay data by day of month ends *****************/

  /****************** group delay data by hour starts ***********************/

  var flightsDelaysByHour = d3.nest()
                  .key(function(d) { return d.Time; })
                  .rollup(function(d) {
                            return {
                              Time: d3.mean(d, function(g) {
                                  return g.Time;
                                }),
                              DepDelay: d3.sum(d, function(g) { 
                                return g.DepDelayTotal; 
                              }) / 
                              d3.sum(d, function(g) { 
                                return g.Count; 
                              })
                            }
                          })
                  .entries(flights);

  //returns a list of objects containing values
  for (var i = 0; i < flightsDelaysByHour.length; i++){
    flightsDelaysByHour[i] = flightsDelaysByHour[i].values;
  }  

  /****************** group delay data by hour ends ***********************/

  /****************** group flights count by hour starts *********************/

  var flightsCountsByHour = d3.nest()
                  .key(function(d) { return d.Time; })
                  .rollup(function(d) {
                            return {
                              Time: d3.mean(d, function(g) {
                                  return g.Time;
                                }),
                              Count: d3.sum(d, function(g) { 
                                return g.Count; 
                              })
                            }
                          })
                  .entries(flights);

  //returns a list of objects containing values
  for (var i = 0; i < flightsCountsByHour.length; i++){
    flightsCountsByHour[i] = flightsCountsByHour[i].values;
  }  

  /****************** group flights count by hour ends ***********************/

  /****************** chart for delay data by year starts ********************/

  var lineChartYear = new dimple.chart(svgLineYear, flightsDelaysByYear);
  lineChartYear.setBounds(60, 30, 500, 300);
  var lineX = lineChartYear.addCategoryAxis("x", "Year");
  lineX.addOrderRule(yearArray);
  var lineY = lineChartYear.addMeasureAxis("y", "DepDelay");
  lineChartYear.addSeries(null, dimple.plot.line);
  var dots = lineChartYear.addSeries(null, dimple.plot.scatter);

  lineChartYear.draw();

  lineX.titleShape.text("Year");
  lineY.titleShape.text("Average departure delay time in minutes");

  // Change colors of months with average delay time geater than 10 minutes
  var lineFocusYear = d3.select("#AvgDelayByYearContainer")
                   .selectAll("circle")
                   .attr("fill", function(d) {
                        if (d.height > 10) {
                            return "#d53e5c";
                          }
                        else {
                          return "#00949f";
                          }
                     });

  // Improve tooltip's content for line chart.
  dots.getTooltipText = function (e) {
               return [
                   "" + Math.round(e.y) + " min",
               ];
           };

  /****************** chart for delay data by year ends ********************/

  /****************** chart for delay data by month starts ********************/

  var lineChartMonth = new dimple.chart(svgLineMonth, flightsDelaysByMonth);
  lineChartMonth.setBounds(60, 30, 500, 300);
  var lineX = lineChartMonth.addCategoryAxis("x", "MonthName");
  lineX.addOrderRule(monthArray);
  var lineY = lineChartMonth.addMeasureAxis("y", "DepDelay");
  lineChartMonth.addSeries(null, dimple.plot.line);
  var dots = lineChartMonth.addSeries(null, dimple.plot.scatter);

  lineChartMonth.draw();

  lineX.titleShape.text("Month of Year");
  lineY.titleShape.text("Average departure delay time in minutes");

  // Change colors of months with average delay time geater than 10 minutes
  var lineFocusMonth = d3.select("#AvgDelayByMonthContainer")
                   .selectAll("circle")
                   .attr("fill", function(d) {
                        if (d.height > 10) {
                            return "#d53e5c";
                          }
                        else {
                          return "#00949f";
                          }
                     });

  // Improve tooltip's content for line chart.
  dots.getTooltipText = function (e) {
               return [
                   "" + Math.round(e.y) + " min",
               ];
           };

  /****************** chart for delay data by month ends ********************/

  /****************** chart for delay data by date starts ********************/

  var lineChartDate = new dimple.chart(svgLineDate, flightsDelaysByDate);
  lineChartDate.setBounds(60, 30, 700, 300);
  var lineX = lineChartDate.addCategoryAxis("x", "DayOfMonth");
  lineX.addOrderRule(dateArray);
  var lineY = lineChartDate.addMeasureAxis("y", "DepDelay");
  lineChartDate.addSeries(null, dimple.plot.line);
  var dots = lineChartDate.addSeries(null, dimple.plot.scatter);

  lineChartDate.draw();

  lineX.titleShape.text("Date of Month");
  lineY.titleShape.text("Average departure delay time in minutes");

  // Change colors of months with average delay time geater than 10 minutes
  var lineFocusDate = d3.select("#AvgDelayByDateContainer")
                   .selectAll("circle")
                   .attr("fill", function(d) {
                        if (d.height > 10) {
                            return "#d53e5c";
                          }
                        else {
                          return "#00949f";
                          }
                     });

  // Improve tooltip's content
  dots.getTooltipText = function (e) {
               return [
                   "" + Math.round(e.y) + " min",
               ];
            };

  /****************** chart for delay data by date ends ********************/

  /****************** chart for delay data by hour starts ********************/

  var barDelay = new dimple.chart(svgHistDelay, flightsDelaysByHour);
  barDelay.setBounds(60, 30, 500, 300);
  var xDelay = barDelay.addCategoryAxis("x", "Time");
  xDelay.addOrderRule("Time");
  var yDelay = barDelay.addMeasureAxis("y", "DepDelay");
  var sDelay = barDelay.addSeries(null, dimple.plot.bar);
  sDelay.aggregate = dimple.aggregateMethod.avg;
  barDelay.draw();

  xDelay.titleShape.text("By hour of day (24-hour clock)");
  yDelay.titleShape.text("Average departure delay time in minutes");

  sDelay.getTooltipText = function (e) {
                return [
                    "" + Math.round(e.y) + " min",
                ];
            };

  // Change colors of months with average delay time geater than 45 minutes
  var barFocusDelay = d3.select("#AvgDelayByHourContainer")
                   .selectAll("rect")
                   .attr("fill", function(d) {
                        if (d.height > 45) {
                            return "#d53e5c";
                          }
                        else {
                          return "#00949f";
                          }
                     });

  /****************** chart for delay data by hour ends ********************/

  /***************** chart for flight counts by hour starts *******************/

  var barCount = new dimple.chart(svgHistCount, flightsCountsByHour);
  barCount.setBounds(60, 30, 500, 300);
  var xCount = barCount.addCategoryAxis("x", "Time");
  xCount.addOrderRule("Time");
  var yCount = barCount.addMeasureAxis("y", "Count");
  var sCount = barCount.addSeries(null, dimple.plot.bar);
  sCount.aggregate = dimple.aggregateMethod.avg;

  barCount.draw();

  xCount.titleShape.text("By hour of day (24-hour clock)");
  yCount.titleShape.text("Volume of flights");

  sCount.getTooltipText = function (e) {
               return [
                   "" + Math.round(e.y) + " flights",
               ];
           };

  // Change colors of months with flights counts less than 50,000
  var barFocusCount = d3.select("#hourNumberOfFlights")
                  .selectAll("rect")
                  .attr("fill", function(d) {
                       if (d.height < 100000) {
                           return "#d53e5c";
                         }
                       else {
                         return "#00949f";
                         }
                    });

  /***************** chart for flight counts by hour ends *******************/

});