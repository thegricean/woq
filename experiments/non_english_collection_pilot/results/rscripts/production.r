theme_set(theme_bw(18))
setwd("d:/Dropbox/Tuebingen17SS/RA/woq/experiments/non_english_collection_pilot/results")
# setwd("~/Dropbox/Tuebingen17SS/RA/woq/experiments/1c/results")
# setwd("~/cogsci/projects/stanford/projects/woq/experiments/1c/results")
source("rscripts/helpers.r")

d1 = read.table(file="data/results-1.csv", sep=",", header=T)
d2 = read.table(file="data/results-2.csv", sep=",", header=T)
d3 = read.table(file="data/results-3.csv", sep=",", header=T)

# The problem is that the data format of d3 (when recording language information) is different from that of d1 and d2.
# I'll for now just use the data from d3 since that is where the explicit warning about "native language" was added.
# There were many invalid answers in d1 and d2 since many respondants just responded in English.
# Though there are still quite some invalid answers in d3... Hopefully Prolific can help deal with the issue.
# d = cbind(d1, d2, d3)

# Extract the quantifiers
# https://stackoverflow.com/questions/14249562/find-location-of-character-in-string 
d3$quantifier_begin_locations = sapply(d3$response, function(x) str_locate_all(x, pattern = "@")[[1]][1,1])
d3$quantifier_end_locations = sapply(d3$response, function(x) str_locate_all(x, pattern = "@")[[1]][2,1])
d3$quantifier = substr(d3$response, d3$quantifier_begin_locations + 1, d3$quantifier_end_locations - 1) %>% trimws %>% tolower

d3$Answer.native_language = gsub("\"", "", d3$Answer.native_language) %>% tolower 
# There was somebody who put "spanih" instead of "Spanish"
d3$Answer.native_language = gsub("spanih", "spanish", d3$Answer.native_language) %>% as.factor

# This should serve as a kind of guidance on using sentence frames on Prolific.
# Let me try with the Spanish version first.

spanish_data = d3 %>% filter(Answer.native_language == "spanish")

spanish_sorted = as.data.frame(sort(table(spanish_data$quantifier),decreasing=T))
# I got exactly 20 quantifiers but that's probably not enough? Let me run some experiments on Prolific to collect more quantifiers then.
spanish_sorted