// created by jdegen on 09/26/2013

// todo
// include some way to handle the imbalance created by randomization

var nTargets = Math.round(Math.random()*2 + 3);
var quantifiers = ["some","all","three","most","several"];
var nQns = 1 + quantifiers.length + 1 // 2 instructions pages plus target trials plus questionnaire trial
var speakers = ["Sally","Bob"];
var colors = shuffle(["#0066FF","#FF1C0A"]); //blue, red
var targetColor = colors[0];
var otherColor = colors[1];
var targetColorWord = "red";
if (targetColor == "#0066FF") { targetColorWord = "blue"; }

speakers = shuffle(speakers);
speaker = speakers[0];

//while (exactQuantifiers.length > nTargets+2) {
//	exactQuantifiers.pop(exactQuantifiers[exactQuantifiers.length])	
//}
quantifiers = shuffle(quantifiers);

//var shuffledVague = shuffle(vagueQuantifiers);
//var shuffledExact = shuffle(exactQuantifiers);
//var pairing = [shuffledVague[0],shuffledExact[0]];


function caps(a) {return a.substring(0,1).toUpperCase() + a.substring(1,a.length);}
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

//sample a random point (p.x, p.y) inside a half-circle with center at (center.x, center.y) and radius r
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
	}
	return initpointlocations;
}
function getPoints(numPoints,numBluePoints) {
	var points = [];
	var initpointlocations = getPointLocations(numPoints);
	var pointcolors = shuffle(fillArray(targetColor,numBluePoints).concat(fillArray(otherColor,numPoints-numBluePoints)));
	console.log(numPoints,numBluePoints)
	console.log(pointcolors);
	var points = [];
	for (var i=0; i < numPoints; i++) {
		samp = sampleMarblePosition(initpointlocations[i],13);
		points[i] = {x:samp.x,y:samp.y,color:pointcolors[i]};
	}
	return points;
}
function draw(id,numPoints,numBluePoints){
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
	points = getPoints(numPoints,numBluePoints); 
	for (var i=0; i < points.length; i++) {
		ctx.beginPath();
	    ctx.arc(points[i].x, points[i].y, 10, 0, 2*Math.PI, counterClockwise);
	    ctx.fillStyle = points[i].color;
		ctx.closePath();
		ctx.fill();
	}
  }
}

function nextTrial(trial) {
  if (trial+1 < quantifiers.length) {
    experiment.vagueSliders(trial + 1);
  } else {
    experiment.questionaire();
  }
}

$(document).ready(function() {
  //experiment.questionaire();
  //experiment.vagueSliders();
  //experiment.exactSliders();
  showSlide("consent");
  $("#mustaccept").hide();
});

//parameters randomized for each subject

var experiment = {
  data: {
         windowWidth:window.innerWidth,
         windowHeight:window.innerHeight,
//         quantifiers:pairings,
         quantifiers:quantifiers,
         browser: BrowserDetect.browser,
         nMarbles:nTargets,
         speaker:speaker,
         trialInfo:[]},         

         
  instructions: function() {
    if (turk.previewMode) {
      $("#instructions #mustaccept").show();
    } else {
      showSlide("instructions");
    	$('.bar').css('width', ( (100/nQns) + "%")); 
	    $("#bowlinstructions").html("<p>In this experiment, you will see different bowls with red and blue marbles in them. You will be told how "+speaker+ " described one of these bowls.</p><p>For each bowl, you will be asked to guess which bowl "+speaker+" is talking about.</p><p>Please click 'Begin' when you're ready to start.</p>");    	     
      	$("#begin").click(function() { experiment.vagueSliders(0); })
    }
  },
  
  vagueSliders: function(trialnum) {
  	// make sure to make i dynamic, dependent on trial
    $("#sliderText").html("<p>"+speaker+" says:" +
                          " <span class='utterance'><b> '"+caps(quantifiers[trialnum])+" of the marbles are "+targetColorWord+"'.</b></span></p></p>" +
                          "<p>Which of these situations do you think "+speaker+" is describing?</p>");
    $("#sliderAdjustText").html("Adjust the slider for each situation to indicate how likely you think it is that "+speaker+" is describing that situation.");
    showSlide("vagueSliders");
    var maxRange = 0.5;
    var minRange = 0.5;
    var responses = {};
    var nResponses = 0;
	$("#targetError").hide();    
    var bowls = '';
    $('.bar').css('width', ( (100*(trialnum+2)/nQns) + "%"));
    for (var i=0; i <= nTargets; i++) {
    	bowls = bowls.concat('<td class="bowltd"><div><canvas id="canvas'+i+'" class="canvasbowl">{{}}</canvas></div><div>very likely</div><div id="slidy'+i+'" align="center"></div><div>very unlikely</div></td><td width="5px"></td>');
    }
    $("#vagueBowls").html(bowls);
    for (var i=0; i<= nTargets; i++) {
    	draw("canvas"+i,nTargets,i);
    }
	function callCreator(index) {
		return function(x, y) {
			if (responses['target' + index] == null)
			{
			nResponses++;
			}				
			responses['target' + index] = y;
		}	
	}	
    for (var i=0; i <= nTargets; i++) {
     var caseLabel = "slidy" + i;
     var sliderLabel = "slider" + i;
     $("#"+caseLabel).html('<div id="'+sliderLabel+
                           '" class="dragdealer"><div class='+
                           '"red-bar handle"></div></div>');
     var slider = new Dragdealer(sliderLabel, 
     {
       horizontal: false,
       vertical: true,
       speed:100,
       y: 0.5,    
       callback: callCreator(i)
     });
    }    
    $("#sliderMoveon").click(function() {
     if ( nResponses <= nTargets ) {   	
       $("#targetError").show();
     } else {
       $("#sliderMoveon").unbind("click");
       responses["trial"] = trialnum;
       responses["quantifier"] = quantifiers[trialnum];
	   var trialData = experiment.data["trialInfo"].push(responses);
       nextTrial(trialnum);
     }
    });        
  },
 
  questionaire: function() {
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
    var lang = pieces[1].split("=")[1];
    var comments = pieces[2].split("=")[1];
    if (lang.length > 0) {
        experiment.data["language"] = lang;
        experiment.data["comments"] = comments;
        experiment.data["age"] = age;
        showSlide("finished");
        setTimeout(function() { turk.submit(experiment.data) }, 1000);
    }
    });
  }
};