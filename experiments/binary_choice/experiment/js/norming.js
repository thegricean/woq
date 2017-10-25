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

  // We should provide a probability distribution independently for each word, and generate the trial states separately for each participant. We should take care to make sure that there is no repeated states.
  // Round 1
  // Here I'm just giving it a flat prior. Later the probability distribution will be directly supplied from external computation (e.g. in R).
  // var prob_dists = {};
  // for (var count = 0; count < all_quantifiers.length; count++) {
  //   var dist = flat_prior(num_dots + 1);
  //   prob_dists[all_quantifiers[count]] = dist;
  // }

  // Round 2:
  // var prob_dists = {"most":[0.0071,0.0072,0.0072,0.0071,0.0068,0.0069,0.0068,0.0068,0.0068,0.0069,0.0069,0.0067,0.0067,0.0068,0.29,0.1318,0.063,0.0319,0.0172,0.028,0.0518,0.0726,0.0796,0.0688,0.046,0.0225],"some":[0.0163,0.0744,0.1443,0.1468,0.0787,0.0208,0.0168,0.0136,0.0133,0.0133,0.0133,0.0133,0.0133,0.0133,0.0132,0.0133,0.0133,0.0134,0.0134,0.0142,0.0151,0.016,0.0258,0.0429,0.0728,0.1552],"many":[0.0139,0.0139,0.014,0.014,0.0141,0.0141,0.0141,0.0147,0.0195,0.0264,0.1296,0.1454,0.0686,0.0493,0.0357,0.0261,0.0194,0.0145,0.014,0.014,0.0141,0.0149,0.0241,0.0401,0.0682,0.1633],"almost all":[0.0021,0.0021,0.0021,0.0021,0.0023,0.0024,0.0034,0.005,0.0076,0.0117,0.0186,0.0298,0.0485,0.0796,0.1319,0.2199,0.3687,0.005,0.0034,0.0025,0.0025,0.0025,0.004,0.0065,0.0111,0.0248],"a few":[0.0185,0.0308,0.0526,0.1345,0.0115,0.0115,0.0117,0.0119,0.0137,0.0452,0.0918,0.1291,0.1323,0.0992,0.0522,0.0221,0.019,0.0163,0.0141,0.0122,0.0119,0.0117,0.0115,0.0115,0.0115,0.0115],"all":[0.014,0.0112,0.014,0.0111,0.0115,0.0145,0.0121,0.0147,0.0122,0.0148,0.0126,0.0159,0.0161,0.0457,0.0777,0.0975,0.1043,0.0998,0.0829,0.0529,0.0295,0.0402,0.055,0.0585,0.0499,0.0315],"half":[0.0089,0.0089,0.009,0.0098,0.0107,0.0116,0.0209,0.0403,0.0808,0.1082,0.0547,0.0288,0.0161,0.0177,0.0196,0.0219,0.0245,0.0561,0.0582,0.0604,0.0626,0.102,0.095,0.0496,0.0129,0.0107],"few":[0.007,0.0527,0.0235,0.0152,0.0101,0.0069,0.0102,0.016,0.361,0.1983,0.1097,0.0613,0.0348,0.0201,0.012,0.0075,0.007,0.0066,0.0062,0.0058,0.0053,0.0049,0.0045,0.0045,0.0045,0.0045],"less than half":[0.044,0.0919,0.1297,0.1311,0.0949,0.0467,0.0146,0.0132,0.0201,0.0314,0.0504,0.1354,0.0264,0.0169,0.016,0.0152,0.0144,0.0136,0.0129,0.0122,0.0115,0.0115,0.0115,0.0115,0.0115,0.0115],"a lot":[0.015,0.015,0.015,0.015,0.0158,0.0167,0.025,0.0386,0.1767,0.0895,0.0561,0.0357,0.0232,0.0155,0.0155,0.0155,0.0155,0.0154,0.0154,0.0154,0.0154,0.0154,0.0161,0.023,0.1459,0.1387],"none":[0.8531,0.0818,0.0094,0.0012,0.0011,0.0012,0.0023,0.0043,0.0064,0.0075,0.0069,0.0049,0.0029,0.0015,0.0016,0.0013,0.001,0.001,0.0012,0.0011,0.0014,0.0014,0.0012,0.0015,0.0016,0.0014],"several":[0.0467,0.0974,0.1225,0.0976,0.0469,0.0108,0.0106,0.0103,0.0103,0.0103,0.0103,0.0103,0.0103,0.0106,0.0108,0.011,0.0113,0.0113,0.0113,0.0116,0.0139,0.0494,0.0994,0.1224,0.0964,0.0462],"the majority":[0.0135,0.0135,0.0138,0.0141,0.0144,0.017,0.0202,0.024,0.0288,0.0346,0.0417,0.0871,0.1488,0.1505,0.0903,0.047,0.0388,0.0322,0.0268,0.0224,0.0188,0.0159,0.0134,0.0136,0.0153,0.0435],"about half":[0.0108,0.0108,0.0111,0.0135,0.0165,0.0625,0.1178,0.1198,0.0661,0.0215,0.0178,0.0149,0.0125,0.0148,0.0176,0.0211,0.0654,0.1191,0.1189,0.065,0.0201,0.0164,0.0134,0.0111,0.0108,0.0108],"more than half":[0.0124,0.0124,0.0124,0.0124,0.0124,0.0124,0.0126,0.0129,0.0152,0.018,0.059,0.1167,0.1465,0.1222,0.0653,0.0266,0.0225,0.0191,0.0163,0.0139,0.0153,0.0167,0.0183,0.02,0.0505,0.1381],"a majority":[0.0116,0.0116,0.0116,0.0116,0.0116,0.0116,0.0119,0.0121,0.0124,0.0127,0.0129,0.0155,0.055,0.1109,0.1378,0.1104,0.0545,0.0143,0.012,0.0122,0.0168,0.0235,0.0333,0.0476,0.1219,0.1026],"very few":[0.1338,0.1476,0.0339,0.0237,0.0168,0.0168,0.0167,0.0167,0.0228,0.1367,0.149,0.0465,0.0329,0.0236,0.0172,0.0165,0.0159,0.0153,0.0147,0.0147,0.0147,0.0147,0.0147,0.0147,0.0147,0.0147],"a small amount":[0.2058,0.0245,0.0231,0.0217,0.0204,0.0192,0.018,0.0187,0.0194,0.0201,0.0208,0.0293,0.167,0.1666,0.0281,0.02,0.0192,0.0184,0.0177,0.0176,0.0175,0.0175,0.0174,0.0174,0.0174,0.0174],"a couple":[0.0204,0.1554,0.0954,0.0808,0.071,0.0648,0.1373,0.1175,0.0135,0.0147,0.0155,0.0158,0.0156,0.0149,0.0137,0.0144,0.0146,0.0143,0.0136,0.0142,0.0144,0.0142,0.0134,0.0138,0.0138,0.0133],"nearly all":[0.0095,0.0111,0.0131,0.0156,0.0159,0.0162,0.0192,0.0229,0.0274,0.0329,0.0396,0.0477,0.0577,0.0698,0.0847,0.0742,0.1081,0.0963,0.051,0.0156,0.0133,0.0113,0.0097,0.0101,0.0173,0.1098]};

  // Round 3
  var prob_dists = {"most":[0.023,0.023,0.023,0.023,0.023,0.023,0.023,0.023,0.023,0.023,0.023,0.023,0.023,0.0232,0.0263,0.0231,0.023,0.023,0.023,0.0231,0.0232,0.0246,0.0398,0.0662,0.1128,0.2697],"some":[0.0302,0.2098,0.0189,0.0177,0.0177,0.0177,0.0177,0.0177,0.0177,0.0177,0.0177,0.0177,0.0177,0.0177,0.0177,0.0177,0.0178,0.0179,0.018,0.019,0.0202,0.0214,0.0345,0.0573,0.0974,0.2075],"many":[0.0178,0.0178,0.0178,0.0178,0.0178,0.0178,0.0178,0.0186,0.0263,0.0377,0.1783,0.1628,0.0186,0.0178,0.0178,0.0178,0.0178,0.0178,0.0178,0.0178,0.0178,0.0179,0.0191,0.0204,0.0218,0.2112],"almost all":[0.015,0.015,0.015,0.015,0.0151,0.0151,0.0159,0.0167,0.0176,0.0185,0.0194,0.0284,0.0427,0.0653,0.1014,0.1775,0.176,0.0366,0.0245,0.0168,0.0161,0.0155,0.0174,0.0195,0.0219,0.0619],"a few":[0.0209,0.0211,0.0239,0.0584,0.0207,0.0207,0.0207,0.0207,0.0208,0.0217,0.0301,0.1953,0.2054,0.0482,0.034,0.0244,0.0235,0.0225,0.0217,0.0208,0.0207,0.0207,0.0207,0.0207,0.0207,0.0207],"all":[0.0139,0.0117,0.014,0.0117,0.0123,0.0151,0.013,0.0156,0.013,0.0156,0.013,0.0151,0.0123,0.012,0.012,0.0119,0.0116,0.0122,0.0146,0.0122,0.0117,0.0154,0.0826,0.1368,0.1094,0.3816],"half":[0.0135,0.0135,0.0135,0.0135,0.0136,0.0136,0.0137,0.0139,0.014,0.0207,0.0199,0.0192,0.0185,0.0362,0.0762,0.1681,0.3834,0.0267,0.0136,0.0135,0.0135,0.0135,0.0135,0.0135,0.0135,0.0135],"few":[0.033,0.2305,0.0239,0.025,0.0262,0.0274,0.0662,0.1739,0.0342,0.0307,0.0276,0.0247,0.0222,0.0199,0.0197,0.0195,0.0196,0.0196,0.0196,0.0196,0.0195,0.0195,0.0195,0.0195,0.0195,0.0195],"less than half":[0.1518,0.1591,0.0235,0.0164,0.0164,0.0164,0.0164,0.0174,0.0272,0.0439,0.0723,0.1931,0.0292,0.0186,0.0176,0.0167,0.0166,0.0165,0.0164,0.0164,0.0163,0.0163,0.0163,0.0163,0.0163,0.0163],"a lot":[0.0128,0.0128,0.0128,0.0128,0.0128,0.0128,0.0158,0.0195,0.0756,0.1413,0.1391,0.0717,0.0159,0.013,0.0129,0.0129,0.0129,0.0128,0.0128,0.0128,0.0128,0.0128,0.0128,0.0136,0.1512,0.1511],"none":[0.0384,0.0393,0.0389,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384,0.0384],"several":[0.0211,0.0359,0.2343,0.0212,0.0199,0.0198,0.0198,0.0198,0.0198,0.0198,0.0198,0.0198,0.0198,0.0199,0.02,0.0201,0.0202,0.0202,0.0202,0.0202,0.0203,0.0335,0.2346,0.037,0.0223,0.021],"the majority":[0.0344,0.0344,0.0344,0.0344,0.0344,0.0348,0.0351,0.0355,0.0358,0.0362,0.0365,0.0412,0.1155,0.0391,0.0347,0.0344,0.0344,0.0344,0.0344,0.0344,0.0344,0.0344,0.0344,0.0344,0.0348,0.0396],"about half":[0.0101,0.0101,0.0101,0.0101,0.0101,0.0134,0.0173,0.0215,0.0773,0.1195,0.1196,0.0804,0.0343,0.0572,0.102,0.1944,0.0208,0.0102,0.0101,0.0103,0.0101,0.0101,0.0103,0.0101,0.0101,0.0103],"more than half":[0.0203,0.0203,0.0203,0.0203,0.0203,0.0204,0.0215,0.0227,0.034,0.0525,0.2402,0.1198,0.075,0.0477,0.031,0.0207,0.0206,0.0205,0.0204,0.0203,0.0203,0.0203,0.0203,0.0203,0.0232,0.0264],"a majority":[0.021,0.021,0.021,0.021,0.021,0.0211,0.0219,0.0229,0.0238,0.0248,0.0259,0.0365,0.2024,0.2009,0.032,0.0228,0.0219,0.021,0.021,0.021,0.021,0.021,0.021,0.021,0.0237,0.0674],"very few":[0.0721,0.0295,0.0262,0.0259,0.0257,0.0258,0.0259,0.026,0.0278,0.3036,0.0275,0.0257,0.0256,0.0256,0.0256,0.0256,0.0256,0.0256,0.0256,0.0256,0.0256,0.0256,0.0256,0.0256,0.0256,0.0256],"a small amount":[0.0238,0.0467,0.0412,0.0364,0.0322,0.0285,0.0252,0.0265,0.0278,0.0292,0.0307,0.0508,0.2793,0.0389,0.0237,0.0236,0.0236,0.0236,0.0236,0.0236,0.0236,0.0236,0.0236,0.0236,0.0236,0.0236],"a couple":[0.0347,0.0986,0.0311,0.0311,0.0348,0.0388,0.0987,0.0776,0.0309,0.0309,0.0309,0.0309,0.0308,0.0308,0.0308,0.0308,0.0308,0.0308,0.0308,0.0308,0.0308,0.0308,0.0308,0.0308,0.0308,0.0308],"nearly all":[0.0203,0.0203,0.0203,0.0203,0.0203,0.0203,0.0203,0.0203,0.0203,0.0203,0.0203,0.0203,0.0203,0.0204,0.0218,0.2407,0.0251,0.0235,0.022,0.0207,0.0207,0.0207,0.0207,0.022,0.0376,0.2404]}

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
