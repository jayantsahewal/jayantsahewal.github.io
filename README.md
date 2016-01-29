# Data Visualization - RITA US Flight Delay dataset

## Summary

By looking at the [RITA US domestic flight delay dataset](http://stat-computing.org/dataexpo/2009/the-data.html) for 2006, 2007 and 2008, this visualization explores the relationship between **average flight departure delay** and different periods of time starting from different years till different hours of the day.

Why don't you browse first the [visualization](http://jayantsahewal.github.io/make-effective-data-visualization/) first? And, then come back to read the whole story behind the visualization.

## Design

### Line Charts
After playing with data and different chart types I decided to go with line charts as first 4 charts in the visualization where x axis is time period (year, month of year, date of month and day of week) and y axis is average departure delay in minutes. I chose the line charts becuase these visualizations are related to time series data and line charts are amongst the best to visualize time series data. These line charts show that there is only a couple of minutes difference between the time periods with worst and best delays. Since the flight delay data was in the range of 0 to 16 minutes, I added a visual cue to make the data points red which were greater than 10 minutes in these charts.

### Bar Charts
I chose the bar chart as the main plot for its simplicity and effectiveness in communicating the message loud and clear. The first bar chart explores flight delays by hour of the day which showcases the main idea behind the visualization i.e. avoid booking flights between 11pm-3am.
I chose to explore number of flights by hour of the day because it visualizes the fact that despite lowest number of flight between 11pm and 3 am, they have the worst flight delays.