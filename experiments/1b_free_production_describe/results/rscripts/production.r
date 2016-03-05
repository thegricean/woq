theme_set(theme_bw(18))
setwd("/Users/titlis/cogsci/projects/stanford/projects/woq/experiments/1b_free_production_describe/results")
source("rscripts/helpers.r")

d = read.table(file="data/production.csv",sep=",", header=T)
head(d)
nrow(d)
summary(d)
totalnrow = nrow(d)
d$Trial = d$slide_number_in_experiment - 1
d$Half = as.factor(ifelse(d$Trial < 14, "first","second"))
length(unique(d$workerid))

# look at turker comments
unique(d$comments)

ggplot(d, aes(rt)) +
  geom_histogram() +
  scale_x_continuous(limits=c(0,50000))

ggplot(d, aes(log(rt))) +
  geom_histogram() 

summary(d$Answer.time_in_minutes)
ggplot(d, aes(Answer.time_in_minutes)) +
  geom_histogram()

ggplot(d, aes(gender)) +
  stat_count()

ggplot(d, aes(asses)) +
  stat_count()

ggplot(d, aes(age)) +
  geom_histogram()

ggplot(d, aes(education)) +
  geom_histogram()

ggplot(d, aes(language)) +
  stat_count()

ggplot(d, aes(languages)) +
  stat_count()

ggplot(d, aes(count)) +
  stat_count()

ggplot(d, aes(colorblind)) +
  stat_count()

ggplot(d, aes(enjoyment)) +
  geom_histogram()

d$response = tolower(d$response)
d$response1 = sapply(strsplit(as.character(d$response),", "), "[", 1)
d$response2 = sapply(strsplit(as.character(d$response),", "), "[", 2)
d$response1 = gsub("\\[u'","",as.character(d$response1))
d$response1 = as.factor(as.character(gsub("'","",as.character(d$response1))))
d$response2 = gsub("u'","",as.character(d$response2))
d$response2 = as.factor(as.character(gsub("'\\]","",as.character(d$response2))))

d$proportion = d$n_target/d$n_total
d$proportion_binned = cut(d$proportion,c(-.0001,.0001,.1,.2,.3,.4,.499,.501,.6,.7,.8,.9,.999,1))
summary(d)
table(d$proportion)
table(d$proportion_binned)

nums = d %>%
  select(proportion,proportion_binned) %>%
  group_by(proportion_binned) %>%
  summarise(Count=length(proportion))
nums = as.data.frame(nums)

ggplot(d, aes(x=proportion)) +
  geom_histogram(binwidth=.01) +
  facet_wrap(~proportion_binned) +
  geom_text(data=nums,aes(label=Count,x=.5,y=30))
ggsave("graphs/proportion_dist.pdf")

gathered = d %>% 
  select(response1,response2,proportion_binned,n_total) %>%
  gather(Order,Utterance,response1:response2,-proportion_binned,-n_total) 
head(gathered)
#gathered = as.factor(as.character(gathered))
#gathered = gathered[order(gathered[,c("Count")],decreasing=T),]
gathered$n_total = as.factor(as.character(gathered$n_total))

ggplot(gathered, aes(x=Utterance,fill=n_total)) +
  stat_count(position="dodge") +
  facet_wrap(~proportion_binned,scales="free_x") +
  theme(axis.text.x=element_text(angle=45,vjust=1,hjust=1))
ggsave("graphs/utterance_dist_bytotal.pdf",height=25,width=25)

ggplot(gathered, aes(x=Utterance)) +
  stat_count() +
  facet_wrap(~proportion_binned,scales="free_x") +
  theme(axis.text.x=element_text(angle=45,vjust=1,hjust=1))
ggsave("graphs/utterance_dist.pdf",height=25,width=25)

ggplot(gathered, aes(x=Utterance)) +
  stat_count() +
  facet_grid(n_total~proportion_binned,scales="free_x") +
  theme(axis.text.x=element_text(angle=45,vjust=1,hjust=1,size=6))
ggsave("graphs/utterance_dist_total.pdf",height=15,width=45)



































