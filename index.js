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
Year,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec,J-D,D-N,DJF,MAM,JJA,SON
1880,-.18,-.24,-.09,-.16,-.10,-.21,-.18,-.10,-.15,-.23,-.22,-.17,-.17,***,***,-.12,-.17,-.20
1881,-.20,-.14,.03,.05,.06,-.19,.00,-.04,-.15,-.22,-.19,-.07,-.09,-.10,-.17,.05,-.07,-.19
1882,.16,.14,.04,-.16,-.14,-.22,-.16,-.08,-.15,-.23,-.17,-.36,-.11,-.09,.07,-.09,-.16,-.18
1883,-.29,-.37,-.12,-.19,-.18,-.07,-.07,-.14,-.22,-.11,-.24,-.11,-.18,-.20,-.34,-.16,-.09,-.19
1884,-.13,-.09,-.36,-.40,-.34,-.35,-.31,-.28,-.27,-.25,-.33,-.31,-.28,-.27,-.11,-.37,-.31,-.29
1885,-.59,-.34,-.26,-.42,-.45,-.44,-.34,-.31,-.29,-.23,-.24,-.10,-.33,-.35,-.41,-.38,-.36,-.25
1886,-.44,-.51,-.43,-.28,-.25,-.35,-.18,-.31,-.24,-.28,-.27,-.26,-.32,-.30,-.35,-.32,-.28,-.26
1887,-.72,-.57,-.36,-.35,-.31,-.25,-.26,-.36,-.26,-.36,-.27,-.33,-.37,-.36,-.52,-.34,-.29,-.29
1888,-.34,-.36,-.41,-.21,-.22,-.17,-.11,-.16,-.12,.01,.02,-.04,-.18,-.20,-.34,-.28,-.15,-.03
1889,-.09,.16,.06,.09,-.01,-.10,-.08,-.20,-.24,-.26,-.34,-.29,-.11,-.09,.01,.05,-.13,-.28
1890,-.42,-.45,-.40,-.30,-.40,-.25,-.28,-.39,-.37,-.25,-.43,-.31,-.35,-.35,-.39,-.37,-.31,-.35
1891,-.34,-.47,-.18,-.27,-.16,-.21,-.18,-.17,-.16,-.22,-.31,-.04,-.23,-.25,-.37,-.21,-.19,-.23
1892,-.29,-.11,-.40,-.33,-.23,-.22,-.31,-.27,-.17,-.14,-.42,-.38,-.27,-.25,-.15,-.32,-.27,-.24
1893,-.81,-.57,-.22,-.27,-.34,-.26,-.13,-.25,-.22,-.18,-.18,-.31,-.31,-.32,-.59,-.28,-.21,-.19
1894,-.52,-.29,-.23,-.44,-.30,-.40,-.24,-.23,-.27,-.22,-.25,-.20,-.30,-.31,-.37,-.32,-.29,-.25
1895,-.40,-.42,-.32,-.22,-.27,-.21,-.17,-.17,-.12,-.11,-.17,-.14,-.23,-.23,-.34,-.27,-.18,-.13
1896,-.22,-.13,-.26,-.30,-.16,-.11,-.02,-.05,-.07,.06,-.04,-.04,-.11,-.12,-.16,-.24,-.06,-.02
1897,-.15,-.17,-.13,-.03,-.02,-.12,-.03,-.09,-.09,-.13,-.18,-.21,-.11,-.10,-.12,-.06,-.08,-.13
1898,-.03,-.30,-.51,-.31,-.30,-.20,-.23,-.27,-.22,-.34,-.39,-.23,-.28,-.27,-.18,-.37,-.23,-.32
1899,-.16,-.39,-.36,-.21,-.23,-.31,-.16,-.09,-.05,-.04,.12,-.26,-.18,-.18,-.26,-.26,-.19,.01
1900,-.36,-.05,.00,-.09,-.09,-.09,-.13,-.09,-.05,.10,-.06,-.07,-.08,-.10,-.22,-.06,-.10,-.01
1901,-.21,-.11,.06,-.02,-.15,-.12,-.14,-.20,-.22,-.29,-.18,-.27,-.15,-.14,-.13,-.04,-.15,-.23
1902,-.18,-.06,-.28,-.28,-.32,-.30,-.28,-.30,-.29,-.29,-.35,-.42,-.28,-.27,-.17,-.29,-.29,-.31
1903,-.24,-.06,-.22,-.41,-.40,-.42,-.35,-.45,-.50,-.48,-.43,-.51,-.37,-.36,-.24,-.34,-.41,-.47
1904,-.64,-.58,-.48,-.50,-.52,-.48,-.51,-.49,-.56,-.39,-.17,-.33,-.47,-.49,-.57,-.50,-.49,-.37
1905,-.35,-.59,-.21,-.33,-.29,-.28,-.26,-.20,-.19,-.25,-.07,-.13,-.26,-.28,-.42,-.28,-.25,-.17
1906,-.28,-.29,-.18,-.05,-.25,-.19,-.23,-.20,-.28,-.20,-.38,-.15,-.22,-.22,-.24,-.16,-.21,-.29
1907,-.43,-.51,-.27,-.37,-.46,-.42,-.35,-.34,-.34,-.23,-.46,-.46,-.39,-.36,-.36,-.37,-.37,-.34
1908,-.45,-.32,-.55,-.44,-.38,-.38,-.35,-.46,-.36,-.44,-.52,-.49,-.43,-.43,-.41,-.46,-.40,-.44
1909,-.73,-.46,-.54,-.59,-.54,-.52,-.45,-.33,-.39,-.39,-.32,-.56,-.49,-.48,-.56,-.56,-.43,-.37
1910,-.42,-.40,-.50,-.43,-.33,-.38,-.34,-.37,-.39,-.41,-.55,-.67,-.43,-.42,-.46,-.42,-.36,-.45
1911,-.62,-.57,-.61,-.53,-.51,-.50,-.41,-.44,-.41,-.26,-.21,-.21,-.44,-.48,-.62,-.55,-.45,-.29
1912,-.25,-.14,-.37,-.17,-.21,-.24,-.42,-.54,-.58,-.57,-.38,-.43,-.36,-.34,-.20,-.25,-.40,-.51
1913,-.40,-.45,-.42,-.39,-.43,-.45,-.36,-.33,-.35,-.32,-.19,-.02,-.34,-.38,-.42,-.42,-.38,-.29
1914,.05,-.09,-.23,-.29,-.21,-.25,-.23,-.16,-.17,-.03,-.15,-.03,-.15,-.15,-.02,-.24,-.21,-.12
1915,-.20,-.04,-.09,.06,-.06,-.22,-.12,-.22,-.21,-.24,-.13,-.22,-.14,-.12,-.09,-.03,-.19,-.19
1916,-.12,-.14,-.28,-.30,-.34,-.49,-.37,-.28,-.36,-.33,-.46,-.82,-.36,-.31,-.16,-.31,-.38,-.38
1917,-.57,-.63,-.63,-.55,-.55,-.43,-.25,-.22,-.23,-.44,-.33,-.67,-.46,-.47,-.67,-.58,-.30,-.33
1918,-.47,-.34,-.24,-.44,-.42,-.36,-.31,-.31,-.17,-.06,-.11,-.29,-.29,-.33,-.49,-.37,-.33,-.11
1919,-.20,-.24,-.21,-.12,-.28,-.36,-.29,-.33,-.25,-.20,-.41,-.42,-.27,-.26,-.24,-.20,-.32,-.29
1920,-.24,-.26,-.12,-.24,-.26,-.35,-.30,-.26,-.21,-.26,-.26,-.46,-.27,-.26,-.30,-.21,-.30,-.25
1921,-.04,-.17,-.22,-.30,-.29,-.27,-.14,-.26,-.19,-.03,-.13,-.17,-.18,-.21,-.22,-.27,-.22,-.12
1922,-.32,-.43,-.14,-.22,-.33,-.30,-.27,-.32,-.35,-.32,-.14,-.18,-.28,-.28,-.31,-.23,-.30,-.27
1923,-.27,-.38,-.33,-.40,-.33,-.29,-.30,-.32,-.31,-.13,-.02,-.04,-.26,-.27,-.28,-.35,-.30,-.15
1924,-.23,-.23,-.08,-.31,-.18,-.25,-.28,-.35,-.32,-.35,-.21,-.42,-.27,-.24,-.17,-.19,-.30,-.29
1925,-.38,-.40,-.27,-.25,-.29,-.32,-.26,-.19,-.19,-.16,.05,.06,-.22,-.26,-.40,-.27,-.26,-.10
1926,.21,.03,.12,-.12,-.23,-.26,-.27,-.13,-.13,-.11,-.06,-.29,-.10,-.07,.10,-.08,-.22,-.10
1927,-.27,-.17,-.38,-.30,-.25,-.27,-.18,-.24,-.13,-.01,-.05,-.33,-.21,-.21,-.24,-.31,-.23,-.06
1928,-.01,-.08,-.24,-.27,-.29,-.38,-.19,-.22,-.21,-.18,-.08,-.16,-.19,-.21,-.14,-.27,-.26,-.16
1929,-.45,-.58,-.32,-.41,-.38,-.43,-.36,-.32,-.25,-.14,-.11,-.54,-.36,-.33,-.39,-.37,-.37,-.16
1930,-.29,-.26,-.10,-.24,-.23,-.22,-.21,-.15,-.15,-.12,.18,-.05,-.15,-.19,-.36,-.19,-.19,-.03
1931,-.10,-.20,-.09,-.22,-.19,-.08,-.03,-.03,-.07,.06,-.05,-.05,-.09,-.09,-.12,-.17,-.05,-.02
1932,.16,-.16,-.17,-.05,-.16,-.28,-.24,-.22,-.10,-.08,-.26,-.25,-.15,-.13,-.02,-.13,-.25,-.15
1933,-.23,-.29,-.29,-.23,-.28,-.34,-.21,-.23,-.29,-.24,-.30,-.44,-.28,-.26,-.25,-.27,-.26,-.28
1934,-.21,-.02,-.29,-.31,-.09,-.15,-.10,-.12,-.15,-.06,.04,-.02,-.12,-.16,-.22,-.23,-.12,-.06
1935,-.33,.14,-.14,-.36,-.28,-.26,-.21,-.22,-.21,-.05,-.25,-.16,-.19,-.18,-.07,-.26,-.23,-.17
1936,-.27,-.37,-.20,-.20,-.16,-.21,-.09,-.13,-.09,-.02,.02,.00,-.14,-.16,-.27,-.19,-.14,-.03
1937,-.06,.03,-.20,-.15,-.05,-.05,-.03,.02,.09,.09,.09,-.07,-.02,-.02,-.01,-.13,-.02,.09
1938,.08,.04,.10,.06,-.09,-.17,-.09,-.05,.01,.15,.08,-.12,.00,.01,.02,.02,-.10,.08
1939,-.05,-.06,-.17,-.09,-.04,-.07,-.06,-.06,-.07,-.03,.07,.44,-.02,-.06,-.08,-.10,-.06,-.01
1940,.00,.08,.09,.17,.11,.12,.13,.07,.15,.12,.17,.32,.13,.14,.17,.13,.10,.14
1941,.18,.31,.10,.16,.17,.13,.22,.15,.02,.35,.23,.22,.19,.20,.27,.15,.17,.20
1942,.29,.03,.05,.10,.11,.05,.00,-.04,-.03,.02,.10,.12,.07,.08,.18,.09,.01,.03
1943,-.01,.18,-.03,.11,.07,-.05,.09,.01,.05,.23,.20,.24,.09,.08,.10,.05,.01,.16
1944,.36,.25,.26,.19,.19,.16,.18,.18,.28,.27,.11,.04,.20,.22,.28,.21,.17,.22
1945,.10,.01,.06,.19,.06,.01,.04,.26,.20,.19,.07,-.06,.09,.10,.05,.11,.10,.15
1946,.15,.03,.02,.06,-.07,-.21,-.12,-.20,-.07,-.07,-.05,-.30,-.07,-.05,.04,.00,-.17,-.06
1947,-.06,-.07,.07,.06,-.01,-.01,-.04,-.07,-.12,.08,.03,-.13,-.02,-.04,-.15,.04,-.04,-.01
1948,.07,-.14,-.24,-.12,.00,-.05,-.11,-.11,-.14,-.05,-.12,-.23,-.10,-.09,-.07,-.12,-.09,-.10
1949,.07,-.14,-.02,-.11,-.10,-.27,-.13,-.12,-.14,-.06,-.10,-.18,-.11,-.11,-.10,-.07,-.17,-.10
1950,-.26,-.27,-.07,-.21,-.11,-.05,-.08,-.16,-.11,-.20,-.34,-.21,-.17,-.17,-.23,-.13,-.10,-.22
1951,-.34,-.41,-.20,-.14,.00,-.06,-.01,.06,.05,.08,-.01,.16,-.07,-.10,-.32,-.11,.00,.04
1952,.12,.11,-.08,.03,-.03,-.03,.04,.05,.07,.00,-.13,-.02,.01,.03,.13,-.02,.02,-.02
1953,.07,.15,.11,.19,.12,.12,.01,.05,.04,.08,-.03,.05,.08,.08,.07,.14,.06,.03
1954,-.24,-.10,-.14,-.14,-.20,-.18,-.19,-.17,-.10,-.02,.08,-.18,-.13,-.11,-.10,-.16,-.18,-.01
1955,.13,-.16,-.32,-.22,-.20,-.14,-.11,.02,-.11,-.05,-.25,-.28,-.14,-.13,-.07,-.25,-.08,-.14
1956,-.13,-.24,-.21,-.28,-.29,-.16,-.09,-.26,-.19,-.23,-.15,-.06,-.19,-.21,-.22,-.26,-.17,-.19
1957,-.09,-.03,-.05,.00,.09,.16,.02,.15,.09,.01,.08,.15,.05,.03,-.06,.01,.11,.06
1958,.39,.22,.08,.01,.06,-.09,.05,-.05,-.02,.04,.02,.01,.06,.07,.25,.05,-.03,.01
1959,.07,.07,.18,.16,.04,.03,.03,-.01,-.06,-.07,-.08,-.01,.03,.03,.05,.12,.02,-.07
1960,.00,.13,-.35,-.15,-.08,-.04,-.04,.02,.07,.06,-.12,.19,-.03,-.04,.04,-.19,-.02,.00
1961,.07,.19,.09,.13,.12,.11,.01,.00,.09,.00,.03,-.16,.06,.09,.15,.11,.04,.04
1962,.05,.15,.10,.05,-.06,.03,.02,-.01,.00,.01,.06,-.03,.03,.02,.01,.03,.01,.02
1963,-.03,.18,-.14,-.07,-.06,.05,.06,.22,.18,.14,.15,-.03,.05,.05,.04,-.09,.11,.16
1964,-.09,-.10,-.21,-.32,-.25,-.04,-.04,-.22,-.29,-.32,-.21,-.30,-.20,-.18,-.07,-.26,-.10,-.27
1965,-.08,-.17,-.13,-.19,-.12,-.08,-.13,-.04,-.15,-.05,-.06,-.08,-.11,-.13,-.18,-.15,-.09,-.09
1966,-.19,-.04,.03,-.13,-.12,.01,.08,-.09,-.03,-.17,-.01,-.03,-.06,-.06,-.11,-.07,.00,-.07
1967,-.07,-.21,.05,-.05,.12,-.08,.02,.01,-.06,.08,-.05,-.05,-.02,-.02,-.10,.04,-.02,-.01
1968,-.26,-.14,.20,-.06,-.14,-.09,-.13,-.09,-.19,.09,-.05,-.15,-.08,-.08,-.15,.00,-.10,-.05
1969,-.11,-.18,.01,.17,.18,.03,-.04,.03,.08,.09,.12,.24,.05,.02,-.14,.12,.01,.10
1970,.08,.22,.06,.05,-.03,-.03,.01,-.10,.12,.03,.02,-.12,.03,.06,.18,.03,-.04,.05
1971,-.02,-.15,-.18,-.07,-.05,-.17,-.08,-.01,-.06,-.04,-.07,-.08,-.08,-.09,-.10,-.10,-.08,-.06
1972,-.22,-.18,.02,.00,-.03,.04,.01,.16,.02,.08,.02,.18,.01,-.01,-.16,.00,.07,.04
1973,.29,.32,.29,.27,.23,.19,.13,.05,.09,.10,.05,-.07,.16,.18,.26,.26,.12,.08
1974,-.10,-.27,-.05,-.11,-.04,-.05,-.03,.11,-.08,-.06,-.08,-.08,-.07,-.07,-.14,-.07,.01,-.07
1975,.10,.08,.13,.04,.16,-.01,.00,-.17,-.02,-.11,-.17,-.17,-.01,-.01,.03,.11,-.06,-.10
1976,-.03,-.06,-.21,-.07,-.20,-.12,-.10,-.12,-.06,-.24,-.06,.11,-.10,-.12,-.09,-.16,-.11,-.12
1977,.19,.23,.24,.26,.33,.27,.20,.18,.02,.03,.16,.03,.18,.19,.17,.28,.22,.07
1978,.06,.10,.19,.17,.09,-.01,.04,-.13,.06,.03,.14,.08,.07,.06,.07,.15,-.04,.08
1979,.09,-.10,.19,.15,.04,.14,.04,.17,.25,.26,.28,.48,.16,.13,.02,.13,.11,.27
1980,.30,.40,.30,.30,.35,.20,.22,.18,.20,.13,.30,.22,.26,.28,.39,.32,.20,.21
1981,.53,.43,.48,.32,.25,.29,.32,.35,.15,.12,.23,.41,.32,.31,.39,.35,.32,.17
1982,.05,.16,.03,.15,.18,.06,.15,.04,.14,.13,.18,.43,.14,.14,.20,.12,.08,.15
1983,.53,.43,.42,.28,.34,.22,.18,.36,.37,.17,.30,.17,.31,.34,.46,.34,.25,.28
1984,.31,.14,.27,.06,.33,.02,.19,.19,.21,.14,.07,-.04,.16,.17,.21,.22,.14,.14
1985,.22,-.04,.18,.12,.14,.15,.04,.17,.13,.12,.05,.14,.12,.10,.05,.15,.12,.10
1986,.26,.37,.30,.22,.21,.12,.11,.16,.03,.15,.10,.13,.18,.18,.26,.25,.13,.10
1987,.32,.43,.18,.24,.26,.35,.40,.25,.35,.33,.29,.46,.32,.29,.29,.23,.33,.32
1988,.57,.44,.52,.43,.44,.40,.33,.39,.37,.38,.12,.29,.39,.40,.49,.46,.37,.29
1989,.13,.30,.36,.29,.17,.17,.34,.33,.34,.29,.20,.37,.27,.27,.24,.28,.28,.28
1990,.42,.44,.80,.57,.45,.37,.45,.34,.23,.45,.46,.41,.45,.45,.41,.61,.39,.38
1991,.43,.50,.35,.51,.34,.53,.47,.39,.44,.29,.29,.32,.40,.41,.44,.40,.46,.34
1992,.47,.40,.48,.27,.31,.26,.08,.08,-.01,.06,.03,.22,.22,.23,.40,.35,.14,.03
1993,.35,.37,.36,.28,.28,.23,.25,.11,.12,.23,.03,.18,.23,.24,.31,.31,.20,.13
1994,.26,.03,.29,.41,.28,.44,.30,.21,.32,.42,.44,.38,.32,.30,.16,.33,.32,.39
1995,.52,.79,.47,.47,.27,.43,.45,.45,.34,.47,.44,.26,.45,.46,.56,.40,.44,.42
1996,.24,.46,.33,.33,.27,.25,.36,.48,.25,.19,.38,.37,.33,.32,.32,.31,.37,.28
1997,.31,.41,.52,.34,.34,.54,.34,.41,.52,.61,.64,.59,.46,.44,.36,.40,.43,.59
1998,.58,.88,.63,.64,.68,.77,.66,.66,.42,.41,.43,.55,.61,.61,.68,.65,.69,.42
1999,.49,.64,.32,.32,.26,.36,.38,.32,.39,.34,.37,.41,.38,.39,.56,.30,.35,.36
2000,.25,.56,.55,.57,.36,.40,.39,.43,.39,.26,.30,.28,.39,.41,.41,.49,.40,.32
2001,.46,.44,.56,.51,.58,.52,.59,.49,.52,.50,.72,.56,.54,.51,.39,.55,.53,.58
2002,.78,.79,.88,.58,.64,.53,.61,.53,.63,.54,.59,.44,.63,.64,.71,.70,.56,.59
2003,.75,.59,.60,.55,.61,.48,.58,.64,.62,.72,.53,.75,.62,.59,.59,.58,.57,.62
2004,.58,.73,.63,.61,.37,.44,.26,.45,.50,.60,.72,.51,.53,.55,.69,.54,.38,.61
2005,.74,.60,.74,.67,.63,.64,.61,.60,.71,.75,.74,.68,.68,.66,.62,.68,.62,.73
2006,.56,.73,.63,.47,.48,.66,.54,.71,.65,.70,.74,.79,.64,.63,.66,.53,.63,.69
2007,1.02,.70,.73,.76,.69,.61,.60,.60,.60,.58,.59,.50,.66,.69,.84,.73,.60,.59
2008,.30,.38,.74,.53,.49,.49,.60,.46,.61,.67,.69,.54,.54,.54,.39,.59,.51,.65
2009,.64,.53,.54,.61,.65,.64,.74,.68,.72,.65,.79,.68,.66,.64,.57,.60,.69,.72
2010,.75,.84,.92,.84,.76,.68,.63,.67,.63,.71,.81,.45,.72,.74,.75,.84,.66,.72
2011,.52,.48,.66,.65,.53,.62,.71,.74,.57,.66,.59,.61,.61,.60,.48,.61,.69,.60
2012,.49,.49,.58,.72,.78,.65,.58,.65,.72,.79,.78,.53,.65,.65,.53,.69,.63,.77
2013,.71,.62,.67,.54,.61,.69,.60,.69,.77,.69,.83,.70,.68,.66,.62,.61,.66,.76
2014,.76,.55,.78,.80,.86,.67,.58,.83,.87,.81,.67,.78,.75,.74,.67,.81,.69,.78
2015,.86,.90,.96,.76,.80,.81,.73,.81,.85,1.09,1.06,1.16,.90,.87,.85,.84,.78,1.00
2016,1.17,1.37,1.36,1.11,.95,.80,.84,1.02,.91,.89,.92,.87,1.02,1.04,1.24,1.14,.89,.90
2017,1.03,1.14,1.17,.94,.91,.72,.82,.87,.77,.90,.88,.93,.92,.92,1.01,1.01,.80,.85
2018,.82,.85,.89,.89,.82,.77,.82,.77,.80,1.02,.82,.91,.85,.85,.87,.87,.79,.88
2019,.93,.95,1.17,1.01,.85,.91,.94,.95,.93,1.01,.99,1.09,.98,.96,.93,1.01,.93,.98
2020,1.17,1.24,1.17,1.13,1.02,.92,.90,.88,.99,.89,1.11,.81,1.02,1.04,1.17,1.11,.90,.99
2021,.82,.64,.89,.76,.78,.84,.92,.82,.92,1.00,.94,.86,.85,.85,.76,.81,.86,.95
2022,.91,.89,1.05,.84,.84,.92,.93,.95,.90,.97,.73,.80,.89,.90,.89,.91,.94,.86
2023,.87,.98,1.21,***,***,***,***,***,***,***,***,***,***,***,.88,***,***,***

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

    const monthsRad = 235;
    const monthsGeo = new THREE.RingGeometry( monthsRad-2.5, monthsRad, 64 );
    const monthsRing = new THREE.Mesh( monthsGeo, material );
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
    const oneGeo = new THREE.RingGeometry( oneRad-2.5, oneRad, 64 );
    const oneRing = new THREE.Mesh( oneGeo, material );
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
        prevMonthPolar.x, map(dataArr[index][0], dataArr[2][0], dataArr[145][0], -200, 200), prevMonthPolar.y,
        currMonthPolar.x, map(dataArr[index][0], dataArr[2][0], dataArr[145][0], -200, 200), currMonthPolar.y
    ]), new LineMaterial({color: lines.length !== 0 ? 0xffffff : color, linewidth: 0.001}));
    line.computeLineDistances();
    line.scale.set( 1, 1, 1 );
	scene.add( line );
    if(lines.length > 0) {
        lines[lines.length-1].material = new LineMaterial({color: lineColors[lines.length-1], linewidth: 0.001});
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
            lines[lines.length-1].material = new LineMaterial({color: lineColors[lines.length-1], linewidth: 0.001});
            for(let i = 0; i < lines.length; i++) {
                lines[i].material = new LineMaterial({color: lineColors[i], linewidth: 0.003});
            }
        }
        graphEnd = true;

        let camInterval;
        if(camLerp < 1) {
            camInterval = setInterval(() => {
                cam.position.lerp(new THREE.Vector3(0, 0, 5), camLerp);
                camLerp += 0.01;
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