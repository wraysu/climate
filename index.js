// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('topo');
const mycolor = urlParams.get('color');


const ranges1 = [-Infinity, -1, -0.875, -0.75, -0.625, -0.5, -0.375, -0.25, -0.125, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, Infinity];
const colors1 = [
  [7, 47, 107],
  [8, 82, 156],
  [33, 113, 181],
  [66, 146, 199],
  [90, 160, 205],
  [120, 191, 214],
  [170, 220, 230],
  [219, 245, 255],
  [240, 252, 255],
  [255, 240, 245],
  [255, 224, 224],
  [252, 187, 170],
  [252, 146, 114],
  [251, 106, 74],
  [240, 60, 43],
  [204, 24, 30],
  [166, 15, 20],
  [120, 10, 15]
];

// 根據數值查找對應的RGB顏色
const hexColors1 = colors1.map(color => rgbToHex(color[0], color[1], color[2]));
function getColor1(value) {
  for (let i = 0; i < ranges1.length - 1; i++) {
    if (value > ranges1[i] && value <= ranges1[i + 1]) {
      return hexColors1[i];
    }
  }
  // 如果不在範圍內，返回預設顏色
  return [0, 0, 0];
}

const ranges2 = [-Infinity, -1, -0.875, -0.75, -0.625, -0.5, -0.375, -0.25, -0.125, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, Infinity];
const colors2 = [
  [7, 30, 70],
  [7, 47, 107],
  [8, 82, 156],
  [33, 113, 181],
  [66, 146, 199],
  [90, 160, 205],
  [120, 191, 214],
  [170, 220, 230],
  [219, 245, 255],
  [255, 224, 224],
  [252, 187, 170],
  [252, 146, 114],
  [251, 106, 74],
  [240, 60, 43],
  [204, 24, 30],
  [166, 15, 20],
  [120, 10, 15],
  [95, 0, 0]
];

// 將RGB顏色轉換為HEX顏色
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }
  
  // 將所有RGB顏色轉換為HEX顏色

  const hexColors2 = colors1.map(color => rgbToHex(color[0], color[1], color[2]));

// 根據數值查找對應的RGB顏色
function getColor2(value) {
  for (let i = 0; i < ranges2.length - 1; i++) {
    if (value > ranges2[i] && value <= ranges2[i + 1]) {
      return hexColors2[i];
    }
  }
  // 如果不在範圍內，返回預設顏色
  return [0, 0, 0];
}

function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }


        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            var strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

let data200 = `
Year,1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月
1961,0.163402,0.214048,0.190547,0.188785,0.226182,0.335959,0.206213,0.226727,0.169829,0.049006,0.089777,0.028867
1962,0.071399,0.105514,0.120266,0.083125,-0.068834,-0.203862,-0.329493,-0.486000,-0.459583,-0.351725,-0.265236,-0.330564
1963,-0.398515,-0.373076,-0.337952,-0.375730,-0.272832,-0.239258,0.111235,0.213126,0.169338,0.311488,0.175239,0.152994
1964,0.242278,0.186092,0.166676,0.309219,0.188240,0.143857,0.082017,0.258981,0.257827,0.091285,0.047175,0.057870
1965,-0.004243,-0.013150,-0.103629,-0.202989,-0.040149,0.066679,0.223684,0.265995,0.505318,0.592892,0.574097,0.539610
1966,0.547736,0.575423,0.498377,0.524411,0.508684,0.537592,0.342930,0.094677,-0.060746,-0.139730,-0.022979,0.048031
1967,0.118936,0.139872,0.208557,0.101893,0.065979,-0.259721,-0.243091,-0.458647,-0.537115,-0.643647,-0.725759,-0.786095
1968,-0.825405,-0.836246,-0.793044,-0.785721,-0.845247,-0.454967,-0.263497,-0.003685,-0.008735,0.103212,0.191706,0.177365
1969,0.222725,0.206582,0.232314,0.230971,0.154375,-0.041386,-0.255629,-0.171212,-0.281489,-0.368446,-0.410526,-0.295437
1970,-0.315383,-0.307332,-0.287246,-0.140344,-0.023101,0.115107,0.036212,-0.052368,0.072559,0.167029,0.120349,0.145041
1971,0.145236,0.134107,0.092523,-0.034558,-0.150252,-0.230859,-0.036611,-0.072887,-0.091726,-0.182889,-0.159987,-0.220824
1972,-0.297529,-0.385078,-0.391305,-0.285085,-0.135666,-0.117437,-0.135343,0.147627,0.306700,0.480668,0.528432,0.517923
1973,0.514459,0.577563,0.632084,0.623276,0.527837,0.335905,0.319061,-0.011897,-0.155595,-0.239652,-0.246373,-0.270137
1974,-0.233133,-0.257174,-0.323128,-0.285384,-0.206187,0.078045,0.078282,0.272313,0.316944,0.416961,0.376350,0.382811
1975,0.393336,0.414190,0.495964,0.552659,0.486440,0.216772,0.135857,0.143331,0.106662,-0.037140,-0.043384,-0.019461
1976,-0.072733,-0.052677,-0.148089,-0.255303,-0.382625,-0.227783,-0.188813,-0.411454,-0.284829,-0.120705,-0.027515,-0.032704
1977,0.031501,0.053618,0.135221,0.156984,0.220523,0.352737,0.336836,0.460064,0.388932,0.263850,0.140807,0.202530
1978,0.237244,0.218070,0.222095,0.152186,0.203433,0.095336,0.261014,0.407436,0.428780,0.444297,0.387006,0.269569
1979,0.283802,0.272444,0.249404,0.197519,0.155800,0.176549,0.050278,-0.147322,-0.043517,-0.071765,0.040867,0.251554
1980,0.276197,0.331485,0.326697,0.466027,0.600855,0.491036,0.477900,0.631175,0.635985,0.780057,0.699644,0.511993
1981,0.395924,0.425567,0.392890,0.378242,0.283314,0.256237,0.272926,0.210629,0.149028,-0.112308,-0.032637,-0.031890
1982,-0.007325,-0.082812,-0.047877,-0.027471,0.103563,0.151890,0.154650,0.069362,-0.098853,0.126730,0.112687,0.194390
1983,0.306421,0.340633,0.419329,0.483320,0.313189,0.233511,0.152079,0.117931,0.141055,-0.025792,-0.104811,-0.089881
1984,-0.177716,-0.222878,-0.291583,-0.385965,-0.241749,-0.152527,-0.059445,0.087169,0.013469,0.012575,0.161441,0.083146
1985,0.060665,0.079195,0.083242,0.146549,0.094101,0.086967,0.000386,-0.196444,-0.117606,0.034343,-0.057593,-0.008107
1986,0.044416,0.108327,0.084963,0.004692,-0.001150,0.032527,0.109614,0.305045,0.477083,0.387598,0.403581,0.377025
1987,0.361119,0.391752,0.318800,0.404898,0.512635,0.488872,0.612839,0.614287,0.431762,0.330682,0.438432,0.531729
1988,0.582873,0.495870,0.565338,0.509456,0.252086,0.188499,0.131533,0.078313,0.050665,0.177416,0.040063,-0.035835
1989,-0.089291,-0.057778,-0.052569,-0.100537,0.014370,0.046210,0.043584,0.170402,0.261295,0.178404,0.206467,0.191167
1990,0.192758,0.167138,0.145324,0.147353,0.262615,0.391584,0.390152,0.300257,0.473309,0.567510,0.630951,0.717586
1991,0.726741,0.763481,0.786318,0.725583,0.597251,0.560381,0.472559,0.368327,0.277260,0.216840,0.085989,0.001811
1992,-0.024059,-0.041919,-0.035507,-0.049555,-0.094095,-0.018360,-0.020394,0.145772,0.074408,0.073750,0.173307,0.212374
1993,0.258200,0.277680,0.275489,0.324851,0.489251,0.386152,0.467944,0.448922,0.351315,0.555953,0.594245,0.605052
1994,0.563683,0.480029,0.404382,0.384472,0.362527,0.580764,0.528206,0.336626,0.362869,0.240064,0.141085,0.140570
1995,0.100985,0.125248,0.206263,0.321627,0.199822,-0.098801,-0.067809,-0.031081,0.103576,-0.193078,-0.280706,-0.247347
1996,-0.175000,-0.171425,-0.138308,-0.156108,0.000588,0.066878,0.032695,0.086455,0.105022,0.386975,0.527288,0.377055
1997,0.305214,0.303927,0.170792,0.155409,0.126641,0.234759,0.338756,0.445245,0.445479,0.562483,0.624035,0.714067
1998,0.801361,0.896523,0.984586,1.029012,1.091056,1.141893,1.143514,1.125523,1.197933,1.102641,0.925179,0.938998
1999,0.843437,0.719825,0.734369,0.724727,0.639828,0.456341,0.419024,0.332068,0.161375,0.111887,0.208769,0.208453
2000,0.225714,0.220474,0.181667,0.229947,0.275395,0.463979,0.506397,0.661014,0.768716,0.774633,0.815668,0.823788
2001,0.846672,0.961193,0.923594,0.817998,0.660369,0.554470,0.496386,0.467368,0.559119,0.694044,0.710241,0.740327
2002,0.753159,0.713439,0.766192,0.819434,0.898461,0.960073,0.909681,0.945322,0.773125,0.723027,0.714739,0.631719
2003,0.725537,0.751014,0.824376,0.765650,0.868308,0.736999,0.736370,0.652411,0.632490,0.549895,0.603262,0.642948
2004,0.509307,0.486252,0.409303,0.323833,0.277564,0.400036,0.384353,0.355205,0.215987,0.254214,0.231463,0.194453
2005,0.237502,0.204025,0.277128,0.424474,0.493615,0.307023,0.430212,0.518241,0.689466,0.733866,0.688014,0.687689
2006,0.683385,0.710448,0.626333,0.639220,0.634069,0.800087,0.764436,0.843739,0.932035,0.787790,0.802014,0.842352
2007,0.923278,0.858064,0.898205,0.852694,0.708195,0.746568,0.789781,0.445199,0.385113,0.504805,0.453810,0.416544
2008,0.303297,0.369522,0.379211,0.487295,0.536443,0.439121,0.276153,0.749291,0.743403,0.609378,0.592133,0.619000
2009,0.672591,0.697304,0.796773,0.695323,0.691280,0.639055,0.749499,0.576518,0.650217,0.635696,0.679985,0.608768
2010,0.595567,0.589963,0.491808,0.485863,0.431633,0.435938,0.230570,0.072518,-0.199166,-0.181291,-0.240271,-0.113846
2011,-0.150925,-0.149097,-0.157368,-0.164071,-0.004688,-0.004242,0.148979,0.145010,0.332196,0.499147,0.581903,0.505013
2012,0.552302,0.482473,0.468313,0.423717,0.332804,0.392215,0.420388,0.622080,0.709303,0.545559,0.526588,0.615909
2013,0.588264,0.617812,0.631068,0.647018,0.613635,0.500920,0.461443,0.276861,0.162353,0.244067,0.221204,0.186841
2014,0.278508,0.315721,0.425277,0.455320,0.532293,0.519889,0.546659,0.602051,0.662851,0.692182,0.755320,0.875638
2015,0.803984,0.735664,0.615050,0.666559,0.767405,0.979034,0.982152,0.867983,0.703807,0.781295,0.828260,0.756730
2016,0.795665,0.857536,0.862406,0.969839,0.906745,0.953092,1.098804,1.196178,1.315268,1.194986,1.120320,1.071240
2017,1.048614,1.108336,1.237065,1.161026,1.146019,0.996656,0.879036,0.782154,0.848571,0.901528,1.017880,1.002630
2018,0.968253,0.839995,0.736378,0.583814,0.580976,0.740395,0.865726,1.180218,1.198116,1.252132,1.042393,1.051288
2019,1.073363,1.118110,1.080458,1.185303,1.143122,1.044523,0.984050,0.860520,0.916980,0.695431,0.847183,0.942048
2020,1.003974,1.017090,1.068796,1.068124,1.148521,1.160100,0.983298,0.975066,0.929681,1.049686,1.147900,1.050449
2021,0.998546,0.959113,1.031183,1.086907,0.980104,0.934298,1.098443,0.960255,1.001439,1.001700,0.703960,0.718007
2022,0.759888,0.842812,0.755013,0.682785,0.853008,0.794860,***,***,***,***,***,***

`;


let data500 = `
Year,1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月
1961,0.116467,0.162670,0.138241,0.142461,0.182418,0.298075,0.167999,0.192667,0.128079,0.004301,0.042485,-0.016904
1962,0.027168,0.063500,0.081698,0.046969,-0.097629,-0.224316,-0.349751,-0.513682,-0.488632,-0.378003,-0.283607,-0.344572
1963,-0.412167,-0.384884,-0.348180,-0.384797,-0.284111,-0.252624,0.101672,0.216686,0.179447,0.331324,0.195592,0.175291
1964,0.266851,0.210465,0.191034,0.334524,0.212945,0.171614,0.111974,0.282150,0.278645,0.101591,0.046804,0.051101
1965,-0.015970,-0.022349,-0.117209,-0.225801,-0.061841,0.041455,0.197723,0.244387,0.481321,0.573397,0.561789,0.532272
1966,0.542648,0.567555,0.494866,0.525562,0.509457,0.543920,0.344189,0.094741,-0.056921,-0.130992,-0.013995,0.056289
1967,0.131434,0.153697,0.218617,0.118422,0.083536,-0.249609,-0.230975,-0.443923,-0.522734,-0.635363,-0.721519,-0.786573
1968,-0.831175,-0.843441,-0.800878,-0.795574,-0.859197,-0.474221,-0.290053,-0.036893,-0.030831,0.090121,0.188274,0.182027
1969,0.229196,0.219238,0.250551,0.250417,0.178521,-0.011415,-0.219430,-0.131882,-0.242038,-0.328705,-0.372501,-0.258657
1970,-0.273904,-0.265940,-0.246312,-0.099927,0.017540,0.157121,0.078859,-0.006085,0.113711,0.198800,0.146700,0.168597
1971,0.165014,0.153137,0.111817,-0.013316,-0.131502,-0.213396,-0.015472,-0.046770,-0.071786,-0.165581,-0.146072,-0.206774
1972,-0.283355,-0.376795,-0.390186,-0.290083,-0.141131,-0.123113,-0.143215,0.130301,0.283587,0.455305,0.505000,0.497380
1973,0.495144,0.557834,0.613248,0.610935,0.520683,0.332807,0.316455,-0.016976,-0.155327,-0.235964,-0.244300,-0.274291
1974,-0.235973,-0.261363,-0.325796,-0.290411,-0.209704,0.077772,0.077349,0.270041,0.314755,0.415337,0.378197,0.392474
1975,0.404266,0.432536,0.516639,0.574553,0.507459,0.237276,0.158886,0.169949,0.133836,-0.002225,-0.003980,0.023288
1976,-0.038022,-0.012741,-0.101727,-0.205065,-0.331455,-0.178343,-0.135717,-0.352901,-0.224090,-0.055403,0.041662,0.039313
1977,0.113478,0.133047,0.211935,0.231785,0.289259,0.414790,0.388628,0.493348,0.418038,0.284092,0.157967,0.211113
1978,0.240052,0.214431,0.215239,0.146138,0.199900,0.095310,0.262602,0.418423,0.440340,0.457104,0.397121,0.279373
1979,0.291796,0.280982,0.254790,0.203708,0.162389,0.184141,0.060094,-0.120771,-0.010467,-0.041475,0.074871,0.284793
1980,0.312987,0.369986,0.368085,0.501449,0.635215,0.522521,0.512766,0.651169,0.647557,0.793037,0.709545,0.523102
1981,0.404603,0.433775,0.401513,0.389667,0.299280,0.275617,0.293492,0.241411,0.194012,-0.065351,0.019811,0.024735
1982,0.052530,-0.021133,0.017568,0.038339,0.165975,0.214290,0.212023,0.119537,-0.058571,0.163177,0.141587,0.216024
1983,0.325753,0.359221,0.435047,0.496760,0.326035,0.243914,0.164945,0.138762,0.165944,-0.000705,-0.079937,-0.061338
1984,-0.144555,-0.190448,-0.262453,-0.355695,-0.213079,-0.123500,-0.025312,0.121320,0.070439,0.075686,0.226793,0.144390
1985,0.114444,0.133824,0.141558,0.204273,0.152752,0.146054,0.047478,-0.163750,-0.114255,0.031655,-0.059293,-0.002303
1986,0.058118,0.121283,0.098539,0.015734,0.016182,0.049047,0.126357,0.327771,0.502757,0.424838,0.443320,0.407172
1987,0.385607,0.416671,0.341378,0.430429,0.536551,0.511886,0.641952,0.645369,0.474320,0.360776,0.463993,0.558900
1988,0.608429,0.515619,0.580590,0.513310,0.244669,0.176915,0.115675,0.059454,0.020414,0.142638,0.004870,-0.065562
1989,-0.117798,-0.086529,-0.077853,-0.117843,-0.003325,0.027881,0.024146,0.154675,0.242514,0.161944,0.185811,0.159315
1990,0.153742,0.127820,0.097698,0.093948,0.204000,0.332573,0.329314,0.229404,0.402626,0.499888,0.567385,0.660765
1991,0.675681,0.710894,0.735099,0.673996,0.549400,0.514400,0.426456,0.324736,0.235644,0.174795,0.040694,-0.046001
1992,-0.072798,-0.090553,-0.081705,-0.093450,-0.135934,-0.061703,-0.063601,0.095212,0.016297,0.015529,0.115728,0.154449
1993,0.199834,0.219549,0.216655,0.267105,0.435086,0.334773,0.415317,0.403427,0.312998,0.515572,0.548744,0.565208
1994,0.525226,0.452532,0.379902,0.361707,0.340843,0.559290,0.508457,0.317312,0.342062,0.222426,0.127508,0.123791
1995,0.086145,0.099778,0.179521,0.295487,0.167775,-0.134701,-0.104842,-0.066487,0.073579,-0.215897,-0.301695,-0.263820
1996,-0.195934,-0.188265,-0.159267,-0.181119,-0.020178,0.046340,0.012547,0.073527,0.083006,0.354317,0.494395,0.333918
1997,0.257817,0.251016,0.117687,0.096159,0.059701,0.165484,0.264407,0.361667,0.363890,0.476124,0.533088,0.626139
1998,0.719846,0.812495,0.898762,0.947663,1.012600,1.065595,1.070179,1.040641,1.109519,1.010175,0.830295,0.840574
1999,0.742754,0.618987,0.630668,0.615292,0.521218,0.332691,0.296472,0.223166,0.064691,0.015994,0.108691,0.107471
2000,0.121924,0.121819,0.084589,0.136200,0.192620,0.384603,0.424481,0.573249,0.657785,0.664292,0.708313,0.715911
2001,0.736425,0.846640,0.814657,0.705145,0.538922,0.426211,0.359137,0.317812,0.409637,0.544136,0.560852,0.587137
2002,0.599019,0.554228,0.595939,0.644669,0.717869,0.775943,0.723243,0.759887,0.587182,0.537203,0.523685,0.443411
2003,0.536585,0.564964,0.640260,0.580770,0.689656,0.559269,0.560728,0.485568,0.469828,0.384434,0.441249,0.475073
2004,0.339169,0.314743,0.240384,0.154361,0.105272,0.227719,0.216359,0.194844,0.058359,0.094735,0.071069,0.041490
2005,0.084993,0.051362,0.121329,0.271391,0.338074,0.152754,0.281293,0.360863,0.528145,0.572166,0.525417,0.522296
2006,0.520765,0.545905,0.461890,0.472583,0.466890,0.630304,0.587282,0.660228,0.747083,0.602661,0.616142,0.657010
2007,0.736980,0.674450,0.713018,0.670371,0.531534,0.572912,0.616909,0.281456,0.218206,0.334553,0.278751,0.241759
2008,0.127314,0.190945,0.203801,0.309626,0.355278,0.256956,0.094959,0.559799,0.561634,0.429690,0.415614,0.442003
2009,0.493314,0.519627,0.613470,0.516942,0.517630,0.467670,0.580716,0.415227,0.481851,0.472445,0.520021,0.446120
2010,0.437262,0.431647,0.341127,0.334490,0.282455,0.284826,0.077272,-0.073394,-0.343545,-0.329449,-0.385685,-0.258513
2011,-0.295414,-0.296010,-0.308510,-0.315155,-0.157900,-0.154083,0.002093,0.001896,0.203748,0.364792,0.439955,0.363823
2012,0.406703,0.341332,0.324116,0.275018,0.179075,0.235226,0.264806,0.462635,0.539562,0.382661,0.365582,0.454251
2013,0.424903,0.453983,0.470757,0.488387,0.456041,0.349073,0.304619,0.109676,-0.007796,0.072607,0.052606,0.019091
2014,0.112066,0.150334,0.261228,0.292671,0.369932,0.351185,0.376075,0.431644,0.496906,0.530601,0.593669,0.711827
2015,0.644551,0.576217,0.455752,0.507989,0.609856,0.826135,0.838609,0.728225,0.567589,0.647649,0.693514,0.623301
2016,0.660224,0.717875,0.727899,0.837854,0.774474,0.820083,0.960481,1.054509,1.166796,1.040818,0.963977,0.915235
2017,0.890061,0.954016,1.078591,1.001515,0.995904,0.847306,0.730675,0.637412,0.704940,0.752648,0.872658,0.857823
2018,0.826015,0.699836,0.597020,0.443863,0.434967,0.595310,0.724938,1.037688,1.057372,1.124857,0.914062,0.922795
2019,0.949719,0.992496,0.953213,1.054794,1.012085,0.914933,0.850731,0.724352,0.778630,0.552433,0.707246,0.804439
2020,0.859515,0.871773,0.921234,0.923414,1.003836,1.014896,0.837610,0.836889,0.804577,0.925472,1.026223,0.933502
2021,0.885676,0.846704,0.919113,0.970886,0.860907,0.812835,0.976973,0.842377,0.876810,0.875545,0.579255,0.585238
2022,0.625406,0.707635,0.620185,0.550912,0.728083,0.672524,***,***,***,***,***,***

`;

let data = (myParam == 500)? data500 : data200;

const fileContent = `
ncolors= 128
# r g b
0.415456 0.003691 0.123414
0.438524 0.011073 0.127105
0.461592 0.018454 0.130796
0.484660 0.025836 0.134487
0.507728 0.033218 0.138178
0.530796 0.040600 0.141869
0.553864 0.047982 0.145559
0.576932 0.055363 0.149250
0.600000 0.062745 0.152941
0.611534 0.066436 0.154787
0.646136 0.077509 0.160323
0.657670 0.081200 0.162168
0.692272 0.092272 0.167705
0.700807 0.099654 0.171242
0.717416 0.132872 0.186928
0.722953 0.143945 0.192157
0.739562 0.177163 0.207843
0.750634 0.199308 0.218301
0.756171 0.210381 0.223529
0.772780 0.243599 0.239216
0.783852 0.265744 0.249673
0.794925 0.287889 0.260131
0.800461 0.298962 0.265359
0.817070 0.332180 0.281046
0.828143 0.354325 0.291503
0.839216 0.376471 0.301961
0.843829 0.387082 0.310112
0.857670 0.418916 0.334564
0.866897 0.440138 0.350865
0.876125 0.461361 0.367166
0.880738 0.471972 0.375317
0.894579 0.503806 0.399769
0.903806 0.525029 0.416071
0.913033 0.546251 0.432372
0.922261 0.567474 0.448674
0.931488 0.588697 0.464975
0.940715 0.609919 0.481276
0.945329 0.620531 0.489427
0.957555 0.651211 0.515110
0.960323 0.667820 0.536332
0.963091 0.684429 0.557555
0.965859 0.701038 0.578777
0.968627 0.717647 0.600000
0.971396 0.734256 0.621223
0.974164 0.750865 0.642445
0.975548 0.759170 0.653057
0.979700 0.784083 0.684890
0.982468 0.800692 0.706113
0.985236 0.817301 0.727336
0.988005 0.833910 0.748558
0.990773 0.850519 0.769781
0.991234 0.863130 0.787774
0.989389 0.871742 0.802537
0.988466 0.876048 0.809919
0.985698 0.888966 0.832065
0.983852 0.897578 0.846828
0.982007 0.906190 0.861592
0.980161 0.914802 0.876355
0.978316 0.923414 0.891119
0.976471 0.932026 0.905882
0.974625 0.940638 0.920646
0.973702 0.944944 0.928028
0.970934 0.957862 0.950173
0.969089 0.966474 0.964937
0.959862 0.964475 0.967013
0.948174 0.958939 0.964860
0.936486 0.953403 0.962707
0.924798 0.947866 0.960554
0.913110 0.942330 0.958401
0.901423 0.936794 0.956248
0.889735 0.931257 0.954095
0.878047 0.925721 0.951942
0.866359 0.920185 0.949789
0.854671 0.914648 0.947636
0.842983 0.909112 0.945483
0.837140 0.906344 0.944406
0.819608 0.898039 0.941176
0.800231 0.888197 0.935640
0.780854 0.878354 0.930104
0.761476 0.868512 0.924567
0.742099 0.858670 0.919031
0.722722 0.848827 0.913495
0.703345 0.838985 0.907958
0.683968 0.829143 0.902422
0.664591 0.819300 0.896886
0.645213 0.809458 0.891349
0.625836 0.799616 0.885813
0.606459 0.789773 0.880277
0.587082 0.779931 0.874740
0.566474 0.768704 0.868512
0.542176 0.753326 0.860208
0.530027 0.745636 0.856055
0.493579 0.722568 0.843599
0.469281 0.707190 0.835294
0.444983 0.691811 0.826990
0.420684 0.676432 0.818685
0.396386 0.661053 0.810381
0.372088 0.645675 0.802076
0.347789 0.630296 0.793772
0.323491 0.614917 0.785467
0.299193 0.599539 0.777163
0.274894 0.584160 0.768858
0.257516 0.569550 0.761169
0.247059 0.555709 0.754095
0.236601 0.541869 0.747020
0.226144 0.528028 0.739946
0.215686 0.514187 0.732872
0.210458 0.507266 0.729335
0.194771 0.486505 0.718724
0.184314 0.472664 0.711649
0.173856 0.458824 0.704575
0.163399 0.444983 0.697501
0.152941 0.431142 0.690427
0.142484 0.417301 0.683353
0.132026 0.403460 0.676278
0.122953 0.387543 0.657209
0.114341 0.370934 0.634141
0.105729 0.354325 0.611073
0.097116 0.337716 0.588005
0.088504 0.321107 0.564937
0.079892 0.304498 0.541869
0.071280 0.287889 0.518800
0.062668 0.271280 0.495732
0.058362 0.262976 0.484198
0.045444 0.238062 0.449596
0.036832 0.221453 0.426528
0.028220 0.204844 0.403460
0.019608 0.188235 0.380392
`;

let colorsArray = [];
const colorlines = fileContent.split('\n');

// 解析每一行，提取顏色數據
for (let i = 0; i < colorlines.length; i++) {
    const line = colorlines[i].trim();
    if (line && !line.startsWith('#') && !line.startsWith('ncolors')) {
        const parts = line.split(/\s+/);
        const r = parseFloat(parts[0]);
        const g = parseFloat(parts[1]);
        const b = parseFloat(parts[2]);
        colorsArray.push(new THREE.Color(r, g, b));
    }
}

// 反轉顏色數組
colorsArray.reverse();

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { Line2 } from 'three/addons/lines/Line2';
import { LineMaterial } from 'three/addons/lines/LineMaterial';
import { LineGeometry } from 'three/addons/lines/LineGeometry';
import * as GeometryUtils from 'three/addons/utils/GeometryUtils';

function polar_to_cart(r, theta) {
    return {x: r*Math.cos(theta), y: r*Math.sin(theta)}
}
function deg_to_rad(degrees)
{
    return degrees * (Math.PI/180);
}
function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

const container = document.getElementById("container");
let width = container.getBoundingClientRect().width;
let height = container.getBoundingClientRect().height;

const scene = new THREE.Scene();
const cam = new THREE.OrthographicCamera( width / -2, width / 2, height / 2, height / -2, -1000, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
renderer.setPixelRatio(width/height);
let controls = new OrbitControls( cam, renderer.domElement );;
container.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
    width = container.getBoundingClientRect().width;
    height = container.getBoundingClientRect().height;

    renderer.setSize(width, height);
    renderer.setPixelRatio(width/height);
    cam.left = width / -2;
    cam.right = width / 2;
    cam.top = height / 2;
    cam.bottom = height / -2;
    cam.updateProjectionMatrix();
});

const dataArr = CSVToArray(data);
console.log(dataArr);
let yearMesh;
const zeroRad = 100;
const oneRad = 180;

function load() {
    cam.position.y = 5;
    controls.enabled = false;
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
    const material_y = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
    const material_r = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } );
    const monthsRad = 235;
    const monthsGeo = new THREE.RingGeometry( monthsRad-1.5, monthsRad, 64 );
    const monthsRing = new THREE.Mesh( monthsGeo, material_r );
    monthsRing.rotateX(deg_to_rad(-90));
    monthsRing.position.setY(201);
    scene.add( monthsRing );

    // load months
    const months = dataArr[1].slice(1,13);
    for(let i = 0; i < 360; i+=360/months.length) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.height = 512;
        // draw the number
        ctx.fillStyle = 'white';
        ctx.font = String(canvas.width/8)+'px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(months[(i/(360/months.length))], canvas.width/2, canvas.height/2);

        // create mesh with texture
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 200),
            new THREE.MeshBasicMaterial({transparent: true, map: new THREE.CanvasTexture(canvas), side: THREE.DoubleSide})
        );
        mesh.rotateX(deg_to_rad(-90));
        const polar = polar_to_cart(monthsRad+24, deg_to_rad(i-(360/months.length)*2));
        mesh.position.setX(polar.x);
        mesh.position.setZ(polar.y);
        mesh.position.setY(201);
        mesh.rotateZ(deg_to_rad(-i-(360/months.length)));
        scene.add(mesh);
    }

    for(let i = 2; i <=63; i++){
        if ((dataArr[i][0] % 10) == 0 || dataArr[i][0]  == 1961){
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.height = 512;
        // draw the number
        ctx.fillStyle = 'white';
        ctx.font = String(canvas.width/8)+'px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (dataArr[i][0]  == 1961){
            ctx.fillText(1960, canvas.width/2, canvas.height/2);
        }else{
            ctx.fillText(dataArr[i][0], canvas.width/2, canvas.height/2);
        }
        
        // create mesh with texture
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 200),
            new THREE.MeshBasicMaterial({transparent: true, map: new THREE.CanvasTexture(canvas), side: THREE.DoubleSide})
        );
        mesh.rotateY(deg_to_rad(90));
        //mesh.rotateZ(deg_to_rad(90));
        const polar = polar_to_cart(monthsRad+40 /2, 0);
        mesh.position.setX(polar.x);
        mesh.position.setZ(polar.y);
        mesh.position.setY( map(dataArr[i][0], dataArr[2][0], dataArr[63][0], -200, 200));
        //mesh.rotateZ(deg_to_rad(-i-(360/months.length)));
        scene.add(mesh);
        }
        
    }

    // ============================================= load 0 deg ring =============================================
    const zeroGeo = new THREE.RingGeometry( zeroRad-2.5, zeroRad, 64 );
    const zeroRing = new THREE.Mesh( zeroGeo, material );
    zeroRing.rotateX(deg_to_rad(-90));
    zeroRing.position.setY(201);
    scene.add( zeroRing );

    const zeroCanvas = document.createElement('canvas');
    const zeroCtx = zeroCanvas.getContext('2d');

    zeroCanvas.width = zeroCanvas.height = 512;
    // draw the number
    zeroCtx.fillStyle = 'white';
    zeroCtx.font = String(zeroCanvas.width/8)+'px Arial';
    zeroCtx.textAlign = 'center';
    zeroCtx.textBaseline = 'middle';
    zeroCtx.fillText("0°", zeroCanvas.width/2, zeroCanvas.height/2);

    // create mesh with texture
    const zeroMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(175, 175),
        new THREE.MeshBasicMaterial({transparent: true, map: new THREE.CanvasTexture(zeroCanvas), side: THREE.DoubleSide})
    );
    zeroMesh.rotateX(deg_to_rad(-90));
    const zeroPolar = polar_to_cart(zeroRad+20, 0);
    zeroMesh.position.setX(zeroPolar.x);
    zeroMesh.position.setZ(zeroPolar.y);
    zeroMesh.position.setY(201);
    scene.add(zeroMesh);

    //ZeroLeft and Right
    const zeroLeftMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(175, 175),
        new THREE.MeshBasicMaterial({transparent: true, map: new THREE.CanvasTexture(zeroCanvas), side: THREE.DoubleSide})
    );
    zeroLeftMesh.rotateY(deg_to_rad(90));
    zeroLeftMesh.position.setX(0);
    zeroLeftMesh.position.setZ(zeroRad+20);
    zeroLeftMesh.position.setY(210);
    scene.add(zeroLeftMesh);

    const zeroRightMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(175, 175),
        new THREE.MeshBasicMaterial({transparent: true, map: new THREE.CanvasTexture(zeroCanvas), side: THREE.DoubleSide})
    );
    zeroRightMesh.rotateY(deg_to_rad(90));
    zeroRightMesh.position.setX(0);
    zeroRightMesh.position.setZ(-zeroRad-20);
    zeroRightMesh.position.setY(210);
    scene.add(zeroRightMesh);

    

    // ============================================= load 1 deg ring =============================================
    const oneGeo = new THREE.RingGeometry( oneRad-1.5, oneRad, 64 );
    const oneRing = new THREE.Mesh( oneGeo, material_y );
    oneRing.rotateX(deg_to_rad(-90));
    oneRing.position.setY(201);
    scene.add( oneRing );

    const oneCanvas = document.createElement('canvas');
    const oneCtx = oneCanvas.getContext('2d');

    oneCanvas.width = oneCanvas.height = 512;
    // draw the number
    oneCtx.fillStyle = 'white';
    oneCtx.font = String(oneCanvas.width/8)+'px Arial';
    oneCtx.textAlign = 'center';
    oneCtx.textBaseline = 'middle';
    oneCtx.fillText("＋1°", oneCanvas.width/2, oneCanvas.height/2);

    // create mesh with texture
    const oneMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(175, 175),
        new THREE.MeshBasicMaterial({transparent: true, map: new THREE.CanvasTexture(oneCanvas), side: THREE.DoubleSide})
    );
    oneMesh.rotateX(deg_to_rad(-90));
    const onePolar = polar_to_cart(oneRad+20, 0);
    oneMesh.position.setX(onePolar.x);
    oneMesh.position.setZ(onePolar.y);
    oneMesh.position.setY(201.1);
    scene.add(oneMesh);

    //oneLeft and Right
    const oneLeftMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(175, 175),
        new THREE.MeshBasicMaterial({transparent: true, map: new THREE.CanvasTexture(oneCanvas), side: THREE.DoubleSide})
    );
    oneLeftMesh.rotateY(deg_to_rad(90));
    oneLeftMesh.position.setX(0);
    oneLeftMesh.position.setZ(oneRad+20);
    oneLeftMesh.position.setY(210);
    scene.add(oneLeftMesh);

    const oneRightMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(175, 175),
        new THREE.MeshBasicMaterial({transparent: true, map: new THREE.CanvasTexture(oneCanvas), side: THREE.DoubleSide})
    );
    oneRightMesh.rotateY(deg_to_rad(90));
    oneRightMesh.position.setX(0);
    oneRightMesh.position.setZ(-oneRad-20);
    oneRightMesh.position.setY(210);
    scene.add(oneRightMesh);

    // ============================================= load year text =============================================
    const yearCanvas = document.createElement('canvas');
    const yearCtx = yearCanvas.getContext('2d');

    yearCanvas.width = yearCanvas.height = 512;
    // draw the number
    yearCtx.fillStyle = 'white';
    yearCtx.font = String(yearCanvas.width/8)+'px Arial';
    yearCtx.textAlign = 'center';
    yearCtx.textBaseline = 'middle';
    yearCtx.fillText(dataArr[2][0], yearCanvas.width/2, yearCanvas.height/2);

    // create mesh with texture
    yearMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshBasicMaterial({transparent: true, map: new THREE.CanvasTexture(yearCanvas), side: THREE.DoubleSide})
    );
    yearMesh.rotateX(deg_to_rad(-90));
    yearMesh.position.setY(201);
    scene.add(yearMesh);
}

let index = 2;
let currMonth = 1;
let prevMonthTheta = (currMonth*(360/12))-90;
let prevMonthRad = map(Number(dataArr[index][currMonth]), 0, 1, zeroRad, oneRad);

let lines = [];
let lineColors = [];
let graphEnd = false;
let camLerp = 0;
function animate() {
    if(dataArr[index][0] < 2024) {
    const yearCanvas = document.createElement('canvas');
    const yearCtx = yearCanvas.getContext('2d');

    yearCanvas.width = yearCanvas.height = 512;
    // draw the number
    yearCtx.fillStyle = 'white';
    yearCtx.font = String(yearCanvas.width/8)+'px Arial';
    yearCtx.textAlign = 'center';
    yearCtx.textBaseline = 'middle';
    yearCtx.fillText(dataArr[index][0], yearCanvas.width/2, yearCanvas.height/2);

    if(dataArr[index][currMonth] !== "***") {
    yearMesh.material = new THREE.MeshBasicMaterial({transparent: true, map: new THREE.CanvasTexture(yearCanvas), side: THREE.DoubleSide});
    let prevMonthPolar = polar_to_cart(prevMonthRad, deg_to_rad(prevMonthTheta));
    let currMonthPolar = polar_to_cart(map(Number(dataArr[index][currMonth]), 0, 1, zeroRad, oneRad), deg_to_rad((currMonth*(360/12))-90));
    prevMonthTheta = (currMonth*(360/12))-90;
    prevMonthRad = map(Number(dataArr[index][currMonth]), 0, 1, zeroRad, oneRad);
    
    //let color = new THREE.Color().lerpColors(new THREE.Color(0x052f60), new THREE.Color(0x69001F), Number(dataArr[index][currMonth]));
     
    // 計算插值顏色
    let minDegree = -1;
    let maxDegree = 1;
    let currentDegree = 1; // 假設這是當前度數

    // 計算相對位置
    let t = (Number(dataArr[index][currMonth])  - minDegree) / (maxDegree - minDegree); 
    if (Number(dataArr[index][currMonth])>1) t = 1;
    // 計算插值顏色
    let color;
    if (mycolor ==1){      
        color = new THREE.Color(getColor1(Number(dataArr[index][currMonth])));
    }else if (mycolor == 2){
       
        color = new THREE.Color(getColor2(Number(dataArr[index][currMonth])));;
    }else{
        let startColor = colorsArray[Math.floor(t * (colorsArray.length - 1))];
        let endColor = colorsArray[Math.ceil(t * (colorsArray.length - 1))];
        color = new THREE.Color().lerpColors(startColor, endColor, t * (colorsArray.length - 1) % 1);
    }
   

    let line = new Line2(new LineGeometry().setPositions([
        prevMonthPolar.x, map(dataArr[(currMonth==1)?index-1:index][0], dataArr[2][0], dataArr[63][0], -200, 200), prevMonthPolar.y,
        currMonthPolar.x, map(dataArr[index][0], dataArr[2][0], dataArr[63][0], -200, 200), currMonthPolar.y
    ]), new LineMaterial({color: lines.length !== 0 ? 0xffffff : color, linewidth: 0.002}));
    line.computeLineDistances();
    line.scale.set( 1, 1, 1 );
	scene.add( line );
    if(lines.length > 0) {
        lines[lines.length-1].material = new LineMaterial({color: lineColors[lines.length-1], linewidth: 0.002});
    }
    lines.push(line);
    lineColors.push(color);

    if(currMonth === 12) {
        currMonth = 1;
        index++;
    } else {
        currMonth++;
    }
    } else {
        // GRAPHING ENDS
        if(graphEnd === false) {
            lines[lines.length-1].material = new LineMaterial({color: lineColors[lines.length-1], linewidth: 0.002});
            for(let i = 0; i < lines.length; i++) {
                lines[i].material = new LineMaterial({color: lineColors[i], linewidth: 0.006});
            }
        }
        graphEnd = true;

        let camInterval;
        if(camLerp < 1) {
            camInterval = setInterval(() => {
                cam.position.lerp(new THREE.Vector3(90, 5, 0), camLerp);
                camLerp += 0.0001;
                if(camLerp >= 1) {
                    controls.enabled = true;
                    clearInterval(camInterval);
                }
            }, 200);
        }
        let zeroRightPolar = polar_to_cart(zeroRad, -90);
        let zeroLefttPolar = polar_to_cart(zeroRad, 90);
        let oneRightPolar = polar_to_cart(oneRad, 270);
        let oneLeftPolar = polar_to_cart(oneRad, 90);
        let zeroRightline = new Line2(new LineGeometry().setPositions([
            0, -200, zeroRad,
            0, 220, zeroRad
        ]), new LineMaterial({color: lines.length !== 0 ? 0xffffff : color, linewidth: 0.001}));
        let zeroLeftline = new Line2(new LineGeometry().setPositions([
            0, -200, -zeroRad,
            0, 220, -zeroRad
        ]), new LineMaterial({color: lines.length !== 0 ? 0xffffff : color, linewidth: 0.001}));
        let oneRightline = new Line2(new LineGeometry().setPositions([
            0, -200, oneRad,
            0, 220, oneRad
        ]), new LineMaterial({color: lines.length !== 0 ? 0xffff00 : color, linewidth: 0.001}));
        let oneLeftline = new Line2(new LineGeometry().setPositions([
            0, -200, -oneRad,
            0, 220, -oneRad
        ]), new LineMaterial({color: lines.length !== 0 ? 0xffff00 : color, linewidth: 0.001}));
        zeroRightline.computeLineDistances();
        zeroRightline.scale.set( 1, 1, 1 );
        scene.add( zeroRightline );
        zeroLeftline.computeLineDistances();
        zeroLeftline.scale.set( 1, 1, 1 );
        scene.add( zeroLeftline );
        oneRightline.computeLineDistances();
        oneRightline.scale.set( 1, 1, 1 );
        scene.add( oneRightline );
        oneLeftline.computeLineDistances();
        oneLeftline.scale.set( 1, 1, 1 );
        scene.add( oneLeftline );
    }
    }

    controls.update();
	requestAnimationFrame( animate );
	renderer.render( scene, cam );
}
load();
animate();
