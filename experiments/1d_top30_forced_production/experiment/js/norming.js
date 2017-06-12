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
// 	preload(
// ["images/bathrobe.png","images/belt.jpg"],
// {after: function() { console.log("everything's loaded now") }}
// )

  // var top30 = ["most","some","many","almost all","a few","all","half","few","less than half","a lot","none","several","the majority","about half","more than half","a majority","very few","less","a small amount","more","a couple","nearly all","majority","greater","not many","all visible","almost none","five","one","little"];

  // Needed to clear out the number terms "five" and "one"
  var top30 = ["most","some","many","almost all","a few","all","half","few","less than half","a lot","none","several","the majority","about half","more than half","a majority","very few","less","a small amount","more","a couple","nearly all","majority","greater","not many","all visible","almost none","little","minority","a good deal"];

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
      // In this version we also need to prepare for the next trial right at the beginning.
      // Needed this hack to get around the problem that at this time `this.stim` is undefined.
      this.prepare_next_trial(exp.all_stims[0].n_target / exp.all_stims[0].n_total);
      $(".err").hide();
    },

    present_handle: function (stim) {
      this.trial_start = Date.now();
      this.stim = stim;
      console.log(this.stim);

      var blanksentence = "How would you describe the <strong>number of <span style='color:" + this.stim.color_target.color + "; background:lightgrey'>" + this.stim.color_target.colorword + "</span> dots</strong> to someone who has not seen the picture? <p>Please select all descriptions that fit.";
      //$("#contextsentence").html(contextsentence);
      $(".blanksentence").html(blanksentence);
      $(".color-word").attr("style", "color:" + this.stim.color_target.color + "; background:lightgrey");
      $(".color-word").text(this.stim.color_target.colorword);
      draw("situation", this.stim.n_total, this.stim.n_target, this.stim.color_target.color, this.stim.color_other.color);
    },

    some_option_selected: function () {
      return ($(".checkbox1").is(':checked') || $(".checkbox2").is(':checked') || $(".checkbox3").is(':checked') || $(".checkbox4").is(':checked') || $(".checkbox5").is(':checked') || $(".checkbox6").is(':checked') || $(".checkbox7").is(':checked') || $(".checkbox8").is(':checked') || $(".checkbox9").is(':checked') || $(".checkbox10").is(':checked'))
    },

    cur_selected: [],

    // Will need to shuffle the options.
    // Function from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    shuffle: function(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    },

    prepare_next_trial: function(proportion) {
      this.cur_selected = [];

      // Here we get the most common word for this scenario.
      var most_frequent = "";
      // This parameter is used at the first slide.
      var proportion = proportion? proportion: this.stim.n_target / this.stim.n_total;
      if (proportion == 0) {
        most_frequent = "none";
      } else if (proportion <= 0.1) {
        most_frequent = "few";
      } else if (proportion <= 0.2) {
        // "few" and "a few" have the same frequency in the previous results.
        most_frequent = "a few";
      } else if (proportion <= 0.3) {
        most_frequent = "some";
      } else if (proportion <= 0.4) {
        most_frequent = "some";
      } else if (proportion < 0.5) {
        most_frequent = "some";
      } else if (proportion == 0.5) {
        most_frequent = "half";
      } else if (proportion <= 0.6) {
        most_frequent = "most";
      } else if (proportion <= 0.7) {
        most_frequent = "most";
      } else if (proportion <= 0.8) {
        most_frequent = "most";
      } else if (proportion <= 0.9) {
        most_frequent = "most";
      } else if (proportion < 1) {
        // "almost all" and "most" have the same frequency in the previous results.
        most_frequent = "almost all";
      } else if (proportion == 1) {
        most_frequent = "all";
      }

      // Put the most frequent word in.
      this.cur_selected.push(most_frequent);

      // Randomly select 9 other words.
      var _tmp = top30.slice();
      // First remove the previously determined most frequent word in this scenario.
      var mfIndex = _tmp.indexOf(most_frequent);
      if (mfIndex > -1) {
        _tmp.splice(mfIndex, 1);
      }
      for (var count = 0; count < 9; count++) {
        var index = Math.floor(Math.random() * _tmp.length);
        var removed = _tmp.splice(index, 1);
        this.cur_selected.push(removed[0]);
      }

      this.shuffle(this.cur_selected);

      // This step is fine.
      // console.log("Should have selected 10 words.");
      // console.log("The words are " + this.cur_selected);

      $(".option1").html(this.cur_selected[0]);
      $(".option2").html(this.cur_selected[1]);
      $(".option3").html(this.cur_selected[2]);
      $(".option4").html(this.cur_selected[3]);
      $(".option5").html(this.cur_selected[4]);
      $(".option6").html(this.cur_selected[5]);
      $(".option7").html(this.cur_selected[6]);
      $(".option8").html(this.cur_selected[7]);
      $(".option9").html(this.cur_selected[8]);
      $(".option10").html(this.cur_selected[9]);

      // Note that jQuery class selector by default returns an array. You'll need to get to the first element in order to set its attribute.
      $(".checkbox1")[0].checked = false;
      $(".checkbox2")[0].checked = false;
      $(".checkbox3")[0].checked = false;
      $(".checkbox4")[0].checked = false;
      $(".checkbox5")[0].checked = false;
      $(".checkbox6")[0].checked = false;
      $(".checkbox7")[0].checked = false;
      $(".checkbox8")[0].checked = false;
      $(".checkbox9")[0].checked = false;
      $(".checkbox10")[0].checked = false;
      _stream.apply(this); //use exp.go() if and only if there is no "present" data.
    },

    get_selections: function() {
      selections = [];
      for (var count = 0; count < 10; count++) {
        selections.push($(".checkbox1").is(':checked'));
        selections.push($(".checkbox2").is(':checked'));
        selections.push($(".checkbox3").is(':checked'));
        selections.push($(".checkbox4").is(':checked'));
        selections.push($(".checkbox5").is(':checked'));
        selections.push($(".checkbox6").is(':checked'));
        selections.push($(".checkbox7").is(':checked'));
        selections.push($(".checkbox8").is(':checked'));
        selections.push($(".checkbox9").is(':checked'));
        selections.push($(".checkbox10").is(':checked'));
      }
      console.log(selections);
      return selections;
    },

    // This is the "Continue" button.
    button: function () {
      if (this.some_option_selected()) {
        selections = this.get_selections();
        response = [];
        for (var count = 0; count < 10; count++) {
          if (selections[count]) {
            response.push(this.cur_selected[count]);
          }
        }
        this.stim.response = response;
        $(".err").hide();
        this.log_responses();
        // prepare for the next trial.
        this.prepare_next_trial();
      } else { // Some of the blanks are left empty.
        $(".err").show();
      }
    },

    log_responses: function () {
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase,
        "rt": Date.now() - _s.trial_start,
        "response": this.stim.response,
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
