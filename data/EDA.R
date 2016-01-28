library(dplyr)

hour <- function(x) { 
  return(substr(x, 0, nchar(x)-2)); 
}

df <- read.csv('2006.csv')
df["Time"] <- lapply(df["DepTime"], hour)
df <- mutate(df, DateTime = paste(Year, Month, DayofMonth, Time, sep="-"))
grouped <- group_by(df, DateTime)
summed_2006 <- summarise(grouped,count=n(), DepDelay=mean(DepDelay, na.rm=TRUE))

df <- read.csv('2007.csv')
df["Time"] <- lapply(df["DepTime"], hour)
df <- mutate(df, DateTime = paste(Year, Month, DayofMonth, Time, sep="-"))
grouped <- group_by(df, DateTime)
summed_2007 <- summarise(grouped,count=n(), DepDelay=mean(DepDelay, na.rm=TRUE))

df <- read.csv('2008.csv')
df["Time"] <- lapply(df["DepTime"], hour)
df <- mutate(df, DateTime = paste(Year, Month, DayofMonth, Time, sep="-"))
grouped <- group_by(df, DateTime)
summed_2008 <- summarise(grouped,count=n(), DepDelay=mean(DepDelay, na.rm=TRUE))

length(rbind(summed_2006, summed_2007, summed_2008))

summary(rbind(summed_2006, summed_2007, summed_2008))

write.csv(rbind(summed_2006, summed_2007, summed_2008), "flights-datetime.csv")

csv <- read.csv('flights-datetime.csv')

head(csv)

csv1 <- read.csv('2008-DateTime.csv')

head