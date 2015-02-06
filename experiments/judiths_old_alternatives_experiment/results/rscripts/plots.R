# created by jdegen, 10/14/2013

setwd('~/cogsci/projects/stanford/projects/woq/experiments/judiths_old_alternatives_experiment/results/')
source('rscripts/helpers.R')

# load any or all of the following datasets:
load("data/d.RData") # data with only minimal preprocessing; eg non-native subjects excluded (won't be very helpful)
load("data/md.RData") # data with first round of melting (won't be very helpful, all slider values of one trial per row)
load("data/omd.RData") # data like md, but with prevQuantifier variable added
load("data/mdd.RData") # data with second round of melting (one slider value per row)

length(unique(mdd$Subject)) # 650 participants

agr = aggregate(normValue ~ Quantifier + Slider, data=mdd, FUN=mean)
agr$CILow = aggregate(normValue ~ Quantifier + Slider, data=mdd, FUN=ci.low)$normValue
agr$CIHigh = aggregate(normValue ~ Quantifier + Slider, data=mdd,FUN=ci.high)$normValue
agr$YMin = agr$normValue - agr$CILow
agr$YMax = agr$normValue + agr$CIHigh
ggplot(agr, aes(x=Slider,y=normValue)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=0.25) +
  facet_wrap(~Quantifier)
ggsave(f="graphs/alldata_absolute_norm.pdf")


agr = aggregate(normValue ~ Quantifier + TargetMarbleProportion, data=mdd, FUN=mean)
agr$CILow = aggregate(normValue ~ Quantifier + TargetMarbleProportion, data=mdd, FUN=ci.low)$normValue
agr$CIHigh = aggregate(normValue ~ Quantifier + TargetMarbleProportion, data=mdd,FUN=ci.high)$normValue
agr$YMin = agr$normValue - agr$CILow
agr$YMax = agr$normValue + agr$CIHigh

ggplot(agr, aes(x=TargetMarbleProportion,y=normValue)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=0.05) +
  facet_wrap(~Quantifier)
ggsave(f="graphs/alldata_proportional_norm.pdf")


agr = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "some",], FUN=mean)
agr$CILow = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "some",], FUN=ci.low)$normValue
agr$CIHigh = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "some",],FUN=ci.high)$normValue
agr$YMin = agr$normValue - agr$CILow
agr$YMax = agr$normValue + agr$CIHigh

ggplot(agr, aes(x=Slider,y=normValue,color=prevQuantifier,group=prevQuantifier)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=0.25) +  
  geom_line() +
  scale_x_discrete(name="Number of target marbles",breaks=levels(agr$Slider),labels=c("0","1","2","3","4","5")) +
  facet_wrap(~Answer.nMarbles) +
  ggtitle("some") +
  theme(axis.text=element_text(size=15),axis.title=element_text(size=15),legend.text=element_text(size=15),legend.title=element_text(size=15))
ggsave(f="graphs/trial12_some_absolute_byprevquantifer_norm.pdf",width=12)


agr = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "several",], FUN=mean)
agr$CILow = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "several",], FUN=ci.low)$normValue
agr$CIHigh = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "several",],FUN=ci.high)$normValue
agr$YMin = agr$normValue - agr$CILow
agr$YMax = agr$normValue + agr$CIHigh

ggplot(agr, aes(x=Slider,y=normValue,color=prevQuantifier,group=prevQuantifier)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=0.25) +  
  geom_line() +
  scale_x_discrete(name="Number of target marbles",breaks=levels(agr$Slider),labels=c("0","1","2","3","4","5")) +
  facet_wrap(~Answer.nMarbles) +
  ggtitle("several") +
  theme(axis.text=element_text(size=15),axis.title=element_text(size=15),legend.text=element_text(size=15),legend.title=element_text(size=15))
ggsave(f="graphs/trial12_several_absolute_byprevquantifer_norm.pdf",width=12)


agr = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "all",], FUN=mean)
agr$CILow = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "all",], FUN=ci.low)$normValue
agr$CIHigh = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "all",],FUN=ci.high)$normValue
agr$YMin = agr$normValue - agr$CILow
agr$YMax = agr$normValue + agr$CIHigh

ggplot(agr, aes(x=Slider,y=normValue,color=prevQuantifier,group=prevQuantifier)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=0.25) +  
  geom_line() +
  scale_x_discrete(name="Number of target marbles",breaks=levels(agr$Slider),labels=c("0","1","2","3","4","5")) +
  facet_wrap(~Answer.nMarbles) +
  ggtitle("all") +
  theme(axis.text=element_text(size=15),axis.title=element_text(size=15),legend.text=element_text(size=15),legend.title=element_text(size=15))
ggsave(f="graphs/trial12_all_absolute_byprevquantifer_norm.pdf",width=12)


agr = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "most",], FUN=mean)
agr$CILow = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "most",], FUN=ci.low)$normValue
agr$CIHigh = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "most",],FUN=ci.high)$normValue
agr$YMin = agr$normValue - agr$CILow
agr$YMax = agr$normValue + agr$CIHigh

ggplot(agr, aes(x=Slider,y=normValue,color=prevQuantifier,group=prevQuantifier)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=0.25) +  
  geom_line() +
  scale_x_discrete(name="Number of target marbles",breaks=levels(agr$Slider),labels=c("0","1","2","3","4","5")) +
  facet_wrap(~Answer.nMarbles) +
  ggtitle("most") +
  theme(axis.text=element_text(size=15),axis.title=element_text(size=15),legend.text=element_text(size=15),legend.title=element_text(size=15))
ggsave(f="graphs/trial12_most_absolute_byprevquantifer_norm.pdf",width=12)


agr = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "three",], FUN=mean)
agr$CILow = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "three",], FUN=ci.low)$normValue
agr$CIHigh = aggregate(normValue ~ Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2 & mdd$Quantifier == "three",],FUN=ci.high)$normValue
agr$YMin = agr$normValue - agr$CILow
agr$YMax = agr$normValue + agr$CIHigh

ggplot(agr, aes(x=Slider,y=normValue,color=prevQuantifier,group=prevQuantifier)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=0.25) +  
  geom_line() +
  scale_x_discrete(name="Number of target marbles",breaks=levels(agr$Slider),labels=c("0","1","2","3","4","5")) +
  facet_wrap(~Answer.nMarbles) +
  ggtitle("three") +
  theme(axis.text=element_text(size=15),axis.title=element_text(size=15),legend.text=element_text(size=15),legend.title=element_text(size=15))
ggsave(f="graphs/trial12_three_absolute_byprevquantifer_norm.pdf",width=12)

##### plot 2nd-trial data by 1st-trial quantifier
agr = aggregate(normValue ~ Quantifier + Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2,], FUN=mean)
agr$CILow = aggregate(normValue ~ Quantifier + Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2,], FUN=ci.low)$normValue
agr$CIHigh = aggregate(normValue ~ Quantifier + Slider + prevQuantifier +Answer.nMarbles, data=mdd[mdd$Trial <= 2,],FUN=ci.high)$normValue
agr$YMin = agr$normValue - agr$CILow
agr$YMax = agr$normValue + agr$CIHigh

ggplot(agr, aes(x=Slider,y=normValue,color=prevQuantifier,group=prevQuantifier)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=0.25) +  
  geom_line() +
  scale_x_discrete(name="Number of target marbles",breaks=levels(agr$Slider),labels=c("0","1","2","3","4","5")) +
  facet_grid(Quantifier~Answer.nMarbles) +
  ggtitle("first vs. second trial data") +
  theme(axis.text=element_text(size=15),axis.title=element_text(size=15),legend.text=element_text(size=15),legend.title=element_text(size=15),legend.position="top")
ggsave(f="graphs/trial12_byprevquantifer_norm.pdf",width=12,height=16)

##### plot data by previous trial quantifier
agr = aggregate(normValue ~ Quantifier +Slider + prevQuantifier +Answer.nMarbles, data=mdd, FUN=mean)
agr$CILow = aggregate(normValue ~ Quantifier +Slider + prevQuantifier +Answer.nMarbles, data=mdd, FUN=ci.low)$normValue
agr$CIHigh = aggregate(normValue ~ Quantifier +Slider + prevQuantifier +Answer.nMarbles, data=mdd,FUN=ci.high)$normValue
agr$YMin = agr$normValue - agr$CILow
agr$YMax = agr$normValue + agr$CIHigh

ggplot(agr, aes(x=Slider,y=normValue,color=prevQuantifier,group=prevQuantifier)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=0.25) +  
  geom_line() +
  scale_x_discrete(name="Number of target marbles",breaks=levels(agr$Slider),labels=c("0","1","2","3","4","5")) +
  facet_grid(Quantifier~Answer.nMarbles) +
  ggtitle("all data (by previous quantifier)") +
  theme(axis.text=element_text(size=15),axis.title=element_text(size=15),legend.text=element_text(size=15),legend.title=element_text(size=15),legend.position="top")
ggsave(f="graphs/alltrials_byprevquantifer_norm.pdf",width=12,height=16)


