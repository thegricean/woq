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
  // Might make it a global variable. Anyways.
  var num_options = 10;

  var slides = {};
  // var top30 = ["most","some","many","almost all","a few","all","half","few","less than half","a lot","none","several","the majority","about half","more than half","a majority","very few","less","a small amount","more","a couple","nearly all","majority","greater","not many","all visible","almost none","five","one","little"];

  // Needed to clear out the number terms "five" and "one"
  var top30 = ["most","some","many","almost all","a few","all","half","few","less than half","a lot","none","several","the majority","about half","more than half","a majority","very few","less","a small amount","more","a couple","nearly all","greater","not many","almost none","a good deal", "lots", "quite a few", "a minority", "a small percentage"];

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

  slides.example1 = slide({
    name: "example1",
    present: exp.all_stims,

    start: function () {
    },

    present_handle: function (stim) {
      this.trial_start = Date.now();
      draw("situation1", 100, 25, "#000000", "#FFFFFF");
    },

    // This is the "Continue" button.
    button: function () {
      // // Go to the next trial.
      // _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.example2 = slide({
    name: "example2",
    present: exp.all_stims,

    start: function () {
    },

    present_handle: function (stim) {
      this.trial_start = Date.now();
      draw("situation2", 50, 50, "#FFFFFF", "#000000");
    },

    // This is the "Continue" button.
    button: function () {
      // // Go to the next trial.
      // _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.example3 = slide({
    name: "example3",
    present: exp.all_stims,

    start: function () {
    },

    present_handle: function (stim) {
      this.trial_start = Date.now();
      draw("situation3", 10, 5, "#FFFFFF", "#000000");
    },

    // This is the "Continue" button.
    button: function () {
      // // Go to the next trial.
      // _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.example4 = slide({
    name: "example4",
    // present: exp.all_stims,

    start: function () {
    },

    present_handle: function (stim) {
      this.trial_start = Date.now();
      draw("situation4", 10, 0, "#000000", "#FFFFFF");
    },

    // This is the "Continue" button.
    button: function () {
      // // Go to the next trial.
      // _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.question = slide({
    name: "question",
    present: exp.all_stims,

    start: function () {
      $(".err-no-input").hide();
      $(".err-no-quantifier").hide();
    },

    present_handle: function (stim) {
      this.trial_start = Date.now();
      // draw("", 0, 10, "#000000", "#FFFFFF");
      this.stim = stim;
    },

    // This is the "Continue" button.
    button: function () {
      var responseInput = $(".response-input").val();
      var nativeLang = $(".native-lang").val();
      if (responseInput.length <= 0 || nativeLang.length <= 0) {
        $(".err-no-input").show();
      } else if (responseInput.split("*").length - 1  <= 1 && (responseinput.indexOf("No") == -1 || responseinput.indexOf("no") == -1)) {
        $(".err-no-quantifier").show();
      } else {
        this.stim.response = responseInput;
        this.stim.nativeLang = nativeLang;
        this.log_responses();
        // Go to the next trial.
        // _stream.apply(this); //use exp.go() if and only if there is no "present" data.
        exp.go();
      }
    },

    log_responses: function () {
      exp.data_trials.push({
        "response": this.stim.response,
        "nativeLanguage": this.stim.nativeLang,
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
        "time_in_minutes": (Date.now() - exp.startT) / 60000
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
  // This function is called when the sequence of experiments is generated, further down in the init() function.
  function makeStim(i, n) {
    // Make it only black and white
    var colors = ([{color: "#000000", colorword: "black"}, {color: "#FFFFFF", colorword: "white"}]);
    var shuffled = _.shuffle(colors);
    color_target = shuffled[0];
    color_other = shuffled[1];

    // console.log("makeStim is called. The target color is " + color_target.colorword + ". The other color is " + color_other.colorword);

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
        random_ints = [0, 1, 2, 3, 4, 5];
        break;
      case 10:
        random_ints = [getRandomInt(0, 3), getRandomInt(3, 5), getRandomInt(5, 7), getRandomInt(7, 9), getRandomInt(9, 11)];
        break;
      case 25:
        random_ints = [getRandomInt(0, 6), getRandomInt(6, 11), getRandomInt(11, 16), getRandomInt(16, 21), getRandomInt(21, 26)];
        break;
      case 100:
        random_ints = [getRandomInt(0, 11), getRandomInt(11, 21), getRandomInt(21, 31), getRandomInt(31, 41), getRandomInt(41, 51), getRandomInt(51, 61), getRandomInt(61, 71), getRandomInt(71, 81), getRandomInt(81, 91), getRandomInt(91, 101)];
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
      exp.all_stims.push(makeStim(intervals[i], n_totals[n]));
    }
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
  exp.structure = ["i0", "example1", "example2", "example3", "example4", "question",'subj_info', 'thanks'];
  // exp.structure = ["i0", "examples", "question", "thanks"];

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