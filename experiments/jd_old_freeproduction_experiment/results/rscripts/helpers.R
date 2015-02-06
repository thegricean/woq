
reshapeProd <- function(d)
{
  d$Trial1 = paste(d$Production0,d$SetSize0,d$Proportion0,d$TargetColor0,d$OtherColor0)
  d$Trial2 = paste(d$Production1,d$SetSize1,d$Proportion1,d$TargetColor1,d$OtherColor1)  
  d$Trial3 = paste(d$Production2,d$SetSize2,d$Proportion2,d$TargetColor2,d$OtherColor2)
  d$Trial4 = paste(d$Production3,d$SetSize3,d$Proportion3,d$TargetColor3,d$OtherColor3)
  d$Trial5 = paste(d$Production4,d$SetSize4,d$Proportion4,d$TargetColor4,d$OtherColor4)
  d$Trial6 = paste(d$Production5,d$SetSize5,d$Proportion5,d$TargetColor5,d$OtherColor5)  
  d$Trial7 = paste(d$Production6,d$SetSize6,d$Proportion6,d$TargetColor6,d$OtherColor6)
  d$Trial8 = paste(d$Production7,d$SetSize7,d$Proportion7,d$TargetColor7,d$OtherColor7)
  d$Trial9 = paste(d$Production8,d$SetSize8,d$Proportion8,d$TargetColor8,d$OtherColor8)
  d$Trial10 = paste(d$Production9,d$SetSize9,d$Proportion9,d$TargetColor9,d$OtherColor9) 
  d$Trial11 = paste(d$Production10,d$SetSize10,d$Proportion10,d$TargetColor10,d$OtherColor10)   
  return(d) 
}

getQUD <- function(qud) {
  #print(qud)
  if (length(grep("How many", qud)) > 0) {
    return("HowMany?")
  } else {
    if (length(grep("all", qud)) > 0) {
      return("All?")
    } else {
      if (length(grep("Are any", qud)) > 0) {
        return("Any?")
      } else {
        return("ERROR!")
      }
    }
  }
}

myCenter <- function(x) {
  if (is.numeric(x)) { return(x - mean(x)) }
  if (is.factor(x)) {
    x <- as.numeric(x)
    return(x - mean(x))
  }
  if (is.data.frame(x) || is.matrix(x)) {
    m <- matrix(nrow=nrow(x), ncol=ncol(x))
    colnames(m) <- paste("c", colnames(x), sep="")
    for (i in 1:ncol(x)) {
      if (is.factor(x[,i])) {
        y <- as.numeric(x[,i])
        m[,i] <- y - mean(y, na.rm=T)
      }
      if (is.numeric(x[,i])) {
        m[,i] <- x[,i] - mean(x[,i], na.rm=T)
      }
    }
    return(as.data.frame(m))
  }
}

se <- function(x)
{
  y <- x[!is.na(x)] # remove the missing values, if any
  sqrt(var(as.vector(y))/length(y))
}

zscore <- function(x){
  ## Returns z-scored values
  x.mean <- mean(x)
  x.sd <- sd(x)
  
  x.z <- (x-x.mean)/x.sd
  
  return(x.z)
}

zscoreByGroup <- function(x, groups){ 
  #Compute zscores within groups
  out <- rep(NA, length(x))
  
  for(i in unique(groups)){
    out[groups == i] <- zscore(x[groups == i])
  }
  return(out)
}

## for bootstrapping 95% confidence intervals
library(bootstrap)
theta <- function(x,xdata,na.rm=T) {mean(xdata[x],na.rm=na.rm)}
ci.low <- function(x,na.rm=T) {
  mean(x,na.rm=na.rm) - quantile(bootstrap(1:length(x),1000,theta,x,na.rm=na.rm)$thetastar,.025,na.rm=na.rm)}
ci.high <- function(x,na.rm=T) {
  quantile(bootstrap(1:length(x),1000,theta,x,na.rm=na.rm)$thetastar,.975,na.rm=na.rm) - mean(x,na.rm=na.rm)}