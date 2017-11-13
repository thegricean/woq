library(tidyverse)
library(reshape2)

theme_set(theme_bw(18))
setwd("~/Dropbox/Tuebingen17SS/RA/woq/experiments/binary_choice/results")
# setwd("~/cogsci/projects/stanford/projects/woq/experiments/binary_choice/results")
source("rscripts/helpers.r")

# First thing is to obtain some sort of obseration counts.

d = read.table(file="data/binary-choice-pilot-round-1.csv",sep=",", header=T)
d2 = read.table(file="data/binary-choice-pilot-round-2.csv",sep=",", header=T)
d3 = read.table(file="data/binary-choice-pilot-round-3.csv",sep=",", header=T)
d4 = read.table(file="data/binary-choice-pilot-round-4.csv",sep=",", header=T)

# look at turker comments
unique(d$comments)
unique(d2$comments)
unique(d3$comments)
unique(d4$comments)

epsilon = 0.05
# number_of_states: from 0 to 25
number_of_states = 26
# Because the upper bound cannot be lower than the lower bound, the pairs of (lower_bound, upper_bound) would be calculated in this way.
number_of_hypotheses = number_of_states * (number_of_states + 1) / 2

# We don't have any ground truth in real life.
# ground_truth = sapply(0:(number_of_states-1), function(i) ifelse(i <= 66 && i >= 33, 1-epsilon, epsilon))
# qplot(0:(number_of_states-1), ground_truth)

# Let me just extract the observations.
results = rbind(d[,c("n_target", "response", "target_quantifier")], d2[,c("n_target", "response", "target_quantifier")], d3[,c("n_target", "response", "target_quantifier")], d4[,c("n_target", "response", "target_quantifier")])

# Now I run the inference on the naive version.
# results = read.table(file="data/binary-choice-pilot-naive.csv",sep=",", header=T)

all_quantifiers = c(    "most",
                        "some",
                        "many",
                        "almost all",
                        "a few",
                        "all",
                        "half",
                        "few",
                        "less than half",
                        "a lot",
                        "none",
                        "several",
                        "the majority",
                        "about half",
                        "more than half",
                        "a majority",
                        "very few",
                        "a small amount",
                        "a couple",
                        "nearly all"
                        )

initialize_observations = function(num_states) {
  observations = matrix(0, nrow = 2, ncol = num_states)
  rownames(observations) = c("false", "true")
  colnames(observations) = 0:25
  observations
}

all_observations = rep(number_of_states, times = 20)
all_observations = lapply(all_observations, initialize_observations)
names(all_observations) = all_quantifiers

for(i in 1:nrow(results)) {
  result_row = results[i,]
  target_quantifier = as.character(result_row$target_quantifier)
  target_state = result_row$n_target
  # Don't forget to add 1 to the target_state here! The index starts from 1 but our number of dots starts from 0.
  all_observations[target_quantifier][[1]][result_row$response,target_state + 1] = all_observations[target_quantifier][[1]][result_row$response,target_state + 1] + 1
}

# helper function: returns likelihood of observations
# for an input matrix of observations
get_likelihood = function(observations, hypotheses) {
  likelihood = sapply(1:number_of_hypotheses, 
                      function(hyp) sum(sapply(1:number_of_states, 
                                               function(num) dbinom(x = observations[2, num], 
                                                                    size = sum(observations[,num]),
                                                                    prob = hypotheses[hyp, num], 
                                                                    log = T)))) %>% 
    exp()
  likelihood / sum(likelihood)
}

# helper function: returns entropy of belief given observations
get_entropy = function(observations, hypotheses) {
  likelihood = get_likelihood(observations, hypotheses)
  - sum(log(likelihood) * likelihood)
}

initialize_prob_trials = function(num_states) {
  rep(0, times = num_states)
}

# One hypothesis is a pair of natural numbers which denote the lower bound and upper bound of this quantifier.
initialize_hypothesis = function(number_of_states, epsilon, number_of_hypotheses) {
  hypotheses = matrix(epsilon, nrow = number_of_hypotheses, ncol = number_of_states)
  # Initialize the hypotheses space such that each hypothesis has its corresponding likelihood values set
  # One problem: This division of epsilon vs. 1 - epsilon still sounds a bit too abrupt and artificial. Maybe a somehow more sensible approach would be to center the probability at the center of the range, and decrease the probability gradually towards the two ends? Might definitely explore this probability I guess.
  hypothesis_index = 0
  for (lower_bound in 1:number_of_states) {
    for (upper_bound in lower_bound:number_of_states) {
      hypothesis_index = hypothesis_index + 1
      hypotheses[hypothesis_index, lower_bound:upper_bound] = 1 - epsilon
    }
  }
  hypotheses
}

entropy_opt = 0
prob_trials = rep(number_of_states, times = 20)
prob_trials = lapply(prob_trials, initialize_prob_trials)
names(prob_trials) = all_quantifiers

current_beliefs = rep(number_of_states, times = 20)
current_beliefs = lapply(current_beliefs, initialize_prob_trials)
names(current_beliefs) = all_quantifiers

# In this way we can have different hypotheses for different quantifiers. Though currently we're using the same set set set hypothesis for all of them.
all_hypotheses = rep(number_of_states, times = 20)
all_hypotheses = lapply(all_hypotheses, initialize_hypothesis, epsilon = epsilon, number_of_hypotheses = number_of_hypotheses)
names(all_hypotheses) = all_quantifiers

# For each quantifier
for (q_index in 1:length(all_quantifiers)) {
  # Participants' responses
  current_quantifier = all_quantifiers[q_index]
  # Seems that I had to include [[1]] so that I get the actual matrix.
  observations = all_observations[current_quantifier][[1]]
  hypotheses = all_hypotheses[current_quantifier][[1]]
  
  # to store expected entropy difference in
  entropy_diff_expected = 0 
  # what do we currently believe about our hypotheses
  lh_tmp = get_likelihood(observations, hypotheses)
  current_beliefs[current_quantifier][[1]] = lh_tmp
  entropy_tmp = - sum(log(lh_tmp) * lh_tmp)
  # sample an experimental trial
  for (i in 1:number_of_states) {
    # what happens if we run trial i?
    # we could observe a true or false judgement
    obs_tmp_false = observations
    obs_tmp_true = observations
    obs_tmp_false[1,i] = obs_tmp_false[1,i] + 1
    obs_tmp_true[2,i] = obs_tmp_true[2,i] + 1
    # how likely do we think a "true" answer for trial i is?
    lh_hypothetical_true = sum(lh_tmp * hypotheses[,i])
    # what's the entropy difference after observations in trial i?
    entropy_diff_false = abs(entropy_tmp - get_entropy(obs_tmp_false, hypotheses))
    entropy_diff_true  = abs(entropy_tmp - get_entropy(obs_tmp_true, hypotheses))
    # calculate expected entropy difference
    entropy_diff_expected[i] = (1-lh_hypothetical_true) * entropy_diff_false + 
      lh_hypothetical_true * entropy_diff_true
  }
    
  # Now we get the probabilities to generate the next set of trials. But then what about examining the probability distribution about the quantifier itself?
  prob_trial = exp(5*entropy_diff_expected) / sum(exp(5*entropy_diff_expected))
  # Now we don't need to generate the trial right now. We only provide a probability distribution for the generation of trials online.
  # trial = sample(1:number_of_states, size = 1, prob = prob_trial)
  prob_trials[current_quantifier][[1]] = prob_trial
  # There is only one round of experiment, so no need to further sub-index this thing.
  entropy_opt = get_entropy(observations, hypotheses)
  # show(mean(entropy_opt))
}

show(prob_trials)

# I'll need to find a way to output the prob_trials to a format that will be easy for JS to parse.
# Just find a way to output it to JSON then.
jsonlite::write_json(prob_trials, "../prob_trials_for_round_5.json")

# This is the function to visualize our current belief for one quantifier.
# We want to plot the marginal probability of each state being the lower bound/the upper bound for each quantifier.
# For each state, we'll iterate through all the hypotheses, find the hypotheses whose lower bound is this state, and add up their probabilities.
# We can use two colors to represent lower/upper bounds, respectively.
visualize_belief = function(current_belief, num_states, current_quantifier) {
  acc_probs_lower_bound =  rep(0, times = num_states)
  acc_probs_upper_bound =  rep(0, times = num_states)
  hypothesis_index = 0
  for (lower_bound in 1:number_of_states) {
    for (upper_bound in lower_bound:number_of_states) {
      # This hypothesis_index should correspond to the probs stored in the variable current_belief.
      hypothesis_index = hypothesis_index + 1
      acc_probs_lower_bound[lower_bound] = acc_probs_lower_bound[lower_bound] + current_belief[hypothesis_index]
      acc_probs_upper_bound[upper_bound] = acc_probs_upper_bound[upper_bound] + current_belief[hypothesis_index]
    }
  }
  acc_probs_lower_bound = acc_probs_lower_bound / sum(acc_probs_lower_bound)
  acc_probs_upper_bound = acc_probs_upper_bound / sum(acc_probs_upper_bound)
  
  # This is all very convoluted just to plot them with geom_col... There is definitely an easier way to go about it?
  acc_probs = cbind(acc_probs_lower_bound, acc_probs_upper_bound)
  acc_probs = rownames_to_column(data.frame(acc_probs), var = "state")
  # Minus one because our bounds start from 0
  acc_probs$state = as.numeric(acc_probs$state) - 1
  acc_probs = melt(acc_probs, id.vars = 'state')
  p = ggplot(acc_probs, aes(x=state, y=value, fill=variable)) + geom_col(position = 'dodge') + guides(fill=FALSE) + ggtitle(current_quantifier) + scale_x_continuous(breaks=acc_probs$state)
  p
}

# I gave up trying to put several graphs on the same page. Freely controlling how many graphs to put on one page seems insanely hard in ggplot/R land...
visualize_beliefs = function(current_beliefs, num_states) {
  pdf("graphs/beliefs.pdf")
  # pdf("graphs/beliefs-naive.pdf")
  for (quantifier in names(current_beliefs)) {
    p = visualize_belief(current_beliefs[[quantifier]], num_states, quantifier)
    print(p)
  }
  
  dev.off()
}

# Examine our current beliefs
visualize_beliefs(current_beliefs, number_of_states)