library(tidyverse)
library(rvest)
library(lubridate)
  setwd("projects/irodzoom/data")

getwd()

# url1 <- "https://iditarod.com/race/2018/checkpoints/12-Ophir/"
urls <- c("https://iditarod.com/race/2018/checkpoints/4-Yentna/", "https://iditarod.com/race/2018/checkpoints/5-Skwentna/", "https://iditarod.com/race/2018/checkpoints/6-Finger-Lake/", "https://iditarod.com/race/2018/checkpoints/7-Rainy-Pass/", "https://iditarod.com/race/2018/checkpoints/8-Rohn/","https://iditarod.com/race/2018/checkpoints/9-Nikolai/","https://iditarod.com/race/2018/checkpoints/10-McGrath/", "https://iditarod.com/race/2018/checkpoints/11-Takotna/","https://iditarod.com/race/2018/checkpoints/12-Ophir/", "https://iditarod.com/race/2018/checkpoints/13-Iditarod/", "https://iditarod.com/race/2018/checkpoints/14-Shageluk/", "https://iditarod.com/race/2018/checkpoints/15-Anvik/", "https://iditarod.com/race/2018/checkpoints/16-Grayling/", "https://iditarod.com/race/2018/checkpoints/17-Kaltag/", "https://iditarod.com/race/2018/checkpoints/18-Unalakleet/", "https://iditarod.com/race/2018/checkpoints/19-Shaktoolik/", "https://iditarod.com/race/2018/checkpoints/20-Koyuk/", "https://iditarod.com/race/2018/checkpoints/21-Elim/", "https://iditarod.com/race/2018/checkpoints/22-White-Mountain/", "https://iditarod.com/race/2018/checkpoints/23-Safety/", "https://iditarod.com/race/2018/checkpoints/24-Nome/")



# 
check1 <- read_html(url1, handle = curl::new_handle("useragent" = "Mozilla/5.0"))
check1Table <- check1 %>% html_nodes('table') %>%  html_table(fill=T)
check1Table <- as.data.frame(check1Table[[2]])
View(check1Table)

# h1s <- 
# checkName <- h1s[[3]]
# View(check)


readCheck <- function(url) {
  
checkPage <- read_html(url, handle = curl::new_handle("useragent" = "Mozilla/5.0")) 
checkData <- checkPage %>% html_nodes('table') %>% html_table(fill=T)
checkName <- checkPage %>% html_nodes('h1') %>% html_text()
checkName <- checkName[[3]]
checkDf <- as.data.frame(checkData)
ifelse(checkName %in% c("Ophir", "Kaltag"), checkDf <- checkDf[2:nrow(checkDf) ,2:12], checkDf <- checkDf[2:nrow(checkDf) ,3:12] )
names(checkDf) <- c("musher", "bib","intime","indogs", "outtime", "outdogs", "rest", "enroute","prev", "speed")
checkDf$checkName <- checkName
write_csv(checkDf, paste0("outCsv/",Sys.time(),"1.csv"))
checkDf}




# 
# out1 <- readCheck(url1)
# out1 <- out1[,3:12]
# names(out1) <- c("musher", "bib","intime","indogs", "outtime", "outdogs", "rest", "enroute","prev", "prevOut")
# 
# 
# outComplete <- out1


###the full thing!!!
full2018 <- lapply(urls, readCheck) %>% bind_rows()


names(full2018)[12] <- "junk"
names(full2018)[13] <- "junk2"

full2018 <- full2018 %>%  select(-12, -13)

write_csv(full2018, "full_2018.csv")

data18 <- read_csv("full_2018.csv")

data18 <- data18 %>% mutate(inTime = paste0("2018-", substr(intime, 1,length(intime)-9))) 
data18 <- data18 %>% mutate(inTime = gsub("/", "-", inTime))
data18 <- data18 %>% mutate(inTime = ymd_hms(inTime))

data18 <- data18 %>% mutate(outTime = paste0("2018-", substr(outtime, 1,length(outtime)-9))) 
data18 <- data18 %>% mutate(outTime = gsub("/", "-", outTime))
data18 <- data18 %>% mutate(outTime = ymd_hms(outTime))

data18 <- data18 %>% mutate(prevTime = paste0("2018-", substr(prev, 1,length(prev)-9))) 
data18 <- data18 %>% mutate(prevTime = gsub("/", "-", prevTime))
data18 <- data18 %>% mutate(prevTime = ymd_hms(prevTime))



data18 <- data18 %>% mutate (indogs = ifelse(!is.na(indogs), indogs, outdogs))
data18 <- data18 %>% mutate (outdogs = ifelse(!is.na(outdogs), outdogs, indogs))



data18 <-  data18 %>% mutate(enrouteTime = as.numeric(difftime(inTime, prevTime, units="mins")) , restTime = as.numeric(difftime(outTime,inTime, units="mins")))
data18 <- data18 %>% mutate(dropDogs = as.numeric(indogs)-as.numeric(outdogs))

data18 <- data18 %>% mutate(rest24 = ifelse(restTime >1440, 1, 0))


data18 <- data18 %>% group_by(checkName) %>% mutate(cpOrder = order(order(inTime))) %>% ungroup()


nomePlaces <- data18 %>% filter(checkName == "Nome") %>%  select(musher, cpOrder) %>% rename(finalOrder=cpOrder)


data18 <- left_join(data18, nomePlaces, by="musher")


write_csv(data18, "data18.csv")




############# add on Willow

data18 <- read_csv("data18.csv")
data18Willow <- data18 %>% filter(checkName =="Yentna")
data18Willow$checkName = "Willow"
data18Willow$enrouteTime = 0
data18Willow$restTime = 0
data18Willow$outdogs = data18Willow$indogs
data18Willow$speed = 0
data18Willow$inTime = data18Willow$prevTime
data18Willow$outTime = data18Willow$prevTime
data18Willow$cpOrder = data18Willow$bib -1

data18 <- rbind(data18, data18Willow)

data18 <- data18 %>% mutate(rest8 = ifelse(restTime <1440 & restTime >479, 1, 0))


write_csv(data18, "data18Complete.csv")
#######summary############


# 1238-52
cpExit <- data18 %>% filter(outtime=="" & checkName == "Nome")
cpSummary <- data18 %>% filter(outtime!="") %>% group_by(checkName) %>% summarise(rest24 = sum(rest24), rest8 = sum(rest8), medianRest = median(restTime), fastest =min(enrouteTime), totalDogs = sum(dropDogs), averageInDogs = mean(indogs), medianInDogs = median(indogs), medianRest = median(restTime), averageSpeed = mean(speed), medianEnRoute = median(enrouteTime))
nomeSummary <- data18 %>% filter(checkName == "Nome") %>% group_by(checkName) %>% summarise(rest24 = sum(rest24), medianRest = median(restTime), fastest =min(enrouteTime), totalDogs = sum(dropDogs), averageInDogs = mean(indogs), medianInDogs = median(indogs), medianRest = median(restTime), averageSpeed = mean(speed), medianEnRoute = median(enrouteTime))

cpSummary <- rbind(cpSummary, nomeSummary)
       
distances <- read_csv("Distances.csv")
locations <- read_csv("locations.csv")



cpSummary <- left_join(cpSummary, distances, by=c("checkName"= "Checkpoint"))
cpSummary <-  left_join(cpSummary, locations, by=c("checkName"= "Checkpoint")) 
cpSummary <- cpSummary %>%  select(-17, -16,-15,-14)


# cpWillow <- cpSummary[1, ]
# cpWillow$checkName <- "Willow"
# 
# rbind(cpSummary, cpWillow) 61.744646, -150.059750

write_csv(cpSummary, "cpSummary.csv")


cpSum <- read_csv("cpSummary.csv")

cpSum[22,] <- c("Willow",0,0,0,0,0,16,16,0,0,0,-150.059750,61.744646)

write_csv(cpSum, "cpSummaryW.csv")
