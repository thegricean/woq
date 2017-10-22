// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

function uniform(a, b) {
  return ( (Math.random() * (b - a)) + a );
}

function sampleMarblePosition(center, r) {
  var sampledR = uniform(0, r);
  var sampledTheta = uniform(0, Math.PI); //in radians
  var point = {radius: sampledR, theta: sampledTheta};
  return rect(point, center);
}

//convert to rectangular coordinates
function rect(point, center) {
  var x = center.x + point.radius * Math.cos(point.theta);
  var y = center.y + point.radius * Math.sin(point.theta);
  return {x: x, y: y};
}

function get100Points(n_total, n_target, tcolor, ocolor, w, h, radius) {
  var points = [];
  var targetcolor = tcolor;
  var othercolor = ocolor;
  var pointcolors = _.shuffle(fillArray(targetcolor, n_target).concat(fillArray(othercolor, n_total - n_target)));

  var pcnt = 0;
  var y = 24.5;

  for (var i = 0; i < 4; i++) {
    for (var x = 23; x < 600; x += 46) {
      points.push({x: x + uniform(-13, 13), y: y + uniform(-13, 13), color: pointcolors[pcnt]});
      pcnt++;
    }
    y = y + 49;
    for (var x = 24.5; x < 600; x += 49) {
      points.push({x: x + uniform(-13, 13), y: y + uniform(-13, 13), color: pointcolors[pcnt]});
      pcnt++;
    }
    y = y + 49;
  }

  return points;
}

function get5Points(n_total, n_target, tcolor, ocolor, w, h, radius) {
  var points = [];
  var targetcolor = tcolor;
  var othercolor = ocolor;
  var pointcolors = _.shuffle(fillArray(targetcolor, n_target).concat(fillArray(othercolor, n_total - n_target)));

  var pcnt = 0;

  points.push({x: 100 + uniform(-70, 70), y: 100 + uniform(-60, 60), color: pointcolors[pcnt]});
  pcnt++;
  points.push({x: 300 + uniform(-70, 70), y: 100 + uniform(-60, 60), color: pointcolors[pcnt]});
  pcnt++;
  points.push({x: 500 + uniform(-70, 70), y: 100 + uniform(-60, 60), color: pointcolors[pcnt]});
  pcnt++;
  points.push({x: 150 + uniform(-90, 90), y: 300 + uniform(-60, 60), color: pointcolors[pcnt]});
  pcnt++;
  points.push({x: 350 + uniform(-90, 90), y: 300 + uniform(-60, 60), color: pointcolors[pcnt]});

  return points;
}

function get10Points(n_total, n_target, tcolor, ocolor, w, h, radius) {
  var points = [];
  var targetcolor = tcolor;
  var othercolor = ocolor;
  var pointcolors = _.shuffle(fillArray(targetcolor, n_target).concat(fillArray(othercolor, n_total - n_target)));

  var pcnt = 0;
  var cnt = 0
  for (var y = 67; y < 400; y += 133) {
    if (cnt % 2 == 0) {
      for (var x = 100; x < 600; x += 200) {
        points.push({x: x + uniform(-80, 80), y: y + uniform(-40, 40), color: pointcolors[pcnt]});
        pcnt++;
      }
    } else {
      for (var x = 75; x < 600; x += 150) {
        points.push({x: x + uniform(-60, 60), y: y + uniform(-40, 40), color: pointcolors[pcnt]});
        pcnt++;
      }
    }
    cnt++;
  }
  return points;
}

function get25Points(n_total, n_target, tcolor, ocolor, w, h, radius) {
  var points = [];
  var targetcolor = tcolor;
  var othercolor = ocolor;
  var pointcolors = _.shuffle(fillArray(targetcolor, n_target).concat(fillArray(othercolor, n_total - n_target)));

  var pcnt = 0;

  for (var y = 40; y < 400; y += 80) {
    for (var x = 60; x < 600; x += 120) {
      points.push({x: x + uniform(-30, 30), y: y + uniform(-25, 25), color: pointcolors[pcnt]});
      pcnt++;
    }
  }
  return points;
}

function getPoints(n_total, n_target, tcolor, ocolor, w, h, radius) {
  console.log("width: " + w);
  console.log("height: " + h);
  //var initpointlocations = getPointLocations(n_total),w,h;
  var targetcolor = tcolor;//acolors[cnt].color;
  var othercolor = ocolor;//bcolors[cnt].color;
  var pointcolors = _.shuffle(fillArray(targetcolor, n_target).concat(fillArray(othercolor, n_total - n_target)));
  //console.log(n_total,n_target)
  //console.log(pointcolors);
  var points = [];
  var x = uniform(radius * 2, w - radius * 2);
  var y = uniform(radius * 2, h - radius * 2);
  points.push({x: x, y: y, color: pointcolors[0]});

  for (var i = 1; i < n_total; i++) {
    console.log(i);
    var goodpointfound = false;
    while (!goodpointfound) {
      console.log(points);
      //samp = sampleMarblePosition(initpointlocations[i],6);
      var x = uniform(radius * 2, w - radius * 2);
      var y = uniform(radius * 2, h - radius * 2);
      console.log("x: " + x);
      console.log("y: " + y);

      var cnt = 0;
      for (var p = 0; p < points.length; p++) {
        console.log(Math.abs(points[p].x - x));
        console.log(Math.abs(points[p].y - y));
        // console.log(radius*4);
        if (Math.abs(points[p].x - x) < radius * 1.5 || Math.abs(points[p].y - y) < radius * 1.5) {
          break;
          //console.log("increased cnt: "+cnt+" out of a total of "+points.length);
        } else {
          cnt++;
        }
      }
      if (cnt == points.length) {
        console.log("found a good point");
        goodpointfound = true;
        points.push({x: x, y: y, color: pointcolors[i]});
      } else {
        console.log("start over");
      }
    }
  }

  console.log(points);
  console.log(n_total);
  return points;
}

function draw(id, n_total, n_target, tcolor, ocolor) {
  var canvas = document.getElementById(id);
  canvas.style.background = "lightgrey"; // Useful in the case of black/white colors.
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 400;
    var radius = 0;

    if (n_total < 25) {
      radius = 150 / n_total;
    } else {
      if (n_total == 25) {
        radius = 10;
      } else {
        radius = 6;
      }
    }

    //paint the rectangle
    // var x = canvas.width / 2;
    // var y = canvas.height / 4
    var counterClockwise = true;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    //paint the marbles
    if (n_total == 5) {
      points = get5Points(n_total, n_target, tcolor, ocolor, canvas.width, canvas.height, radius);
    } else {
      if (n_total == 10) {
        points = get10Points(n_total, n_target, tcolor, ocolor, canvas.width, canvas.height, radius);
      } else {
        if (n_total == 25) {
          points = get25Points(n_total, n_target, tcolor, ocolor, canvas.width, canvas.height, radius);
        } else {
          points = get100Points(n_total, n_target, tcolor, ocolor, canvas.width, canvas.height, radius);
        }
      }
    }
    for (var i = 0; i < points.length; i++) {
      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = points[i].color;
      ctx.closePath();
      ctx.fill();
    }
  }
}

function make_slides(f) {
  var slides = {};

  slides.i0 = slide({
    name: "i0",
    start: function () {
      exp.startT = Date.now();
    }
  });

  // Actually we don't seem to have used this slide in this version of the trial. The instructions are just simply at each page.
  slides.instructions = slide({
    name: "instructions",
    button: function () {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  // This is the body of the trial slides.
  slides.objecttrial = slide({
    name: "objecttrial",
    present: exp.all_stims,

    start: function () {
      $(".err").hide();
    },

    present_handle: function (stim) {
      this.trial_start = Date.now();
      this.stim = stim;
      console.log(this.stim);

      // Clear the checkboxes
      document.getElementById('responseTrue').checked = false;
      document.getElementById('responseFalse').checked = false;

      var picturedescription = "<u><b>" + this.stim.target_quantifier + "</b> of the dots in the picture are <span style='color:" + this.stim.color_target.color + "; background:lightgrey'>" + this.stim.color_target.colorword + "</span></u>";
      //$("#contextsentence").html(contextsentence);
      $(".picturedescription").html(picturedescription);
      // $(".color-word").attr("style", "color:" + this.stim.color_target.color + "; background:lightgrey");
      // $(".color-word").text(this.stim.color_target.colorword);
      draw("situation", this.stim.n_total, this.stim.n_target, this.stim.color_target.color, this.stim.color_other.color);
    },

    some_option_selected: function () {
      return (document.getElementById('responseTrue').checked || document.getElementById('responseFalse').checked)
    },

    get_response: function() {
      if(document.getElementById('responseTrue').checked) {
        // Do I return a string or a boolean value?
        // Apparently Submiterator has some issues with anything that is not string...
        return "true";
      }else if(document.getElementById('responseFalse').checked) {
        return "false";
      }
    },

    // This is the "Continue" button.
    button: function () {
      if (this.some_option_selected()) {
        this.stim.response = this.get_response();
        $(".err").hide();
        this.log_responses();
        // Go to the next trial.
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else { // The participant didn't select true or false.
        $(".err").show();
      }
    },

    log_responses: function () {
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase,
        "rt": Date.now() - _s.trial_start,
        "response": this.stim.response,
        "target_quantifier": this.stim.target_quantifier,
        "target_language": exp.language,
        "color_target": this.stim.color_target.colorword,
        "color_other": this.stim.color_other.colorword,
        "n_total": this.stim.n_total,
        "n_target": this.stim.n_target
      });
    }
  });

  slides.subj_info = slide({
    name: "subj_info",
    submit: function (e) {
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language: $("#language").val(),
        languages: $("#languages").val(),
        count: $("#count").val(),
        enjoyment: $("#enjoyment").val(),
        asses: $('input[name="assess"]:checked').val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
        education: $("#education").val(),
        colorblind: $("#colorblind").val(),
        comments: $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name: "thanks",
    start: function () {
      exp.data = {
        "trials": exp.data_trials,
        "catch_trials": exp.catch_trials,
        "system": exp.system,
        "condition": exp.condition,
        "subject_information": exp.subj_data,
        "time_in_minutes": (Date.now() - exp.startT) / 60000,

        // These three entries are needed for the custom backend.
        // "experiment_id": "binary-test",
        // "author": "JI Xiang",
        // "description": "Test for data collection of the binary-choice experiment."
      };
      setTimeout(function () {
        turk.submit(exp.data);
      }, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  // Should add some listener/event handler on the True and False options.
  document.onkeydown = function(e) {
      e = e || window.event;
      if (e.keyCode == 65) {
        document.getElementById('responseTrue').checked = true;
        // Might not automatically advance for now, since it might make it too easy for the participant to skip it all.
        // _s.button();
      } else if (e.keyCode == 68) {
        document.getElementById('responseFalse').checked = true;
        // _s.button();
      } else if (e.keyCode == 13) {
        _s.button();
      }
  };
  // This function is called when the sequence of experiments is generated, further down in the init() function.
  function makeStim(num_target_dots, num_total_dots, target_quantifier) {
    // Make it only black and white
    var colors = ([{color: "#000000", colorword: "black"}, {color: "#FFFFFF", colorword: "white"}]);
    var shuffled = _.shuffle(colors);
    var color_target = shuffled[0];
    var color_other = shuffled[1];

    // console.log("makeStim is called. The target color is " + color_target.colorword + ". The other color is " + color_other.colorword);

    return {
      "n_total": num_total_dots,
      "n_target": num_target_dots,
      "color_target": color_target,
      "color_other": color_other,
      "target_quantifier": target_quantifier
    }
  }

  exp.all_stims = [];

  // These two will be changeable.
  exp.language = "English";
  var num_dots = 25;

  var flat_prior = function(number_of_states) {
    var dist = Array(number_of_states)
    for (var count = 0; count < dist.length; count++) {
      dist[count] = 1
    }
    return dist
  }

  var all_quantifiers = [
    "most",
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
  ]

  // We should provide a probability distribution independently for each word, and let the `init` function generate the trial states at each participant. We should take care to make sure that there is no repeated states.
  var prob_dists = {};
  // Here I'm just giving it a flat prior. Later the probability distribution will be directly supplied from external computation (e.g. in R).
  for (var count = 0; count < all_quantifiers.length; count++) {
    var dist = flat_prior(num_dots + 1);
    prob_dists[all_quantifiers[count]] = dist;
  }

  var all_trials = [];
  for (var count = 0; count < all_quantifiers.length; count++) {
    var dist = SJS.Discrete(prob_dists[all_quantifiers[count]]);
    var s1 = dist.draw();
    var s2 = dist.draw();
    while (s2 === s1) {
      s2 = dist.draw();
    }
    exp.all_stims.push(makeStim(s1, num_dots, all_quantifiers[count]));
    exp.all_stims.push(makeStim(s2, num_dots, all_quantifiers[count]));
  }

  exp.all_stims = _.shuffle(exp.all_stims);

  console.log(exp.all_stims);
  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
    Browser: BrowserDetect.browser,
    OS: BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width
  };
  //blocks of the experiment:
  exp.structure = ["i0", "objecttrial", 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
  //relies on structure and slides being defined
  $(".nQs").html(exp.nQs);

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function () {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function () {
        $("#mustaccept").show();
      });
      exp.go();
    }
  });

  exp.go(); //show first slide
}
