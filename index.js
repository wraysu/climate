// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
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

let data = `
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
    
    let color = new THREE.Color().lerpColors(new THREE.Color(0x465c7d), new THREE.Color(0x7d4646), Number(dataArr[index][currMonth]));
    let line = new Line2(new LineGeometry().setPositions([
        prevMonthPolar.x, map(dataArr[index][0], dataArr[2][0], dataArr[63][0], -200, 200), prevMonthPolar.y,
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
                lines[i].material = new LineMaterial({color: lineColors[i], linewidth: 0.0035});
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
