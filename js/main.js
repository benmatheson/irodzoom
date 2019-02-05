//////loading d3 portion //////////

d3.csv("data/cpSummaryW.csv", function(sumData){
  d3.csv("data/data18Complete.csv", function(cpData){

        
sumData.sort((a,b)=>a.Distance-b.Distance)
        // 2018-03-11 13:40:00

        const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S%Z")
        
        cpData.forEach(function(d){
            d.inTime = parseTime(d.inTime)
            d.outTime = parseTime(d.outTime)
            d.averageSpeed = +d.averageSpeed
        })

sumData.forEach(function(d){
    d.Distance = +d.Distance;
    d.same = "1";


})









function start () {




    const yetData = cpData.filter(d=>d.checkName =="Yentna" && d.finalOrder!="NA")
        const skData = cpData.filter(d=>d.checkName =="Skwentna")
        const yetSum = sumData.filter(d=>d.checkName=="Yentna");
        const unkData =cpData.filter(d=>d.checkName =="Unalakleet" && d.finalOrder!="NA")
        const wilData =cpData.filter(d=>d.checkName =="Willow")
        
const wilSum =sumData.filter(d=>d.checkName=="Willow");




        const width1 =200;
        const height1 = 200;

        
console.log(cpData)

console.log("willDATA")
console.log(wilData)

        const ban_distance = document.querySelector('#ban_distance')

        ban_distance.innerHTML = wilSum[0].Distance;
        const ban_description = document.querySelector('#ban_description')
        ban_description.innerHTML = "miles into race"
        
        ban_distance.classList.add('ban');
        ban_description.classList.add('banDescription');





///// the people

const wilDataSort = wilData.sort((a,b)=> a.cpOrder - b.cpOrder).filter(d=>d.cpOrder<6)
console.log(wilDataSort)
const peopleSvg = d3.select("#right1Right").append('svg').attr("width", 200).attr("height", 100)
const peopleSvgG = peopleSvg.append('g')

// peopleSvg.append('text')
//         .attr("x", 2)
//         .attr("y", (9)
//         .text(d=> d.musher)

peopleSvgG.selectAll('text').data(wilDataSort, d=>d.bib).enter().append('text')
        .attr("x", 6)
        .attr("y", (d,i)=> ((i+1)*13)+6)
        .text((d,i)=>`${i+1}. ${d.musher}`)
        .attr("class", "musher")



////








    const dropSvg = d3.select('#right1').append('div').attr("class", "drop")
    dropSvg.selectAll('div').data(sumData[0].totalDogs).enter().append('div').attr("class", "waffle")
    
    const pageWidth = window.innerWidth;
    
    const distanceSvg = d3.select('#distance').append('svg').attr("width", pageWidth).attr("height", 40).attr("class", "shade")
    const distanceSvgG = distanceSvg.append('g')
    const distanceSvgBack = distanceSvg.append('g')
    const distanceSvgGHigh = distanceSvg.append('g')
    
    
    
    const timeLineScale = d3.scaleLinear().domain([0,987]).range([30,pageWidth-30]);
    
    
    
    
    distanceSvgG.append('line')
    .attr('x1', timeLineScale(0))
    .attr('x2',timeLineScale(987))
    .attr('y1',18)
    .attr('y2',18)
    .attr("stroke", "black")
    .attr('stroke-width', 2 )
    .attr("class", "mix")
    .attr("class", "shade")
    
    distanceSvgG.selectAll('circle')
    .data(sumData, d=> d.checkName)
    .enter()
    .append('circle')
    .attr("cx", d=> timeLineScale(d.Distance))
    .attr("cy", 18)
    .attr("r", 3)
    .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("stroke", "#333")
        .attr("opacity", .9)
        .attr("id", d=> `_${d.Distance}`)


        console.log("newdata"+yetSum[0].Distance)

            console.log(wilData)
        distanceSvgGHigh.selectAll('circle')
        .data(wilSum, d=>d.same)
        .enter()
        .append('circle')
        .attr("cx", d=> timeLineScale(d.Distance))
        .attr("cy", 18)
        .attr("r", 3)
        .attr("r", 4)
        // .attr("fill", "none")
            .attr("stroke-width",3)
            .attr("stroke", "salmon")
            .attr("opacity", .99)           
            


       

            // .attr("id", d=> `_${d.Distance}`)


        
        // const distanceText = distanceSvgG.selectAll('text')
        // .data(sumData)
        // .enter()
        // .append('text')
        // .attr("x", d=> timeLineScale(d.Distance))
        // .attr("y", (d,i)=> i%2 != 0 ? 6 : 23    ) 
        // .text(d=>d.checkName)
        // .attr("id", d=> d.checkName)
        // // .attr('fill', "white")


        console.log('sumdat')
        console.log(sumData)
        const distanceTextBack = distanceSvgBack.selectAll('text')
        .data(sumData)
        .enter()
        .append('text')
        .attr("x", d=> timeLineScale(d.Distance))
        .attr("y", (d,i)=> i%2 != 0 | i ==0 ? 13 : 28 ) 
        .text(d=>d.checkName)
        .attr("id", d=> d.checkName)
        // .attr('fill', "white")
        .attr("class", "timeLineText")

        

////////SPEEDLINEs/////

const speedLineSvg = d3.select("#right0").append('svg').attr('width',300).attr('height',20)
const speedLineSvgG = speedLineSvg.append('g')
const speedLineSvgGAxis = speedLineSvg.append('g')

const speedRectHeight = 10;

const speedScaleX = d3.scaleLinear().domain([0,13]).range([0,300])
const speedRect = speedLineSvgG.selectAll('rect').data(wilData, d=> d.bib).enter().append('rect')

// speedLineSvg.attr("fill", "rgba(0,0,0,.8)")

var speedXaxis = d3.axisBottom(speedScaleX).tickSize(0).ticks(6);

speedLineSvgGAxis.call(speedXaxis)
.attr("transform", "translate(0,10)")
.attr("class", "fira")
// .attr("class", "white")




    speedRect
    .attr("x", d=> speedScaleX(d.speed))
    .attr("y", 0)
    .attr("height", speedRectHeight)
    .attr("width", 4)
    .attr("rx", 4)
    .attr('opacity', .4 )
    .attr("class", "speedRect")


////////////////



////////////the 24

const rest24Svg = d3.select("#right24").append('svg').attr('width',300).attr('height',100);
const rest24SvgG = rest24Svg.append('g')
const rest24SvgG8 = rest24Svg.append('g')
const rest24SvgGAxis = rest24Svg.append('g')

// const speedRectHeight = 10;

const rest24ScaleY = d3.scaleLinear().domain([0,35]).range([100,0])



var rest24Xaxis = d3.axisRight(rest24ScaleY).tickSize(0).ticks(6);

rest24SvgG.call(rest24Xaxis)
.attr("transform", "translate(0,10)")
.attr("class", "fira")

const rest24Rect = rest24SvgG8.selectAll('rect').data(sumData).enter().append('rect')


rest24Rect
    .attr("x", (d,i)=> i*8)
    .attr("y", d=> rest24ScaleY(d.rest24))
    .attr("height", d=>100-rest24ScaleY(d.rest24))
    .attr("width", 7)
    .attr("id", d=> `_d${d.Distance}`)
    .attr("test", "frac")
    .attr("rx", 2)
    .attr("fill", "#333")
    .attr('opacity', .99 )

    

    const rest8Rect = rest24SvgG.selectAll('rect').data(sumData.filter(d=>d.checkName!= "White Mountain"))
    .enter()
    .append('rect')
    .attr("id", d=> `_d${d.Distance}`)



rest8Rect
    .attr("x", (d,i)=> i*8)
    .attr("y", d=> rest24ScaleY(d.rest8))
    .attr("height", d=>100-rest24ScaleY(d.rest8))
    .attr("width", 7)
    .attr("rx", 2)
    .attr("fill", "gray")
    .attr('opacity', .99 )



/////////runRest///////////////////




const runRestSvg = d3.select("#rightRunRest").append('svg').attr('width',300).attr('height',60)
const runRestSvgG1 = runRestSvg.append('g')
const runRestSvgG2 = runRestSvg.append('g')

const runRestRectHeight = 10;

const runScaleX = d3.scaleLinear().domain([0,1476]).range([0,270])
const restScaleX = d3.scaleLinear().domain([0,484]).range([0,270])
const runRestRect1 = runRestSvgG1.selectAll('rect').data(wilSum).enter().append('rect')
const runRestRect2 = runRestSvgG2.selectAll('rect').data(wilSum).enter().append('rect')



runRestRect1
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", speedRectHeight+10)
    .attr("width", d=> runScaleX(d.medianEnRoute))
    .attr("rx", 2)
    .attr("class", "runRest1")

 
    
    
    runRestRect2
    .attr("x", 0)
    .attr("y", 25)
    .attr("height", speedRectHeight+10)
    .attr("width", d=> runScaleX(d.medianRest))
    .attr("rx", 2)
    .attr("class", "runRest")

   
console.log("resetcalt")
console.log((restScaleX(25)))   


runRestSvgG1.selectAll('text')
    .data(wilSum, d=>d.same)
        .enter()
        .append('text')
        .text(d=> `${Math.round(d.medianEnRoute/60)}h ${(d.medianEnRoute%60)}min `)
        .attr("x", d=> runScaleX(d.medianEnRoute)+5)
        .attr("y", 15)
        .attr("class", "runRest")
        


runRestSvgG2.selectAll('text')
    .data(wilSum, d=>d.same)
        .enter()
        .append('text')
        .text(d=> `${Math.round(d.medianRest/60)}h ${(d.medianRest%60)}min `)
        .attr("x", d=> restScaleX(d.medianRest)+5)
        .attr("y", 35)
        .attr("class", "runRest")

/////////////////////end run rest///

        


/////////scatter

const scatterSize = 270;
        const scatterYScale = d3.scaleLinear().domain([0,67]).range([scatterSize,0])
        const scatterXScale = d3.scaleLinear().domain([0,67]).range([0,scatterSize])

// .attr("transform", "translate(170,70)")

const scatterSvg = d3.select('#right2').append('svg').attr('height',290).attr("width", 290).attr("transform", "translate(10,0)")

const scatterSvgG = scatterSvg.append('g')
const scatterSvgG1 = scatterSvg.append('g');


var scatterXaxis = d3.axisRight(scatterXScale).tickSize(0).ticks(5);
var scatterYaxis = d3.axisBottom(scatterYScale).tickSize(0).ticks(5);


// Checkpoint Order

scatterSvgG.call(scatterXaxis)
.attr("transform", "translate(10,0)")
.attr("class", "fira")
.attr("stroke-fill", "none")

scatterSvgG.select("path").remove()



scatterSvgG1.call(scatterYaxis)
.attr("class", "fira")
// .attr("transform", "translate(0,10)")
scatterSvgG1.select("path").remove()





scatterSvgG.selectAll('circle').data(wilData).enter().append('circle')
.attr("cx", d=>scatterXScale(d.cpOrder))
.attr("cy", d=>scatterYScale(d.finalOrder))
.attr('r', 3)
.attr("opacity", .7)
// .attr("class", "white")  
.attr("stroke", "#333")
.attr("stroke-width", 3)
.attr("fill", "none")















//////////////




/////////histo1

const histoYScale = d3.scaleLinear().domain([0,7]).range([0,200])
const histoXScale = d3.scaleTime().domain([new Date (2018, 02, 04), new Date (2018, 02,05)]).range([0,200])



const histoSvg = d3.select('#right3').append('svg').attr('height', height1).attr("width", width1)
const histoSvgG = histoSvg.append('g');


const histogram = d3.histogram()
        .value(d=> d.inTime)
        .domain(histoXScale.domain())
        .thresholds(histoXScale.ticks(d3.timeHour))

const bins = histogram(yetData)

// console.log("binds"+bins)

// console.table(bins)
        histoSvgG.selectAll('rect').data(bins).enter().append('rect')
            .attr('x', (d,i)=> i*3.1 )
            .attr('y', (d,i)=> 200-histoYScale(d.length))
            .attr('width', 2 )
            .attr("height", d=> histoYScale(d.length))






///////

/////histo2
const histo2YScale = d3.scaleLinear().domain([0,20]).range([0,200])
const histo2XScale = d3.scaleLinear().domain([0,547]).range([0,200])



const histo2Svg = d3.select('#right4').append('svg').attr('height', height1).attr("width", width1)
const histo2SvgG = histo2Svg.append('g');


const histogram2 = d3.histogram()
        .value(d=> d.restTime)
        .domain(histo2XScale.domain())
        .thresholds(histo2XScale.ticks())

const bins2 = histogram(skData)


        histo2SvgG.selectAll('rect').data(bins2).enter().append('rect')
            .attr('x', (d,i)=> i*5 )
            .attr('y', (d,i)=> 200-histo2YScale(d.length))
            .attr('width', 4 )
            .attr("height", d=> histo2YScale(d.length))



/////////












scatterSvgG.selectAll('circle').data(yetData, d=> d.bib).enter().append('circle')
.attr("cx", d=>scatterXScale(d.cpOrder))
.attr("cy", d=>scatterYScale(d.finalOrder))














//////////////














// } ///start?   


document.querySelector("#first").addEventListener("click", function(){updateCp(1)});
document.querySelector("#second").addEventListener("click", function () {updateCp(-1)});
        
var cpInd =-1;


function updateCp(val) {
    console.log("yoyo")

    cpInd += val;
    console.log("cpInd"+cpInd)

    newCp(cpInd)
}


function newCp (index) {

    const firstDiv = document.querySelector('div#first')
    firstDiv.innerText = "NEXT→";
    firstDiv.classList.remove('first');

    
    console.log("da new hcekpint"+cpInd)

const newCpName = sumData[cpInd].checkName;
const newCpDist = sumData[cpInd].Distance;

    // const newSumData = sumData[cpInd];
    const newSumData = sumData.filter(d=> d.checkName == newCpName && d.finalOrder!="NA")
    const newCpData = cpData.filter(d=> d.checkName ==  newCpName && d.finalOrder!="NA")
    const newCpDataFull = cpData.filter(d=> d.checkName ==  newCpName)

    // newCpData.filter(d=> d.outTime!="NA")

    cpData.filter(d=>d.checkName =="Yentna")

console.log("newsumdata", newSumData)
console.log("newcpdata", newCpData)


cpInd > 10 && cpInd <16 ? yukonFly() : regFly();



function regFly() {


    map.flyTo({center: [newSumData[0].lon,newSumData[0].lat],        
        speed: .1, // make the flying slow
    curve: 0, // change the speed at which it zooms out
    pitch: 80,
    bearing: 270,
    zoom:9.7,
    duration: 10000})
}

function yukonFly (){

    map.flyTo({center: [newSumData[0].lon,newSumData[0].lat],        
        speed: .1, // make the flying slow
    curve: 0, // change the speed at which it zooms out
    pitch: 80,
    bearing: 9,
    zoom:9.7,
    duration: 10000})
}






//UPDATED SCATTER 


const scat = d3.select('#right2').selectAll('g')

   const c1 = scatterSvgG.selectAll('circle').data(newCpData, d=> d.bib)
   c1.exit().remove()


   c1.transition()
    .duration(2000)
    .ease(d3.easeCircle)

//    c1.enter().append('circle')
 
   .attr("cx", d=>scatterXScale(d.cpOrder))
   .attr("cy", d=>scatterYScale(d.finalOrder))
//    .attr('r', 2)
//    .attr("opacity", .6)
   
///UPDATED waffle

const waffInteger = newSumData[0].totalDogs;
const waffArray = Array.from('x'.repeat(waffInteger))



var waff = dropSvg.selectAll('div').data(waffArray)
waff.exit().remove()

waff.transition()
.duration(1000)
waff.enter().append('div')
.attr("class", "waffle")


console.log("waff")
console.log(waff)
// waff.forEach(function (d){

// d.innerText = '🐕';

// })

//update 24 and 8////

const currentDistance = newSumData[0].Distance;
const pastDistnce = 
console.log("curretn dist")
console.log(currentDistance)

const loc24 = d3.select(`#_d${currentDistance}`)


rest24Rect.attr("fill", "#333").attr('stroke', "none")


console.log(`#_d${currentDistance}`)

// loc24.attr("fill", "white")
loc24.attr('stroke', "salmon")
loc24.attr('stroke-width', 2)
loc24.attr('id',"none")
    
    




////////



//updated timeline


const newLoc = distanceSvgGHigh.selectAll('circle')
    .data(newSumData, d=>d.same)
    
    newLoc.exit().remove()

    
    newLoc.transition()
    .duration(3000)
    .attr("r", 4)
    .attr("fill", "black")
        .attr("stroke-width",3)
        .attr("stroke", "salmon")
        .attr("opacity", .99)
    .attr("cx", d=> timeLineScale(d.Distance))
    .attr("cy", 18)
    

//updated runRest 

console.log("newSUMM")
console.log(newSumData)

const runNew = runRestSvgG1.selectAll('rect')
    .data(newSumData, d=>d.same)
    
    runNew.exit().remove()

    runNew.transition()
    .duration(300)
    .ease(d3.easeCircle)

    .attr("x", 0)
    .attr("y", 0)

    .attr("height", speedRectHeight+10)
    .attr("width", d=> runScaleX(d.medianEnRoute))
 
    
    runRestSvgG2.selectAll('rect')
    .data(newSumData, d=>d.same)
    .transition()
    .duration(300)
    .ease(d3.easeCircle)

    .attr("x", 0)
    .attr("y", 25)
    .attr("height", speedRectHeight+10)
    .attr("width", d=> runScaleX(d.medianRest))
    .attr("rx", 2)
   

    runRestSvgG2.selectAll('text')
    .data(newSumData, d=>d.same)
        .transition()
        .duration(400)
        .text(d=> `${Math.round(d.medianRest/60)}h ${(d.medianRest%60)}min `)
        .attr("x", d=> runScaleX(d.medianRest)+5)
    .attr("y", 35)


    runRestSvgG1.selectAll('text')
    .data(newSumData, d=>d.same)
        .transition()
        .duration(400)
        .text(d=> `${Math.round(d.medianEnRoute/60)}h ${(d.medianEnRoute%60)}min `)
        .attr("x", d=> runScaleX(d.medianEnRoute)+5)
        .attr("y", 15)

    


////end updated run rest



///update people


const updatedPp = newCpDataFull.sort((a,b)=> a.cpOrder - b.cpOrder)
const updatedPeople = updatedPp.filter(d=> d.cpOrder <6)


console.log("UPDTEEDPP")
console.log(updatedPeople)
const newPeopleSelection = peopleSvgG.selectAll('text').data(updatedPeople, d=> d.bib)
newPeopleSelection.exit().remove()

newPeopleSelection.enter().append('text')
    .attr("y", 200)
    .transition()
    .duration(1000)
     .attr("x", 6)
     .text((d,i)=>`${i+1}. ${d.musher}`)
        .attr("y", (d,i)=> ((i+1)*13)+6)
        .attr("class", "musher")

newPeopleSelection.transition()
.duration(1000)
 .attr("x", 6)
 .text((d,i)=>`${i+1}. ${d.musher}`)
 .attr("y", (d,i)=> ((i+1)*13)+6)
 .attr("class", "musher")

/////

//////update speed



speedLineSvgG.selectAll('rect').data(newCpData,d=> d.bib)
.transition()
.duration(1000)
.ease(d3.easeCircle)

.attr("x", d=> speedScaleX(d.speed))
.attr("y", 0)
.attr("height", speedRectHeight)
.attr("width", 4)
.attr("rx", 4)
// .attr('opacity', .2 )
.attr("class", "speedRect")





//////////








 









//     const cpText =  distanceSvgG.select("#"+newCpName)
//    cpText
//         .transition()
//         .duration(2000)
//         .attr("class", "bold")


// const cpCircle = distanceSvgG.select('circle').filter(d=> d._data_.checkName == newCpName)

// .attr("id", function(d) { return d.data.uniqueID; })


// console.log("cpCirlce", cpCircle)





/////ban stuff

// const ban_distance = document.querySelector('#ban_distance')

// document.querySelector('#ban_distance') ? ban_distance.remove() : console.log("NO BAN")

// var newP = document.createElement("p"); 
// // and give it some content 
// var newContent = document.createTextNode("Hi there and greetings!"); 
// // add the text node to the newly created div
// newDiv.appendChild(newContent);  



// ban_distance.classList.remove('ban');

ban_distance.innerHTML = newSumData[0].Distance;
const ban_description = document.querySelector('#ban_description')
ban_description.innerHTML = "miles into race"



ban_distance.classList.add('ban');
ban_description.classList.add('banDescription');

////////

} //NEWCP

  } ///end start


//   document.querySelector("#third").addEventListener("click", start);
start()
        })//cp data
    }) //d3.csv
    
    
    
    
    
    
    
    
    

    
    
    
    
    

    
    
    
    mapboxgl.accessToken =
"pk.eyJ1IjoiYmVubWF0aGVzb24iLCJhIjoiY2lmZDhyZXVxNTI5eHNtbHgyOTYwbHJtMyJ9.Ch8JQXvunpUrv6tGpeJMCA";



const map = new mapboxgl.Map({

container: "main",
        //  style: "mapbox://styles/mapbox/light-v9",
        style: "mapbox://styles/benmatheson/cjqkgd4x63duo2smjqmthucmp",

        // style:"mapbox://styles/benmatheson/cjo060m9v05hx2rp2yd4d3yiw",


        // mapbox://styles/benmatheson/cjqkgd4x63duo2smjqmthucmp
         center: [-149.991111, 61.769444],
         bearing: -90,
         zoom: 9.7,
         pitch: 0,

        //  pitch: 0,
    
         transition: {
            //  duration: 100,
             delay: 0
         }
         // style: 'mapbox://styles/benmatheson/cjh2yaf301jjm2sru7r1uz7n7',
     
  



})
map.scrollZoom.disable();

// map.addControl(new mapboxgl.NavigationControl());


// map.on("load", function() {





















// //     map.addSource('dem', {
// //         "type": "raster-dem",
// //         "url": "mapbox://mapbox.terrain-rgb"
// //     });
// //     map.addLayer({
// //         "id": "hillshading",
// //         "source": "dem",
// //         "type": "hillshade",

// //         "paint": {
// //             "hillshade-illumination-anchor": "map",
// //             "hillshade-illumination-direction":225,
// //         //  "hillshade-shadow-color": "rgba(255,0,0,.99)",
// //          "hillshade-accent-color": "rgba(255,0,0,.99)",
// //          "hillshade-shadow-color": "rgba(0,0,255,.99)",
// //         "hillshade-exaggeration": 1 }
// //     // insert below waterway-river-canal-shadow;
// //     // where hillshading sits in the Mapbox Outdoors style
// //     }, 'checkpoints');



// // //benmatheson-6j1y6j0j



//         // document.querySelector('#main').classList.add('main2');





// //     function vis () {
        
        
// //         document.querySelector('#main').classList.add('main2');}

// // // zoom1();
// // // setTimeout(zoom2, 500)
// // // setTimeout(zoom3, 1200);
// // // setTimeout(zoom4, 1800);
// // // setTimeout(vis, 3000)

// //     // zoom1()
// // // console.log("zommed1")


// // // zoom2()
// // // console.log("zommed2")

// // // zoom3()
// // // console.log("zommed3")
























// }) //map onload


var place = -1;

var locations= [[-149.991111, 61.769444],
[-150.6789,61.7322],
[ -151.1727, 61.9651],
[-152.0728, 61.9793 ],
[ -152.7232, 62.0872],
[-153.3788, 62.3031 ],
[ -154.3750, 63.0133],
[ -155.5959,62.9532],
[-156.0641, 62.9886 ],
[-156.5299, 63.1460 ],
[-158.0984, 62.5446 ],
[-159.5323, 62.6550 ],
[-160.1990, 62.6522 ],
[-160.0642, 62.9054 ],
[-158.7257, 64.3138 ],
[-160.7863, 63.8742 ],
[-161.1918, 64.3519 ],
[-161.1680, 64.9286 ],
[-162.2494, 64.6162 ],
[-163.4067, 64.6798 ],
[-164.7519, 64.4681 ],
[-165.3996, 64.4964 ]]



function zoomTo () {

place +=1;
console.log("the new place"+place)

place < 24 ?  map.flyTo({center: locations[place],        
        speed: .1, // make the flying slow
       curve: 0, // change the speed at which it zooms out
       pitch: 90,
       bearing: 0,
       duration: 8000
   
   
   }) : place =0;



}





function zoom1 () {

map.flyTo({center: [-159.857,62.248],        
     speed: .1, // make the flying slow
    curve: 0, // change the speed at which it zooms out
    pitch: 80,
    duration: 7000


})

}


function zoom2 () {

    map.flyTo({center: [-160.130,62.557],

        speed: .01, // make the flying slow
        curve: .1, // change the speed at which it zooms out
        pitch: 80,
        duration: 6000


    })
    
    }

    

    function zoom3 () {

        map.flyTo({center: [-160.018,62.838],
            pitch: 80,
            duration: 6000,

            speed: 13, // make the flying slow
    curve: 1, // change the speed at which it zooms out
        
        })
        
        }


        function zoom4 () {

            map.flyTo({center: [-159.857,62.248],        
                speed: .1, // make the flying slow
               curve: 0, // change the speed at which it zooms out
               pitch: 80})
            
            }
    
        



// document.querySelector("#first").addEventListener("click", zoom1);





// -159.857,62.248

// -160.130,62.557

// -160.018,62.838


// -158.503,62.848

// )}