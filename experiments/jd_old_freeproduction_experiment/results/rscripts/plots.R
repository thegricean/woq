# created by jdegen, 04/30/2014

setwd('~/cogsci/projects/stanford/projects/woq/experiments/judiths_old_freeproduction_experiment/results/')
source('rscripts/helpers.R')
library(grid)

# load any or all of the following datasets:
load("data/md1.RData") # data with only minimal preprocessing; eg non-native subjects excluded (won't be very helpful)

alts = data.frame(Var1=character(),Freq=numeric(),TotalMarbles=numeric(),SetSize=numeric())

for (i in levels(as.factor(md1$TotalMarbles))) {
  for (p in levels(as.factor(md1$SetSize))) {
    newd = data.frame(table(unlist(strsplit(as.character(md1[md1$TotalMarbles == as.numeric(i) & md1$SetSize == as.numeric(p),]$Alternatives), "++", fixed=TRUE))))
    if (length(rownames(newd)) > 0)
    {
      newd$TotalMarbles=as.numeric(i)
      newd$SetSize=as.numeric(p)
      alts = rbind(alts,newd)
    }
    
  }
}

colnames(alts) = c("Alternative","Frequency","TotalMarbles","SetSize")
head(alts)

#normalize within alternative and total set size
normValue = ddply(alts, .(TotalMarbles,Alternative), summarize, normValue=Frequency/(sum(Frequency)),TotalMarbles=TotalMarbles,Alternative=Alternative,SetSize=SetSize,Frequency=Frequency)
row.names(normValue) = paste(normValue$Alternative,normValue$TotalMarbles,normValue$SetSize)
head(normValue)
alts$normValue = normValue[paste(alts$Alternative,alts$TotalMarbles,alts$SetSize),]$normValue

save(alts,file="data/alts.RData")

ggplot(alts, aes(x=SetSize,color=as.factor(TotalMarbles),y=normValue,group=as.factor(TotalMarbles))) +
  geom_point() +
  geom_line() +
  facet_wrap(~Alternative,scales="free_x") #+
#theme(axis.text.x=element_text(angle=45, vjust=0,hjust=1))
ggsave(file="graphs/allalts.pdf",width=14,height=7)

ggplot(alts, aes(x=SetSize)) +
  geom_histogram()
ggsave(file="graphs/setsizedist.pdf")

# proportion instead of absolute setsize
propalts = data.frame(Var1=character(),Freq=numeric(),TotalMarbles=numeric(),Proportion=numeric())

for (i in levels(as.factor(md1$TotalMarbles))) {
  for (p in levels(as.factor(md1$Proportion))) {
    newd = data.frame(table(unlist(strsplit(as.character(md1[md1$TotalMarbles == as.numeric(i) & md1$Proportion == as.numeric(p),]$Alternatives), "++", fixed=TRUE))))
    if (length(rownames(newd)) > 0)
    {
      newd$TotalMarbles=as.numeric(i)
      newd$Proportion=as.numeric(p)
      propalts = rbind(propalts,newd)
    }
    
  }
}

colnames(propalts) = c("Alternative","Frequency","TotalMarbles","Proportion")
head(propalts)

normValue = ddply(propalts, .(TotalMarbles,Alternative), summarize, normValue=Frequency/(sum(Frequency)),TotalMarbles=TotalMarbles,Alternative=Alternative,Proportion=Proportion,Frequency=Frequency)
row.names(normValue) = paste(normValue$Alternative,normValue$TotalMarbles,normValue$Proportion)
head(normValue)
propalts$normValue = normValue[paste(propalts$Alternative,propalts$TotalMarbles,propalts$Proportion),]$normValue

save(propalts,file="data/propalts.RData")

ggplot(propalts, aes(x=Proportion,color=as.factor(TotalMarbles),y=normValue,group=as.factor(TotalMarbles))) +
  geom_point() +
  geom_line() +
  facet_wrap(~Alternative) #+
#theme(axis.text.x=element_text(angle=45, vjust=0,hjust=1))
ggsave(file="graphs/allalts_prop.pdf",width=14,height=7)


ggplot(propalts, aes(x=Proportion)) +
  geom_histogram()
ggsave(file="graphs/proportiondist.pdf")

t = as.data.frame(table(propalts$Alternative))
t$Proportion = round(as.data.frame(prop.table(table(propalts$Alternative)))$Freq,3)
colnames(t) = c("Alternative","Frequency_exp","Proportion_exp")
t = t[ order(t[,c("Frequency_exp")],decreasing=T),]

write.table(t,file="data/alternatives.txt",col.names=T,quote=F,sep="\t",row.names=F)
