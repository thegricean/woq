// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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

function getPoints(n_total,n_target,tcolor,ocolor) {
  var points = [];
  var initpointlocations = getPointLocations(n_total);
  var targetcolor = tcolor;//acolors[cnt].color;
  var othercolor = ocolor;//bcolors[cnt].color;
  var pointcolors = _.shuffle(fillArray(targetcolor,n_target).concat(fillArray(othercolor,n_total-n_target)));
  console.log(n_total,n_target)
  console.log(pointcolors);
  var points = [];
  for (var i=0; i < n_total; i++) {
    samp = sampleMarblePosition(initpointlocations[i],6);
    points[i] = {x:samp.x,y:samp.y,color:pointcolors[i]};
  }
  return points;
}

function draw(id,n_total,n_target,tcolor,ocolor){
  var canvas = document.getElementById(id);
  if (canvas.getContext){
    var ctx = canvas.getContext("2d");
    canvas.width = 200;
    canvas.height = 150;     

  //paint the rectangle
    var x = canvas.width / 2;
    var y = canvas.height / 4
    var counterClockwise = true;
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = 'black';
    ctx.stroke();

  //paint the marbles
  points = getPoints(n_total,n_target,tcolor,ocolor); 
  for (var i=0; i < points.length; i++) {
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, 5, 0, 2*Math.PI, true);
    ctx.fillStyle = points[i].color;
    ctx.closePath();
    ctx.fill();
  }
  }
}

function make_slides(f) {
  var   slides = {};
// 	preload(
// ["images/bathrobe.png","images/belt.jpg"],
// {after: function() { console.log("everything's loaded now") }}
// )  

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.objecttrial = slide({
    name : "objecttrial",
    present : exp.all_stims,

    start : function() {
    	$(".err").hide();
      //$("#word1").val("");
      //$("#word2").val("");
    },

    present_handle : function(stim) {
      this.trial_start = Date.now();
	    this.stim = stim;
	    console.log(this.stim);      

    	var contextsentence = "How would you describe this situation? Please provide at least two expressions (can be more than one word each) to fill in the blank.";
      var blanksentence = "<strong>__________ dots are "+this.stim.color_target.colorword+".</strong>";
    	$("#contextsentence").html(contextsentence);
      $(".blanksentence").html(blanksentence);
      draw("situation",this.stim.n_total,this.stim.n_target,this.stim.color_target.color,this.stim.color_other.color);          
	   },

  	button : function() {
      var word1 = $(".word1").val();
      var word2 = $(".word2").val(); 
      console.log(word1);
      this.stim.response = [word1,word2];     
      if (word1.length > 0 && word2.length > 0) {
         $(".err").hide();
         this.log_responses();
         $(".word1").val("");
         $(".word2").val("");         
         _stream.apply(this); //use exp.go() if and only if there is no "present" data.
       } else {
         $(".err").show();
       }
    },
    
    log_responses : function() {
        exp.data_trials.push({
        "label" : this.stim.label,
        "slide_number_in_experiment" : exp.phase,
        "item": this.stim.item,
        "rt" : Date.now() - _s.trial_start,
	      "response" : this.stim.response,
	      "color_target": this.stim.color_target.colorword,
        "color_other": this.stim.color_other.colorword,        
	      "n_total": this.stim.n_total,
        "n_target": this.stim.n_target
        });
    }
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {

  function makeStim(i,n) {
    var acolor = _.shuffle([{color:"#0066FF",colorword:"blue"},
      {color:"#00CC00",colorword:"green"},{color:"#800080",colorword:"purple"},
      {color:"#000000",colorword:"black"},{color:"#808080",colorword:"gray"}])[0];//
    var bcolor = _.shuffle([{color:"#E60000",colorword:"red"},{color:"#FF70DB",colorword:"pink"},
      {color:"#FF9147",colorword:"orange"},{color:"#FFFF00",colorword:"yellow"},
      {color:"#8B4513",colorword:"brown"}])[0];
    console.log(acolor);
    console.log(bcolor);    

    var shuffled = _.shuffle([acolor,bcolor]);
    color_target = shuffled[0];
    color_other = shuffled[1];
      
    return {
	   "n_total": n,
	   "n_target": i,
	   "color_target": color_target,
	   "color_other": color_other
    }
  }

  function getIntervals(n) {
    var random_ints = [];
    switch (n) {
      case 5:
        random_ints = [0,1,2,3,4,5];
        break;
      case 10:
        random_ints = [getRandomInt(0,3),getRandomInt(3,5),getRandomInt(5,7),getRandomInt(7,9),getRandomInt(9,11)];
        break;
      case 25:
        random_ints = [getRandomInt(0,6),getRandomInt(6,11),getRandomInt(11,16),getRandomInt(16,21),getRandomInt(21,26)];
        break;
      case 100:
        random_ints = [getRandomInt(0,11),getRandomInt(11,21),getRandomInt(21,31),getRandomInt(31,41),getRandomInt(41,51),getRandomInt(51,61),getRandomInt(61,71),getRandomInt(71,81),getRandomInt(81,91),getRandomInt(91,101)];
        break;
    }
    return random_ints;
  }

  exp.all_stims = [];
  var n_totals = [5, 10, 25, 100];
  for (var n = 0; n < n_totals.length; n++) {
    console.log(n_totals[n]);
    var intervals = getIntervals(n_totals[n]);
    console.log(intervals);
    for (var i = 0; i < intervals.length; i++) {
      exp.all_stims.push(makeStim(intervals[i],n_totals[n]));
    }
  } 
  exp.all_stims = _.shuffle(exp.all_stims);

	console.log(exp.all_stims);
  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "objecttrial", 'subj_info', 'thanks'];
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined
  $(".nQs").html(exp.nQs);

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}
