// created by jdegen on 06/16/2014

var nTargets = shuffle([9,10])[0];
var fonttype = shuffle(["italicized","basic"])[0];
//console.log(nTargets);
var speakers = shuffle(["Ben", "Dan", "Ted","Calvin","Max", "Ann", "Liz", "Diane","Amy", "Marie", "Jane"]);

var zero = shuffle(["none","zero"])[0];
var baselow = ["one","two","three","four"];
var basemid = ["five","six","seven"];
var basehigh = ["eight","nine","ten"];

if (nTargets == 9) {
	baselow = ["one","two","three"];
	basemid = ["four","five","six"];	
	basehigh = ["seven","eight","nine"];	
}

var low = shuffle(baselow)[0];
var mid = shuffle(basemid)[0];
var high = shuffle(basehigh)[0];

var utterances = shuffle(["all","most","half","some","many","few","several",zero,low,mid,high]);
var acolors = shuffle([{color:"#0066FF",colorword:"blue"},{color:"#00CC00",colorword:"green"},{color:"#800080",colorword:"purple"},{color:"#000000",colorword:"black"},{color:"#808080",colorword:"gray"},{color:"#40E0D0",colorword:"turquoise"}]);//
var bcolors = shuffle([{color:"#E60000",colorword:"red"},{color:"#FF70DB",colorword:"pink"},{color:"#FF9147",colorword:"orange"},{color:"#FFFF00",colorword:"yellow"},{color:"#8B4513",colorword:"brown"},{color:"#E60000",colorword:"red"}]);

acolors = acolors.concat(bcolors);
bcolors = bcolors.concat(acolors);

//var order = shuffle(range(nTargets+1));

console.log(acolors);
console.log(utterances);

var ccounter = 0; // trial counter
var trialnum = 0;

var nSlides = 1+utterances.length+1; // number of slides for progress bar

//////// some functions /////////////
function range(start, stop, step){
    if (typeof stop=='undefined'){
        // one param defined
        stop = start;
        start = 0;
    };
    if (typeof step=='undefined'){
        step = 1;
    };
    if ((step>0 && start>=stop) || (step<0 && start<=stop)){
        return [];
    };
    var result = [];
    for (var i=start; step>0 ? i<stop : i>stop; i+=step){
        result.push(i);
    };
    return result;
};
function caps(a) {return a.substring(0,1).toUpperCase() + a.substring(1,a.length);}
function lower(a) {return a.substring(0,1).toLowerCase() + a.substring(1,a.length);}
function showSlide(id) { $(".slide").hide(); $("#"+id).show(); }
function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.
function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  };
  return arr;
}
function uniform(a, b) { return ( (Math.random()*(b-a))+a ); }

function sampleMarblePosition(center, r) {
  var sampledR = uniform(0, r);
  var sampledTheta = uniform(0, Math.PI); //in radians
  var point = {radius: sampledR, theta: sampledTheta};
  return rect(point, center);
}

//convert to rectangular coordinates
function rect(point, center) {
  var x = center.x + point.radius*Math.cos(point.theta);
  var y = center.y + point.radius*Math.sin(point.theta);
  return {x: x, y: y};
}
function getPointLocations(n) {
	var initpointlocations = [];
	switch (n) {
		case 3:
			initpointlocations = [{x:45,y:30},{x:75,y:60},{x:105,y:30}];
			break;
		// fix this one and test the one before
		case 4:
			initpointlocations = [{x:40,y:20},{x:55,y:65},{x:95,y:65},{x:110,y:20}];
			break;
		case 5:
			initpointlocations = [{x:35,y:20},{x:55,y:70},{x:75,y:45},{x:95,y:70},{x:115,y:20}];
			break;
		case 6:
			initpointlocations = [{x:35,y:20},{x:45,y:70},{x:75,y:45},{x:75,y:70},{x:115,y:20},{x:110,y:70}];			
			break;
		case 9:
			initpointlocations = [{x:25,y:20},{x:45,y:35},{x:70,y:20},{x:95,y:35},{x:115,y:20},{x:30,y:55},{x:50,y:70},{x:75,y:55},{x:100,y:70}];			
			break;			
		case 10:
			initpointlocations = [{x:25,y:20},{x:45,y:35},{x:70,y:20},{x:95,y:35},{x:115,y:20},{x:30,y:55},{x:50,y:70},{x:75,y:55},{x:100,y:70},{x:115,y:55}];			
			break;
		case 15:
			initpointlocations = [{x:35,y:20},{x:35,y:70},{x:75,y:45},{x:75,y:70},{x:115,y:20},{x:115,y:70}];			
			break;

	}
	return initpointlocations;
}
function getPoints(numPoints,numBluePoints,cnt) {
	var points = [];
	var initpointlocations = getPointLocations(numPoints);
	var targetcolor = acolors[cnt].color;
	var othercolor = bcolors[cnt].color;
	var pointcolors = shuffle(fillArray(targetcolor,numBluePoints).concat(fillArray(othercolor,numPoints-numBluePoints)));
//	console.log(numPoints,numBluePoints)
//	console.log(pointcolors);
	var points = [];
	for (var i=0; i < numPoints; i++) {
		samp = sampleMarblePosition(initpointlocations[i],6);
		points[i] = {x:samp.x,y:samp.y,color:pointcolors[i]};
	}
	return points;
}
function draw(id,numPoints,numBluePoints,cnt){
  var canvas = document.getElementById(id);
  if (canvas.getContext){
   	var ctx = canvas.getContext("2d");
   	canvas.width = 150
   	canvas.height = 120    	

	//paint the bowl
    var x = canvas.width / 2;
    var y = canvas.height / 4
    var radius = canvas.height/2 + 9;
    var startAngle = 1.05 * Math.PI;
    var endAngle = 1.95 * Math.PI;
    var counterClockwise = true;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = 'black';
    ctx.stroke();

	//paint the marbles
	points = getPoints(numPoints,numBluePoints,cnt); 
	for (var i=0; i < points.length; i++) {
		ctx.beginPath();
	    ctx.arc(points[i].x, points[i].y, 10, 0, 2*Math.PI, counterClockwise);
	    ctx.fillStyle = points[i].color;
		ctx.closePath();
		ctx.fill();
	}
  }
}


// start experiment
$(document).ready(function() {
  showSlide("consent");
//	experiment.questionaire();
//  experiment.context3();
  $("#mustaccept").hide();
});


// experiment specification
var experiment = {
  data: {
         windowWidth:window.innerWidth,
         windowHeight:window.innerHeight,
         browser: BrowserDetect.browser,
		 totalmarbles: nTargets,
		 targetcolor: acolors.slice(0,utterances.length),
		 othercolor: bcolors.slice(0,utterances.length),		 
		 utterance: utterances,
		 fonttype: fonttype,		 
		 comptrials:[]
  },         
         
  instructions: function() {
    if (turk.previewMode) {
      $("#instructions #mustaccept").show();
    } else {
      showSlide("instructions");
	  	trialnum++;      
	    $('.bar').css('width', ( (100*(trialnum)/nSlides) + "%"));
	    $("#bowlinstructions").html("<p class='block-text'>In this experiment, you will see one-sentence descriptions of bowls of marbles. Your task is to guess which bowl of marbles the speaker is describing. Please make sure you read the instructions carefully.<p>Click 'Begin' when you're ready to start.</p>");    	     
      	$("#begin").click(function() { experiment.comprehensiontrial(ccounter); })
    }
  },
  
  comprehensiontrial: function(ccounter) {
  	trialnum++;
    $('.bar').css('width', ( (100*(trialnum)/nSlides) + "%"));
    $(".err").hide();
    showSlide("comprehensiontrial");
    var nResponses = 0;
    var responses = {};

	var verb = "are";
	if (utterances[ccounter] == "one") { verb = "is"; }
	
	if (fonttype == "basic") {	
	    $("#answer").html(speakers[ccounter]+" says: <span class='utterance'><b> '"+caps(utterances[ccounter])+" of the marbles "+verb+" "+acolors[ccounter]['colorword']+".'</b></span>");     
	} else {
	    $("#answer").html(speakers[ccounter]+" says: <span class='utterance'><b> <em>'"+caps(utterances[ccounter])+" </em>of the marbles "+verb+" "+acolors[ccounter]['colorword']+".'</b></span>"); 		
	}    
    $("#sliderText").html("<p>Which of these bowls do you think "+speakers[ccounter]+" is describing?</p>");     
    // 3. ask for world interpretation                      
    $("#sliderAdjustText").html("Adjust the slider for each bowl to indicate how likely you think it is that "+speakers[ccounter]+" is describing that bowl.");
    showSlide("comprehensiontrial");
    // 4. show worlds (bowls)
    var bowls = '';
    for (var i=0; i <= nTargets; i++) {    	
		bowls = bowls.concat('<td class="bowltd"><div><canvas id="canvas'+ccounter+i+'" class="canvasbowl">{{}}</canvas></div><div>very likely</div><div id="slidy'+ccounter+i+'" align="center"></div><div>very unlikely</div></td><td width="5px"></td>');
    }     
    // 2. measure question
    $(".vagueBowls").html(bowls);	
    for (var i=0; i<= nTargets; i++) {
    	draw("canvas"+ccounter+i,nTargets,i,ccounter);
    }    
	function bowlChangeCreator(ind, caseLabel) {
		return function(value) {
		if (responses['target' + ind] == null)
		{
			nResponses++;
		}				
		responses['target' + ind] = $("#"+caseLabel).slider("value");		
		$("#"+caseLabel).css({"background":"#E6E6E6",
		"border-color": "#001F29"});
      	$("#"+caseLabel+" .ui-slider-handle").css({
      		"background":"#E62E00",
			"border-color": "#001F29" }); 		
		}
	}    
                          
    for (var i=0; i <= nTargets; i++) {                           
	     var caseLabel = "slidy" + ccounter + i;
         $("#"+caseLabel).slider({	
               animate: false,
               orientation: "vertical",
               max: 1 , 
               min: 0, 
               step: 0.01, 
               value: 0.5,               
               change:
					bowlChangeCreator(i, caseLabel)
     	});
    }     


            
    $(".continue").click(function() {
      if (nResponses <= nTargets) {
      	 $(".err").show();
      } else {
         $(".continue").unbind("click");      	
         $(".err").hide();
		 experiment.data["comptrials"].push(responses); 
         if (ccounter+1 < utterances.length) {
			ccounter++;
            experiment.comprehensiontrial(ccounter);
          } else {
            experiment.questionaire();
          }	         
      }
    })      
  },
  
 
  questionaire: function() {
	trialnum ++;  	
    $(document).keypress( function(event){
     if (event.which == '13') {
        event.preventDefault();
      }
    });
    $('.bar').css('width', ( "100%"));
    showSlide("questionaire");
    $("#lgerror").hide();
    $("#formsubmit").click(function(){
    rawResponse = $("#questionaireform").serialize();
    pieces = rawResponse.split("&");
    var age = pieces[0].split("=")[1];
    var gender = pieces[1].split("=")[1];    
    var lang = pieces[2].split("=")[1];
    var comments = pieces[3].split("=")[1];    
        
    if (lang.length > 0) {
        experiment.data["language"] = lang;
        experiment.data["comments"] = comments;
        experiment.data["age"] = age;
        experiment.data["gender"] = gender;
        showSlide("finished");
//	    console.log(experiment.data);        
        setTimeout(function() { turk.submit(experiment.data) }, 1000);
    }
    });
  }
};