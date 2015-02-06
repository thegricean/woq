# created by jdegen, 04/30/2014
# updated 02/04/2015

setwd('~/cogsci/projects/stanford/projects/woq/experiments/judiths_old_freeproduction_experiment/results/')
source('rscripts/helpers.R')
# 
#
d = read.csv("data/result.csv",sep="\t")
#d$Subject = as.factor(as.numeric(d$workerid))
#d$workerid=NULL

summary(d)
nrow(d)


levels(d$Answer.gender) = c(levels(d$Answer.gender),"female","male")
d$Answer.gender = gsub("\"","",as.character(d$Answer.gender))
d[as.character(d$Answer.gender) %in% c("femaile","woman","Female","FEMALE","Female.","fem","f","F"),]$Answer.gender = "female"
d[as.character(d$Answer.gender) %in% c("Male","MALE","m","M","Make"),]$Answer.gender = "male"
d$Answer.gender = as.factor(d$Answer.gender)
table(d$Answer.gender)
prop.table(table(d$Answer.gender))

d[as.character(d$Answer.comments) != "\"\"",c("Answer.comments","Answer.age","Answer.gender")]
table(d$Answer.language)
nrow(d)

ggplot(d, aes(x=Answer.age, fill=Answer.gender)) +
  geom_histogram()

save(d, file="data/d.RData")

# get production data in long form
prodd = d

prodd = reshapeProd(prodd)
head(prodd)
prodd$TotalMarbles = prodd$Answer.totalmarbles
table(prodd$TotalMarbles)

md1 = melt(prodd, id.vars=c("assignmentid","Answer.gender","Answer.age","TotalMarbles"),measure=sort(names(prodd))[93:103])
head(md1)
md1$Trial = gsub("Trial","",md1$variable)
md1$Trial = as.numeric(md1$Trial)
md1$Alternatives = sapply(strsplit(as.character(md1$value)," "), "[", 1)
md1$Alternatives = tolower(md1$Alternatives)
md1$SetSize = sapply(strsplit(as.character(md1$value)," "), "[",2)
md1$SetSize = as.numeric(md1$SetSize)
md1$Proportion = sapply(strsplit(as.character(md1$value)," "), "[",3)
md1$Proportion = as.numeric(md1$Proportion)
md1$TargetColor = sapply(strsplit(as.character(md1$value)," "), "[",4)
md1$TargetColor = as.factor(md1$TargetColor)
md1$OtherColor = sapply(strsplit(as.character(md1$value)," "), "[",4)
md1$OtherColor = as.factor(md1$OtherColor)

md1$Alternatives = gsub("%%","",md1$Alternatives)
summary(md1)
save(md1, file="data/md1.RData")

