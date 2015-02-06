reshapeData <- function(d)
{
  d$Trial1 = paste(d$Quantifier1,d$Slider10,d$Slider11,d$Slider12,d$Slider13,d$Slider14,d$Slider15)
  d$Trial2 = paste(d$Quantifier2,d$Slider20,d$Slider21,d$Slider22,d$Slider23,d$Slider24,d$Slider25)
  d$Trial3 = paste(d$Quantifier3,d$Slider30,d$Slider31,d$Slider32,d$Slider33,d$Slider34,d$Slider35)
  d$Trial4 = paste(d$Quantifier4,d$Slider40,d$Slider41,d$Slider42,d$Slider43,d$Slider44,d$Slider45)
  d$Trial5 = paste(d$Quantifier5,d$Slider50,d$Slider51,d$Slider52,d$Slider53,d$Slider54,d$Slider55)
  return(d) 
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

library(bootstrap)
theta <- function(x,xdata,na.rm=T) {mean(xdata[x],na.rm=na.rm)}
ci.low <- function(x,na.rm=T) {
  mean(x,na.rm=na.rm) - quantile(bootstrap(1:length(x),1000,theta,x,na.rm=na.rm)$thetastar,.025,na.rm=na.rm)}
ci.high <- function(x,na.rm=T) {
  quantile(bootstrap(1:length(x),1000,theta,x,na.rm=na.rm)$thetastar,.975,na.rm=na.rm) - mean(x,na.rm=na.rm)}