# created by jdegen, 10/07/2013

setwd('~/cogsci/projects/stanford/projects/woq/experiments/judiths_old_alternatives_experiment/results/')
source('rscripts/helpers.R')
# 

d = read.csv("data/results.csv",sep="\t")
nrow(d)

d[d$Answer.comments != "",]$Answer.comments
table(d$Answer.language)

# exclude 11 people (1.5%) with non-native english
d = subset(d, !Answer.language  %in% c("\"Cantonese\"","\"chinese\"","\"Bengali\"","\"Croatian\"","\"german\"","\"Laotian\"","\"Romanian\"","\"Russian\"","\"spanish\"","\"Tagalog\""))
d = droplevels(d)
nrow(d)

dd = ddply(d, .(Subject), summarize, Time=head(assignmentsubmittime,1))
nrow(dd)
nrow(d)
row.names(dd) = as.character(dd$Subject)
d = subset(d, d$assignmentsubmittime == dd[as.character(d$Subject),]$Time)
nrow(d)

ggplot(d, aes(x=Answer.age)) +
  geom_histogram()

ggplot(d, aes(x=Answer.nMarbles)) +
  geom_histogram()
table(d$Answer.nMarbles)

table(d$Answer.quantifiers)
d$QOrder = as.factor(substr(d$Answer.quantifiers,2,13))
table(d$QOrder,d$Answer.nMarbles)
table(d$QOrder)

d$QFirst = as.factor(substr(d$Answer.quantifiers,2,6))
table(d$QFirst)
table(d$QFirst,d$Answer.nMarbles)

d <- reshapeData(d)
save(d, file="data/d.RData")
md <- melt(d, id.vars=c(sort(names(d))[2:8],"Subject"),measure=sort(names(d))[72:76]) 
md$Trial <- gsub("Trial","",md$variable)
md$Trial <- as.numeric(md$Trial)
md$Quantifier <- sapply(strsplit(as.character(md$value)," "), "[", 1)
md$Quantifier <- as.factor(md$Quantifier)
md$Slider0 <- sapply(strsplit(as.character(md$value)," "), "[",2)
md$Slider0 <- as.numeric(md$Slider0)
md$Slider1 <- sapply(strsplit(as.character(md$value)," "), "[",3)
md$Slider1 <- as.numeric(md$Slider1)
md$Slider2 <- sapply(strsplit(as.character(md$value)," "), "[",4)
md$Slider2 <- as.numeric(md$Slider2)
md$Slider3 <- sapply(strsplit(as.character(md$value)," "), "[",5)
md$Slider3 <- as.numeric(md$Slider3)
md$Slider4 <- sapply(strsplit(as.character(md$value)," "), "[",6)
md$Slider4 <- as.numeric(md$Slider4)
md$Slider5 <- sapply(strsplit(as.character(md$value)," "), "[",7)
md$Slider5 <- as.numeric(md$Slider5)
nrow(md)

save(md,file="data/md.RData")

omd = md[order(md$Subject),]
omd$prevQuantifier = c(NA,as.character(omd$Quantifier)[1:(length(omd$Quantifier)-1)])
omd[omd$Trial == 1,]$prevQuantifier = NA
omd$prevQuantifier = as.factor(as.character(omd$prevQuantifier))
tail(omd[,c("Subject","Trial","Quantifier","prevQuantifier")],20)
levels(omd$prevQuantifier) =  c(levels(omd$prevQuantifier),"first trial")
omd[omd$Trial == 1,]$prevQuantifier = "first trial"
tail(omd[,c("Subject","Trial","Quantifier","prevQuantifier")],20)

save(omd,file="data/omd.RData")

mdd = melt(omd, id.vars=c(sort(names(omd))[1:9],"Trial","Subject"),measure=sort(names(omd))[10:15],variable.name="Slider",value.name="SliderValue")
summary(mdd)
mdd$SliderValue = 1 - mdd$SliderValue
mdd$TargetMarbles = as.numeric(gsub("Slider","",as.character(mdd$Slider)))
mdd$TargetMarbleProportion = mdd$TargetMarbles / as.numeric(mdd$Answer.nMarbles)
mdd = mdd[mdd$TargetMarbleProportion <= 1,]
mdd = droplevels(mdd)
nrow(mdd)

# exclude people if it seems like they just randomly responded. criterion: if on "all" trials the max rating is not given for the unpartitioned set (pretty conservative)
# this excludes another 15 people (or 2% of the original dataset)
# plot the "all" data for everyone individually - there should be nobody for whom the maximum value is not the unpartitioned set (rightmost in the plot)
all = droplevels(mdd[mdd$Quantifier == "all",])
inds = ddply(all, "Subject", function(d) {
  return(data.frame(Subject=d$Subject,ind=d[match(max(d$SliderValue),d$SliderValue),]$TargetMarbleProportion))
})
inds = unique(inds)
bad = as.character(inds[inds$ind < 1,]$Subject)
ggplot(mdd[mdd$Quantifier == "all" & mdd$Subject %in% bad,], aes(x=TargetMarbleProportion,y=SliderValue)) +
  geom_point() +
  facet_wrap(~Subject)
nrow(mdd)
mdd = subset(mdd, ! as.character(Subject) %in% bad)
mdd = droplevels(mdd)
nrow(mdd)
length(levels(as.factor(mdd$Subject)))
# 650 participants left

mdd$prevQVaguePrecise = as.factor(ifelse(mdd$prevQuantifier %in% c("all","three"),"precise",ifelse(mdd$prevQuantifier == "first trial", "first trial","vague")))

# normalize each trial
normValue = ddply(mdd, .(Subject,Trial), summarize, normValue=SliderValue/(sum(SliderValue)),Subject=Subject,Trial=Trial,Slider=Slider,Quantifier=Quantifier)
row.names(normValue) = paste(normValue$Subject,normValue$Trial,normValue$Slider,normValue$Quantifier)
mdd$normValue = normValue[paste(mdd$Subject,mdd$Trial,mdd$Slider,mdd$Quantifier),]$normValue

# test: all sums should be 1
sums = ddply(mdd, .(Subject,Trial), summarize, sum(normValue))
summary(sums)
save(mdd,file="data/mdd.RData")

