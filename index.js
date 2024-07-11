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
1961,0.009652,0.055856,0.031426,0.035647,0.075604,0.191261,0.061185,0.085852,0.021264,-0.102514,-0.064330,-0.123719
1962,-0.079647,-0.043314,-0.025116,-0.059846,-0.204444,-0.331131,-0.456566,-0.620496,-0.595447,-0.484818,-0.390421,-0.451387
1963,-0.518981,-0.491699,-0.454995,-0.491612,-0.390926,-0.359439,-0.005142,0.109871,0.072633,0.224509,0.088777,0.068477
1964,0.160036,0.103651,0.084219,0.227709,0.106130,0.064799,0.005160,0.175335,0.171830,-0.005224,-0.060010,-0.055714
1965,-0.122785,-0.129163,-0.224024,-0.332616,-0.168656,-0.065360,0.090908,0.137572,0.374506,0.466582,0.454974,0.425457
1966,0.435833,0.460741,0.388051,0.418748,0.402642,0.437106,0.237374,-0.012074,-0.163736,-0.237806,-0.120809,-0.050526
1967,0.024620,0.046882,0.111803,0.011607,-0.023278,-0.356424,-0.337789,-0.550738,-0.629549,-0.742178,-0.828334,-0.893388
1968,-0.937990,-0.950255,-0.907693,-0.902389,-0.966012,-0.581036,-0.396868,-0.143708,-0.137646,-0.016694,0.081459,0.075213
1969,0.122382,0.112423,0.143736,0.143602,0.071706,-0.118230,-0.326245,-0.238697,-0.348853,-0.435520,-0.479316,-0.365472
1970,-0.380719,-0.372754,-0.353127,-0.206742,-0.089275,0.050306,-0.027956,-0.112900,0.006897,0.091985,0.039885,0.061783
1971,0.058199,0.046323,0.005002,-0.120131,-0.238317,-0.320210,-0.122286,-0.153585,-0.178600,-0.272396,-0.252887,-0.313589
1972,-0.390170,-0.483610,-0.497001,-0.396898,-0.247946,-0.229927,-0.250030,0.023486,0.176772,0.348491,0.398185,0.390565
1973,0.388330,0.451019,0.506433,0.504120,0.413868,0.225993,0.209641,-0.123791,-0.262141,-0.342779,-0.351115,-0.381106
1974,-0.342788,-0.368178,-0.432611,-0.397226,-0.316518,-0.029043,-0.029466,0.163226,0.207940,0.308522,0.271382,0.285659
1975,0.297452,0.325721,0.409824,0.467738,0.400644,0.130462,0.052071,0.063134,0.027022,-0.109039,-0.110795,-0.083526
1976,-0.144836,-0.119556,-0.208541,-0.311880,-0.438269,-0.285157,-0.242532,-0.459715,-0.330905,-0.162218,-0.065153,-0.067502
1977,0.006663,0.026232,0.105120,0.124970,0.182444,0.307975,0.281813,0.386533,0.311224,0.177278,0.051153,0.104298
1978,0.133237,0.107616,0.108424,0.039323,0.093085,-0.011504,0.155787,0.311608,0.333526,0.350289,0.290306,0.172559
1979,0.184981,0.174167,0.147975,0.096893,0.055574,0.077326,-0.046721,-0.227586,-0.117281,-0.148290,-0.031944,0.177978
1980,0.206172,0.263171,0.261270,0.394634,0.528401,0.415706,0.405951,0.544354,0.540742,0.686222,0.602731,0.416287
1981,0.297789,0.326960,0.294698,0.282852,0.192466,0.168802,0.186678,0.134596,0.087197,-0.172166,-0.087004,-0.082079
1982,-0.054285,-0.127948,-0.089247,-0.068475,0.059160,0.107475,0.105208,0.012722,-0.165386,0.056363,0.034773,0.109209
1983,0.218938,0.252406,0.328232,0.389946,0.219220,0.137100,0.058131,0.031947,0.059129,-0.107520,-0.186752,-0.168153
1984,-0.251370,-0.297262,-0.369267,-0.462510,-0.319893,-0.230315,-0.132127,0.014506,-0.036376,-0.031129,0.119979,0.037575
1985,0.007629,0.027009,0.034744,0.097458,0.045937,0.039239,-0.059337,-0.270564,-0.221070,-0.075160,-0.166108,-0.109118
1986,-0.048696,0.014469,-0.008276,-0.091080,-0.090633,-0.057768,0.019542,0.220956,0.395942,0.318023,0.336505,0.300357
1987,0.278793,0.309856,0.234563,0.323615,0.429736,0.405071,0.535137,0.538555,0.367505,0.253961,0.357178,0.452085
1988,0.501614,0.408804,0.473775,0.406495,0.137854,0.070100,0.008860,-0.047361,-0.086401,0.035824,-0.101944,-0.172377
1989,-0.224613,-0.193344,-0.184668,-0.224658,-0.110139,-0.078934,-0.082669,0.047860,0.135699,0.055129,0.078997,0.052501
1990,0.046927,0.021005,-0.009117,-0.012867,0.097185,0.225758,0.222499,0.122589,0.295811,0.393073,0.460570,0.553951
1991,0.568866,0.604079,0.628285,0.567181,0.442586,0.407586,0.319641,0.217921,0.128829,0.067980,-0.066120,-0.152815
1992,-0.179612,-0.197367,-0.188520,-0.200265,-0.242748,-0.168517,-0.170415,-0.011602,-0.090518,-0.091286,0.008913,0.047634
1993,0.093019,0.112735,0.109840,0.160291,0.328271,0.227958,0.308502,0.296613,0.206184,0.408757,0.441929,0.458393
1994,0.418411,0.345717,0.273087,0.254893,0.234029,0.452475,0.401642,0.210498,0.235248,0.115611,0.020693,0.016976
1995,-0.020669,-0.007036,0.072706,0.188672,0.060961,-0.241516,-0.211656,-0.173302,-0.033236,-0.322712,-0.408510,-0.370635
1996,-0.302749,-0.295080,-0.266082,-0.287933,-0.126993,-0.060474,-0.094268,-0.033288,-0.023809,0.247502,0.387580,0.227103
1997,0.151002,0.144202,0.010872,-0.010656,-0.047113,0.058669,0.157592,0.254853,0.257075,0.369310,0.426273,0.519325
1998,0.613031,0.705680,0.791947,0.840849,0.905785,0.958781,0.963364,0.933826,1.002705,0.903360,0.723480,0.733759
1999,0.635940,0.512172,0.523853,0.508478,0.414404,0.225877,0.189657,0.116351,-0.042124,-0.090821,0.001876,0.000656
2000,0.015109,0.015004,-0.022226,0.029386,0.085805,0.277788,0.317666,0.466434,0.550970,0.557477,0.601499,0.609097
2001,0.629610,0.739825,0.707842,0.598330,0.432107,0.319396,0.252322,0.210998,0.302822,0.437321,0.454038,0.480322
2002,0.492204,0.447413,0.489124,0.537854,0.611055,0.669129,0.616428,0.653072,0.480368,0.430388,0.416871,0.336597
2003,0.429770,0.458149,0.533445,0.473955,0.582841,0.452454,0.453913,0.378753,0.363013,0.277619,0.334434,0.368258
2004,0.232354,0.207929,0.133569,0.047547,-0.001543,0.120905,0.109545,0.088029,-0.048455,-0.012080,-0.035746,-0.065325
2005,-0.021822,-0.055453,0.014514,0.164577,0.231259,0.045939,0.174478,0.254048,0.421331,0.465351,0.418602,0.415481
2006,0.413950,0.439091,0.355075,0.365769,0.360075,0.523489,0.480467,0.553414,0.640268,0.495846,0.509327,0.550195
2007,0.630165,0.567635,0.606204,0.563557,0.424719,0.466097,0.510094,0.174641,0.111392,0.227738,0.171936,0.134944
2008,0.020499,0.084130,0.096986,0.202811,0.248463,0.150141,-0.011855,0.452984,0.454819,0.322876,0.308799,0.335188
2009,0.386499,0.412813,0.506655,0.410127,0.410815,0.360855,0.473902,0.308412,0.375037,0.365630,0.413206,0.339305
2010,0.330448,0.324832,0.234312,0.227676,0.175640,0.178012,-0.029543,-0.180209,-0.450360,-0.436264,-0.492500,-0.365328
2011,-0.402229,-0.402825,-0.415325,-0.421970,-0.264715,-0.260897,-0.104722,-0.104918,0.096933,0.257977,0.333141,0.257008
2012,0.299889,0.234517,0.217302,0.168203,0.072260,0.128411,0.157991,0.355820,0.432747,0.275846,0.258768,0.347436
2013,0.318088,0.347168,0.363943,0.381572,0.349226,0.242258,0.197804,0.002862,-0.114611,-0.034208,-0.054208,-0.087724
2014,0.005251,0.043519,0.154413,0.185856,0.263117,0.244371,0.269260,0.324829,0.390091,0.423786,0.486854,0.605012
2015,0.537736,0.469403,0.348937,0.401174,0.503041,0.719320,0.731794,0.621410,0.460774,0.540834,0.586699,0.516486
2016,0.553409,0.611061,0.621085,0.731039,0.667660,0.713269,0.853666,0.947694,1.059981,0.934003,0.857162,0.808420
2017,0.783246,0.847201,0.971777,0.894700,0.889089,0.740491,0.623861,0.530598,0.598126,0.645833,0.765844,0.751008
2018,0.719200,0.593022,0.490205,0.337048,0.328153,0.488495,0.618123,0.930873,0.950557,1.018042,0.807248,0.815981
2019,0.842904,0.885682,0.846398,0.947979,0.905270,0.808119,0.743917,0.617537,0.671815,0.445618,0.600431,0.697624
2020,0.752701,0.764958,0.814419,0.816599,0.897022,0.908081,0.730796,0.730074,0.697762,0.818657,0.919409,0.826687
2021,0.778861,0.739889,0.812298,0.864071,0.754092,0.706020,0.870159,0.735562,0.769996,0.768730,0.472440,0.478423
2022,0.518591,0.600820,0.513370,0.444098,0.621269,0.565709,***,***,***,***,***,***

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
    oneCtx.fillText("1°", oneCanvas.width/2, oneCanvas.height/2);

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
                lines[i].material = new LineMaterial({color: lineColors[i], linewidth: 0.002});
            }
        }
        graphEnd = true;

        let camInterval;
        if(camLerp < 1) {
            camInterval = setInterval(() => {
                cam.position.lerp(new THREE.Vector3(90, 0, 5), camLerp);
                camLerp += 0.0001;
                if(camLerp >= 1) {
                    controls.enabled = true;
                    clearInterval(camInterval);
                }
            }, 200);
        }
    }
    }

    controls.update();
	requestAnimationFrame( animate );
	renderer.render( scene, cam );
}
load();
animate();
