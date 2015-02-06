// created by jdegen on 04/24/2014

var nTargets = shuffle([4,5,9,10])[0];
var acolors = shuffle([{color:"#0066FF",colorword:"blue"},{color:"#00CC00",colorword:"green"},{color:"#800080",colorword:"purple"},{color:"#000000",colorword:"black"},{color:"#808080",colorword:"gray"},{color:"#40E0D0",colorword:"turquoise"}]);//
var bcolors = shuffle([{color:"#E60000",colorword:"red"},{color:"#FF70DB",colorword:"pink"},{color:"#FF9147",colorword:"orange"},{color:"#FFFF00",colorword:"yellow"},{color:"#8B4513",colorword:"brown"},{color:"#E60000",colorword:"red"}]);

acolors = acolors.concat(bcolors);
bcolors = bcolors.concat(acolors);

console.log(nTargets);
var order = shuffle(range(nTargets+1));
console.log(order);
console.log(acolors);

var pcounter = 0; // production trial counter
var trialnum = 0;

var nSlides = 1+1+nTargets+1+1; // number of slides for progress bar

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
	console.log(pcounter);
	console.log(acolors[cnt]);	
	var targetcolor = acolors[cnt].color;
	console.log(targetcolor);	
	var othercolor = bcolors[cnt].color;
	var pointcolors = shuffle(fillArray(targetcolor,numBluePoints).concat(fillArray(othercolor,numPoints-numBluePoints)));
	console.log(numPoints,numBluePoints)
	console.log(pointcolors);
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
		 targetcolor: acolors.slice(0,nTargets+1),
		 othercolor: bcolors.slice(0,nTargets+1),		 
		 marbles: order,
		 prodtrials:[],
  },         
         

  
  productiontrial: function(pcounter) {
  	console.log("trial info: "+acolors[pcounter].colorword+" "+bcolors[pcounter].colorword+" "+order[pcounter])
  	trialnum++;
    $('.bar').css('width', ( (100*(trialnum)/nSlides) + "%"));
    $(".err").hide();
    showSlide("productiontrial");
    var responses = [];
    var nWords = 2;
    $(".contextsentence").html("Here is a bowl of marbles and a description of that bowl with one word missing. Please complete the description by writing down <strong>at least two words that could fill the blank</strong>.");    
    draw("situation",nTargets,order[pcounter],pcounter);    
    $(".blanksentence").html("<strong>______ of the marbles are "+acolors[pcounter].colorword+".</strong>"); 
    $("#moreWords").html("");    
 
    $("#addWord").click(function() {
    nWords++;
    $("#moreWords").append('<p><input type="text" id="word' + nWords + '"></input></p>');
    })
        
    $(".continue").click(function() {
      var word1 = $("#word1").val();
      var word2 = $("#word2").val();      
      if (word1.length > 0 && word2.length > 0) {
         $(".continue").unbind("click");
         $("#addWord").unbind("click");
         $(".err").hide();

          for (var i=1;i<=nWords;i++) {
	        console.log($("#word" + i).val());          	
            responses.push($("#word" + i).val());
          }
		 $("#word1").val("");
    	 $("#word2").val("");        
		 experiment.data["prodtrials"].push(responses);
          if (pcounter+1 < order.length) {
			pcounter++;
            experiment.productiontrial(pcounter);
          } else {
            experiment.questionaire();
          }
      } else {
        $(".err").show();
      }
    })      
  },
  
    instructions2: function() {  
	   trialnum ++;        	  	
      showSlide("instructions2");  
    $('.bar').css('width', ( (100*(trialnum)/nSlides) + "%"));
	    $("#ins2").html("<p class='block-text'>In this part, you will see the same sentences as before. But this time, try to guess what a speaker who uttered the sentence probably meant. For example:</p><p>Ann says	: <b>Max, who is a clown, is funny.</b></p><p class='block-text'>Does Ann mean that Max is not hilarious?</p>");  	     
      	$("#ins2button").click(function() { experiment.comprehensiontrial(ccounter); })
  },

  
  comprehensiontrial: function(ccounter) {
	trialnum ++;
	// show progress bar
    $('.bar').css('width', ( (100*(trialnum)/nSlides) + "%"));
    $(".err").hide();
    showSlide("comprehensiontrial");
    var response = -555;
    $(".tsentence").html(tsentences[ccounter]);
    $(".speaker").html(speakers[ccounter]['speaker']);  
    $(".compquestion").html(compquestions[ccounter]);            
    $(".pronoun").html(speakers[ccounter]['pronoun']);                

    var responses = [];
    var nResponses = 0;
    
    $(".cslider").html('<div id="slidy'+ccounter+'" align="center"></div>');
    
    function bowlChangeCreator(ind, caseLabel) {
		return function(value) {
		if (response == -555)
		{
			nResponses++;
		}				
		response = $("#"+caseLabel).slider("value");		
		$("#"+caseLabel).css({"background":"#E6E6E6",
		"border-color": "#001F29"});
      	$("#"+caseLabel+" .ui-slider-handle").css({
      		"background":"#E62E00",
			"border-color": "#001F29" }); 		
		}
	} 
	
	$("#slidy"+ccounter).slider({	
               animate: "fast",
               orientation: "horizontal",
               max: 1 , 
               min: 0, 
               step: 0.01, 
               value: 0.5,               
               change: bowlChangeCreator(ccounter, "slidy"+ccounter)
					
    });

    // only proceed if all sliders tapped
    $("#compcontinue").click(function() {
     if ( nResponses < 1 ) {   	
       $(".err").show();
     } else {
     	console.log(response);
		experiment.data["comptrials"].push(response);
       $("#compcontinue").unbind("click");
       if (ccounter+1 < tsentences.length) {
			ccounter++;
            experiment.comprehensiontrial(ccounter);
       } else {       
       experiment.instructions3();
       }
     }
    });        
  },
  
 

    instructions3: function() {    
	trialnum ++;    		
      showSlide("instructions3");
    $('.bar').css('width', ( (100*(trialnum)/nSlides) + "%"));
	    $("#ins3").html("<p class='block-text'>In this part, you will be asked to rate how probable you think something is. For example:</p><p><b>What are clowns like?</b></p><p class='block-text'>Are they very likely to be funny or very unlikely to be funny, or somewhere in between?</p>");  	     
      	$("#ins3button").click(function() { experiment.priortrial(prcounter); })
  }, 
  
  
    priortrial: function(prcounter) {
	trialnum ++;
	// show progress bar
    $('.bar').css('width', ( (100*(trialnum)/nSlides) + "%"));
    $(".err").hide();
    showSlide("priortrial");
    var response = -555;

    $(".pq1").html("<b>"+lowpriorquestions[prcounter]+"</b>");
    $(".pq2").html("<b>"+highpriorquestions[prcounter]+"</b>"); 
    $(".sword").html(strongalts[prcounter]);      

    var responses = {};
    var nResponses = 0;
    
    $(".highpslider").html('<div id="hslidy'+prcounter+'" align="center"></div>');
    $(".lowpslider").html('<div id="lslidy'+prcounter+'" align="center"></div>');
    
    function bowlChangeCreator(ind, caseLabel) {
		return function(value) {
		if (response == -555)
		{
			nResponses++;
		}				
		responses[ind] = $("#"+caseLabel).slider("value");		
		$("#"+caseLabel).css({"background":"#E6E6E6",
		"border-color": "#001F29"});
      	$("#"+caseLabel+" .ui-slider-handle").css({
      		"background":"#E62E00",
			"border-color": "#001F29" }); 		
		}
	} 
	
	$("#hslidy"+prcounter).slider({	
               animate: "fast",
               orientation: "horizontal",
               max: 1 , 
               min: 0, 
               step: 0.01, 
               value: 0.5,               
               change: bowlChangeCreator("high", "hslidy"+prcounter)
					
    });
    
	$("#lslidy"+prcounter).slider({	
               animate: "fast",
               orientation: "horizontal",
               max: 1 , 
               min: 0, 
               step: 0.01, 
               value: 0.5,               
               change: bowlChangeCreator("low", "lslidy"+prcounter)
					
    });    

    // only proceed if all sliders tapped
    $("#priorcontinue").click(function() {
     if ( nResponses < 2 ) {   	
       $(".err").show();
     } else {
     	console.log(responses);
		experiment.data["priortrials"].push(responses);
       $("#priorcontinue").unbind("click");
       if (prcounter+1 < tsentences.length) {
			prcounter++;
            experiment.priortrial(prcounter);
       } else {       
       experiment.questionaire();
       }
     }
    });        
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
        setTimeout(function() { turk.submit(experiment.data) }, 1000);
    }
    });
  }
};