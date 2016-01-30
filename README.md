# Data Visualization - RITA US Flight Delay dataset

## Summary

By looking at the [RITA US domestic flight delay dataset](http://stat-computing.org/dataexpo/2009/the-data.html) for 2006, 2007 and 2008, this visualization explores the relationship between **average flight departure delay** and different periods of time starting from different years till different hours of the day.

Why don't you browse first the [visualization](http://jayantsahewal.github.io/make-effective-data-visualization/) first? And, then come back to read the whole story behind the visualization.

## Design Approach

### Exploratory data analysis and cleansing in R
After downloading and unzipping the dataset from RITA for 2006, 2007, 2008, I realized that these files were huge (around 2 GB) and had a lot of information which I didn't need for my visualization. So, I used EDA.Rmd file to process and summarize the data after keeping the necessary information and save it in a new file flights-datetime.csv.

### Line Charts
After playing with data and different chart types I decided to go with line charts as first 4 charts in the visualization where x axis is time period (year, month of year, date of month and day of week) and y axis is average departure delay in minutes. I chose the line charts becuase these visualizations are related to time series data and line charts are amongst the best to visualize time series data. These line charts show that there is only a couple of minutes difference between the time periods with worst and best delays. Since the flight delay data was in the range of 0 to 16 minutes, I added a visual cue to make the data points red which were greater than 10 minutes in these charts. I added a tooltip message to show the amount of minutes to help the viewer.

### Bar Charts
I chose the bar chart as the main plot for its simplicity and effectiveness in communicating the message loud and clear. The first bar chart explores flight delays by hour of the day which showcases the main idea behind the visualization i.e. avoid booking flights between 11pm-3am. In this chart I added a visual cue to make the bars red which were having flight delays of more than 45 minutes. I chose to explore number of flights by hour of the day as the second bar chart because it visualizes the fact that despite lowest number of flight between 11pm and 3 am, they have the worst flight delays. In this chart I added a visual cue to make the bars red which were having number of flights less than 100,000.

## Feedback
While I was working on this visualization, I kept sending the screenshots of the local index.html to keep getting suggestions. I interviewed 3 persons - two colleagues and a friend of mine in persons to get their feedback once I thought I was done. Here is a gist of the same:

### Interview #1
I never thought of this but yes, this visualization shows that there is a correlation between time of the day and flight delays. I thought it will be either month (for example December since it has most holidays) or a day (for example Friday or Saturday). On this note, I don't see a graph which shows the relationship between delay and days. I think you should include it to make the flow continuous from time till years.

> Thats when I realized that week of the day is another important time period because a number of people choose flights by day of the week. So, after the first feedback I added another chart to show the relationship between day of the week and average departure delays.

### Interview #2
I can see that you are using charts to visualize the relationship between different time periods and departure delays. This is some RITA data you are talking about. Can you include a link or some description about the RITA. In the descriptions, I would suggest to make the figures bold which are pertaining to your story. I like your graphs by the way.

> Based upon the feedback I received I made some changes in the description to include a link and some description about RITA data. Also, I made some description wherever I thought the numbers needed some attention.

### Interview #3
Interesting visualization, I like how you have used different time periods to show their relationship with flight delays. Also, the hovering and red color for higher delays makes it really easy to understand. But you are starting directly with the main point i.e. from hour of the day till years. From my perspective, the intuition would be to start from a year and then drill down further. In BI as well, we start with summary data and drill down to go to detailed data.

> I gave it a lot of thought and asked around for more feedback on this. Few people said that yes, it would make sense to start with a bang!! but most people suggested to end with the main point. So, finally rearranged the graphs and added some description to keep the reader interested till the end. I included the message in the title so a reader knows what he is in for.

## Final thoughts
The overall feedback and the general consensus showed that the visualizations actually worked in highlighting the main point of the story which is worst delays are experienced in general between 11pm and 3 am despite the lowest number of flights.

## Resources
- [D3.JS Documentation](d3js.org)
- [Dimple.JS Documentation](http://dimplejs.org/)
- [Data Visualization and D3.js (Udacity)](https://www.udacity.com/course/viewer#!/c-ud507-nd)
- [Stack Overflow posts](http://stackoverflow.com/search?q=dimple.js)

## Data
- The original files came from 2006, 2007 and 2008 [RITA Dataset](http://stat-computing.org/dataexpo/2009/the-data.html)
- After processing using EDA.rmd, the summary file is saved in data/flights-datetime.csv