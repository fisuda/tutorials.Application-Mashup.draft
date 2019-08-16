'use strict';

const config = require('./config');
const request = require('request');
const orionUrl = deleteTrailingSlash(config.orion_url);
const fiwareService = config.fiwareService;
const fiwareServicePath = config.fiwareServicePath;
const trains = config.trains;
const interval = config.interval * 1000;

var trainRoute = {
    'id': 'urn:ngsi-ld:TrainRoute:JR-East.yamanote',
    'type': 'Route',
    'name': {
      'type': 'Text',
      'value': 'Yamanote Line'
    },
   'operator': {
     'type': 'Text',
     'value': 'JR-East'
   },
   'railway': {
     'type': 'Text',
     'value':'Yamanote'
   },
   'lineColor': {
     'type': 'Text',
     'value': '#99cc00'
   },
    'location': {
      'type': 'geo:json',
      'value': {
        'type': 'LineString',
        'coordinates': [ [ 139.76248, 35.73669 ], [ 139.76067, 35.73826 ], [ 139.76023, 35.73863 ], [ 139.76009, 35.73875 ], [ 139.75992, 35.7389 ],
          [ 139.759, 35.73967 ], [ 139.7585, 35.74006 ], [ 139.75683, 35.74048 ], [ 139.75622, 35.74053 ], [ 139.75598, 35.74052 ], [ 139.7558, 35.7405 ],
          [ 139.75559, 35.74046 ], [ 139.75516, 35.74033 ], [ 139.75491, 35.74024 ], [ 139.75475, 35.74017 ], [ 139.75459, 35.7401 ], [ 139.75228, 35.73896 ],
          [ 139.75035, 35.73799 ], [ 139.75007, 35.73785 ], [ 139.74937, 35.73749 ], [ 139.74914, 35.73738 ], [ 139.74909, 35.73736 ], [ 139.74697, 35.73634 ],
          [ 139.74677, 35.73622 ], [ 139.74648, 35.73618 ], [ 139.74531, 35.73572 ], [ 139.74435, 35.73534 ], [ 139.74144, 35.73419 ], [ 139.73926, 35.73325 ],
          [ 139.73863, 35.73298 ], [ 139.73686, 35.7322 ], [ 139.73539, 35.73157 ], [ 139.73449, 35.7312 ], [ 139.73372, 35.731 ], [ 139.73296, 35.73088 ],
          [ 139.73229, 35.73087 ], [ 139.73173, 35.7309 ], [ 139.73113, 35.731 ], [ 139.7304, 35.73117 ], [ 139.72996, 35.73128 ], [ 139.72971, 35.73135 ],
          [ 139.72906, 35.73151 ], [ 139.72893, 35.73154 ], [ 139.72695, 35.73203 ], [ 139.72422, 35.73276 ], [ 139.72087, 35.73365 ], [ 139.71958, 35.73399 ],
          [ 139.71811, 35.73433 ], [ 139.71732, 35.7345 ], [ 139.71692, 35.73453 ], [ 139.71626, 35.73455 ], [ 139.7157, 35.7345 ], [ 139.71515, 35.73439 ],
          [ 139.7146, 35.73423 ], [ 139.71398, 35.73401 ], [ 139.71363, 35.73381 ], [ 139.7133, 35.73362 ], [ 139.71308, 35.73349 ], [ 139.71258, 35.73304 ],
          [ 139.71236, 35.73273 ], [ 139.71167, 35.73152 ], [ 139.7105, 35.72903 ], [ 139.70915, 35.72618 ], [ 139.70802, 35.72406 ], [ 139.7068, 35.72181 ],
          [ 139.7066, 35.72145 ], [ 139.70596, 35.71933 ], [ 139.70582, 35.71889 ], [ 139.70578, 35.71875 ], [ 139.70495, 35.71621 ], [ 139.70492, 35.7161 ],
          [ 139.70485, 35.7159 ], [ 139.70473, 35.71557 ], [ 139.70466, 35.71535 ], [ 139.70461, 35.71521 ], [ 139.70448, 35.71482 ], [ 139.70438, 35.71454 ],
          [ 139.70423, 35.7141 ], [ 139.70418, 35.71395 ], [ 139.70403, 35.71349 ], [ 139.70342, 35.71171 ], [ 139.70298, 35.71048 ], [ 139.7027, 35.70967 ],
          [ 139.70258, 35.70933 ], [ 139.70099, 35.70486 ], [ 139.70065, 35.70389 ], [ 139.70054, 35.70322 ], [ 139.70038, 35.70221 ], [ 139.70032, 35.70175 ],
          [ 139.70019, 35.70011 ], [ 139.70006, 35.6989 ], [ 139.69999, 35.69828 ], [ 139.69986, 35.69775 ], [ 139.69952, 35.69644 ], [ 139.69943, 35.69595 ],
          [ 139.69942, 35.69572 ], [ 139.6994, 35.69531 ], [ 139.69947, 35.6948 ], [ 139.69967, 35.69392 ], [ 139.69994, 35.69286 ], [ 139.69999, 35.69264 ],
          [ 139.70002, 35.69228 ], [ 139.70003, 35.69201 ], [ 139.70004, 35.69167 ], [ 139.70024, 35.68926 ], [ 139.70034, 35.6889 ], [ 139.70036, 35.68882 ],
          [ 139.70062, 35.68792 ], [ 139.70088, 35.68719 ], [ 139.70127, 35.68625 ], [ 139.70176, 35.6851 ], [ 139.70203, 35.6845 ], [ 139.70239, 35.68309 ],
          [ 139.70255, 35.68262 ], [ 139.70278, 35.68201 ], [ 139.70313, 35.68105 ], [ 139.70321, 35.68074 ], [ 139.70331, 35.68039 ], [ 139.70384, 35.67842 ],
          [ 139.70398, 35.67771 ], [ 139.70413, 35.67667 ], [ 139.70412, 35.67583 ], [ 139.70412, 35.67552 ], [ 139.70399, 35.67489 ], [ 139.70345, 35.67338 ],
          [ 139.70295, 35.6722 ], [ 139.70275, 35.67156 ], [ 139.70264, 35.6711 ], [ 139.70251, 35.67042 ], [ 139.70243, 35.6699 ], [ 139.7024, 35.66976 ],
          [ 139.70239, 35.66961 ], [ 139.70239, 35.66954 ], [ 139.70237, 35.66934 ], [ 139.70235, 35.66914 ], [ 139.70232, 35.66891 ], [ 139.70205, 35.66678 ],
          [ 139.70201, 35.6665 ], [ 139.70164, 35.66349 ], [ 139.7016, 35.66319 ], [ 139.70147, 35.66213 ], [ 139.70143, 35.66181 ], [ 139.70123, 35.66023 ],
          [ 139.70118, 35.65978 ], [ 139.70117, 35.65965 ], [ 139.70118, 35.65956 ], [ 139.70122, 35.65937 ], [ 139.70124, 35.6593 ], [ 139.70129, 35.65907 ],
          [ 139.70137, 35.6588 ], [ 139.70174, 35.65785 ], [ 139.70201, 35.65746 ], [ 139.70221, 35.65723 ], [ 139.70334, 35.65595 ], [ 139.70427, 35.6549 ],
          [ 139.70538, 35.65366 ], [ 139.70543, 35.6536 ], [ 139.70548, 35.65355 ], [ 139.70555, 35.65346 ], [ 139.70597, 35.65298 ], [ 139.70643, 35.65241 ],
          [ 139.70658, 35.65224 ], [ 139.70691, 35.65193 ], [ 139.70742, 35.65134 ], [ 139.70773, 35.65097 ], [ 139.70776, 35.65092 ], [ 139.70791, 35.65065 ],
          [ 139.70856, 35.64947 ], [ 139.7087, 35.64923 ], [ 139.70937, 35.64804 ], [ 139.70956, 35.6477 ], [ 139.70971, 35.64743 ], [ 139.71054, 35.64593 ],
          [ 139.71079, 35.64546 ], [ 139.7111, 35.6449 ], [ 139.71145, 35.64426 ], [ 139.7118, 35.64361 ], [ 139.71202, 35.64323 ], [ 139.7122, 35.64297 ],
          [ 139.71261, 35.64224 ], [ 139.71334, 35.64093 ], [ 139.71404, 35.63967 ], [ 139.71413, 35.63949 ], [ 139.71424, 35.63924 ], [ 139.71438, 35.63865 ],
          [ 139.71442, 35.63847 ], [ 139.71444, 35.63841 ], [ 139.71448, 35.63828 ], [ 139.71455, 35.63804 ], [ 139.71479, 35.63702 ], [ 139.71491, 35.63667 ],
          [ 139.71499, 35.63644 ], [ 139.71502, 35.63627 ], [ 139.71505, 35.6361 ], [ 139.71529, 35.63513 ], [ 139.7154, 35.63467 ], [ 139.71544, 35.63452 ],
          [ 139.71551, 35.63421 ], [ 139.71557, 35.63395 ], [ 139.71562, 35.63369 ], [ 139.71574, 35.63327 ], [ 139.71585, 35.63284 ], [ 139.71636, 35.63136 ],
          [ 139.71667, 35.63084 ], [ 139.71713, 35.63027 ], [ 139.71773, 35.62975 ], [ 139.71829, 35.62944 ], [ 139.71957, 35.62888 ], [ 139.72015, 35.62862 ],
          [ 139.7214, 35.62806 ], [ 139.72186, 35.6278 ], [ 139.72231, 35.62749 ], [ 139.72262, 35.62727 ], [ 139.72321, 35.62672 ], [ 139.72407, 35.62562 ],
          [ 139.72422, 35.62543 ], [ 139.72436, 35.62526 ], [ 139.72496, 35.62446 ], [ 139.72519, 35.62415 ], [ 139.72628, 35.62262 ], [ 139.72761, 35.62077 ],
          [ 139.72888, 35.61912 ], [ 139.7295, 35.6183 ], [ 139.72964, 35.61816 ], [ 139.73002, 35.61777 ], [ 139.73023, 35.6176 ], [ 139.7304, 35.61748 ],
          [ 139.73068, 35.61732 ], [ 139.73081, 35.61725 ], [ 139.73099, 35.61717 ], [ 139.73119, 35.61709 ], [ 139.73149, 35.617 ], [ 139.73227, 35.61682 ],
          [ 139.7328, 35.61677 ], [ 139.73342, 35.61684 ], [ 139.73399, 35.61691 ], [ 139.73444, 35.61704 ], [ 139.73454, 35.61708 ], [ 139.73508, 35.61729 ],
          [ 139.73527, 35.61741 ], [ 139.7356, 35.61761 ], [ 139.73634, 35.61828 ], [ 139.73668, 35.61869 ], [ 139.73695, 35.61901 ], [ 139.73753, 35.62031 ],
          [ 139.73762, 35.62049 ], [ 139.73764, 35.6206 ], [ 139.73812, 35.6226 ], [ 139.73824, 35.62318 ], [ 139.73829, 35.6234 ], [ 139.73855, 35.62452 ],
          [ 139.73855, 35.62455 ], [ 139.73866, 35.62501 ], [ 139.73881, 35.62549 ], [ 139.73883, 35.62608 ], [ 139.73876, 35.62638 ], [ 139.7387, 35.62669 ],
          [ 139.73863, 35.627 ], [ 139.73844, 35.62927 ], [ 139.73843, 35.63014 ], [ 139.7384, 35.63147 ], [ 139.7384, 35.633 ], [ 139.73847, 35.63359 ],
          [ 139.7386, 35.63418 ], [ 139.73873, 35.63458 ], [ 139.73884, 35.63484 ], [ 139.73924, 35.63564 ], [ 139.74015, 35.63726 ], [ 139.74057, 35.638 ],
          [ 139.74097, 35.63875 ], [ 139.74151, 35.63973 ], [ 139.74164, 35.64 ], [ 139.742, 35.64096 ], [ 139.7421, 35.64132 ], [ 139.74217, 35.64148 ],
          [ 139.74275, 35.64217 ], [ 139.7431, 35.64253 ], [ 139.74351, 35.64303 ], [ 139.74376, 35.64332 ], [ 139.74418, 35.64373 ], [ 139.74504, 35.64431 ],
          [ 139.74677, 35.64528 ], [ 139.74697, 35.64537 ], [ 139.74824, 35.64611 ], [ 139.75153, 35.64766 ], [ 139.75294, 35.64834 ], [ 139.75371, 35.64888 ],
          [ 139.7547, 35.64968 ], [ 139.75514, 35.65021 ], [ 139.75551, 35.65073 ], [ 139.75609, 35.65196 ], [ 139.75642, 35.6527 ], [ 139.75666, 35.65357 ],
          [ 139.75697, 35.65468 ], [ 139.75728, 35.65614 ], [ 139.75734, 35.65638 ], [ 139.75745, 35.65678 ], [ 139.75817, 35.65958 ], [ 139.75824, 35.65987 ],
          [ 139.75847, 35.66084 ], [ 139.75857, 35.66147 ], [ 139.7586, 35.66209 ], [ 139.7586, 35.66291 ], [ 139.75842, 35.66432 ], [ 139.75826, 35.66558 ],
          [ 139.75814, 35.6672 ], [ 139.75817, 35.66821 ], [ 139.7582, 35.66841 ], [ 139.75826, 35.66863 ], [ 139.75836, 35.66886 ], [ 139.75851, 35.66913 ],
          [ 139.75899, 35.66991 ], [ 139.7598, 35.67143 ], [ 139.75991, 35.67163 ], [ 139.76034, 35.67244 ], [ 139.76054, 35.67274 ], [ 139.76074, 35.67299 ],
          [ 139.76116, 35.67336 ], [ 139.7616, 35.67372 ], [ 139.76206, 35.6741 ], [ 139.76254, 35.67448 ], [ 139.76398, 35.6756 ], [ 139.76444, 35.67597 ],
          [ 139.76471, 35.67626 ], [ 139.76499, 35.67662 ], [ 139.76523, 35.67711 ], [ 139.76552, 35.6778 ], [ 139.76621, 35.67965 ], [ 139.76716, 35.68228 ],
          [ 139.76764, 35.68359 ], [ 139.76849, 35.68586 ], [ 139.76933, 35.6881 ], [ 139.77054, 35.69096 ], [ 139.77121, 35.69258 ], [ 139.77159, 35.69345 ],
          [ 139.77185, 35.69403 ], [ 139.77229, 35.69494 ], [ 139.77268, 35.69586 ], [ 139.7728, 35.69635 ], [ 139.77292, 35.69772 ], [ 139.77317, 35.69935 ],
          [ 139.77333, 35.70053 ], [ 139.77343, 35.70134 ], [ 139.77351, 35.70165 ], [ 139.77355, 35.70174 ], [ 139.77374, 35.70223 ], [ 139.77388, 35.70261 ],
          [ 139.77401, 35.70307 ], [ 139.77407, 35.70334 ], [ 139.77435, 35.70497 ], [ 139.77457, 35.70632 ], [ 139.77486, 35.70807 ], [ 139.77494, 35.70854 ],
          [ 139.77495, 35.70874 ], [ 139.77495, 35.70897 ], [ 139.77493, 35.70911 ], [ 139.77474, 35.71056 ], [ 139.7747, 35.71095 ], [ 139.77474, 35.7112 ],
          [ 139.77482, 35.71152 ], [ 139.77487, 35.71163 ], [ 139.77507, 35.71205 ], [ 139.77664, 35.71439 ], [ 139.77764, 35.71551 ], [ 139.77847, 35.71646 ],
          [ 139.77936, 35.71756 ], [ 139.77962, 35.71797 ], [ 139.7797, 35.71829 ], [ 139.77976, 35.71871 ], [ 139.77972, 35.71905 ], [ 139.77958, 35.71951 ],
          [ 139.77936, 35.71998 ], [ 139.77916, 35.72034 ], [ 139.77865, 35.72085 ], [ 139.77741, 35.72206 ], [ 139.77564, 35.7237 ], [ 139.77543, 35.72391 ],
          [ 139.77509, 35.72423 ], [ 139.77477, 35.72454 ], [ 139.77399, 35.72524 ], [ 139.77347, 35.72566 ], [ 139.77309, 35.72595 ], [ 139.77274, 35.7262 ],
          [ 139.77227, 35.72647 ], [ 139.77188, 35.72667 ], [ 139.77145, 35.72691 ], [ 139.7712, 35.7271 ], [ 139.77093, 35.7273 ], [ 139.77037, 35.7278 ],
          [ 139.77016, 35.72798 ], [ 139.77015, 35.72799 ], [ 139.76956, 35.72853 ], [ 139.76898, 35.72917 ], [ 139.76818, 35.73012 ], [ 139.76744, 35.73108 ],
          [ 139.76729, 35.73127 ], [ 139.76675, 35.73213 ], [ 139.76656, 35.73241 ], [ 139.76626, 35.73289 ], [ 139.76619, 35.73301 ], [ 139.76602, 35.7332 ],
          [ 139.76551, 35.73384 ], [ 139.76514, 35.73426 ], [ 139.76477, 35.73462 ], [ 139.76439, 35.73497 ], [ 139.76419, 35.73515 ], [ 139.76342, 35.73584 ],
          [ 139.76257, 35.73661 ], [ 139.76248, 35.73669 ] ]
      }
    }
};

var stationLocation = [
    ['Tokyo',       139.767068, 35.681282],
    ['Kanda',        139.770678, 35.691559],
    ['Akihabara',    139.772900, 35.698225],
    ['Okachimachi',  139.774566, 35.707113],
    ['Ueno',         139.776788, 35.713501],
    ['Uguisudani',   139.777898, 35.721278],
    ['Nippori',      139.770954, 35.727110],
    ['NishiNippori', 139.766788, 35.731832],
    ['Tabata',       139.761510, 35.737387],
    ['Komagome',     139.747900, 35.736831],
    ['Sugamo',       139.740341, 35.733813],
    ['Otsuka',       139.727902, 35.731554],
    ['Ikebukuro',    139.710959, 35.729887],
    ['Mejiro',       139.706238, 35.720166],
    ['Takadanobaba', 139.703738, 35.712666],
    ['ShinOkubo',    139.700128, 35.700723],
    ['Shinjuku',     139.700406, 35.690169],
    ['Yoyogi',       139.702073, 35.683503],
    ['Harajuku',     139.702629, 35.671282],
    ['Shibuya',      139.701519, 35.657950],
    ['Ebisu',        139.709852, 35.646562],
    ['Meguro',       139.715685, 35.633508],
    ['Gotanda',      139.723463, 35.626287],
    ['Osaki',        139.728185, 35.620177],
    ['Shinagawa',    139.738739, 35.628787],
    ['Tamachi',      139.747627, 35.645730],
    ['Hamamatsucho', 139.757070, 35.655451],
    ['Shimbashi',    139.757903, 35.666283],
    ['Yurakucho',    139.762868, 35.674901]
];

var trainLocation = [
  [139.747627,  35.645730],
  [139.740746,  35.638319],
  [139.738739,  35.628787],
  [139.736751,  35.618770],
  [139.728185,  35.620177],
  [139.726219,  35.622698],
  [139.723463,  35.626287],
  [139.719541,  35.628950],
  [139.715685,  35.633508],
  [139.713465,  35.640573],
  [139.709852,  35.646562],
  [139.706968,  35.651861],
  [139.701519,  35.657950],
  [139.701703,  35.664586],
  [139.702629,  35.671282],
  [139.703841,  35.678330],
  [139.702073,  35.683503],
  [139.701100,  35.686796],
  [139.700406,  35.690169],
  [139.699716,  35.697248],
  [139.700128,  35.700723],
  [139.701812,  35.707481],
  [139.703738,  35.712666],
  [139.705109,  35.716922],
  [139.706238,  35.720166],
  [139.708448,  35.725016],
  [139.710959,  35.729887],
  [139.718382,  35.734280],
  [139.727902,  35.731554],
  [139.734347,  35.731275],
  [139.740341,  35.733813],
  [139.744239,  35.735325],
  [139.747900,  35.736831],
  [139.753970,  35.739862],
  [139.761510,  35.737387],
  [139.764184,  35.735046],
  [139.766788,  35.731832],
  [139.768594,  35.729707],
  [139.770954,  35.727110],
  [139.774945,  35.724394],
  [139.777898,  35.721278],
  [139.779312,  35.717530],
  [139.776788,  35.713501],
  [139.774666,  35.710796],
  [139.774566,  35.707113],
  [139.773926,  35.703112],
  [139.772900,  35.698225],
  [139.772521,  35.695619],
  [139.770678,  35.691559],
  [139.768656,  35.686596],
  [139.767068,  35.681282],
  [139.765705,  35.677758],
  [139.762902,  35.674894],
  [139.759740,  35.671382],
  [139.757903,  35.666283],
  [139.758440,  35.660647],
  [139.757070,  35.655451],
  [139.754471,  35.649492]
];

function deleteTrailingSlash(url) {
  return url.substr(-1, 1) != '/' ? url : url.slice(0, -1);
}

function appendRequest(entities) {
  var headers = {
    'Content-Type': 'application/json',
    'Fiware-Service': fiwareService,
    'Fiware-ServicePath': fiwareServicePath
  };
  
  var options = {
      url: orionUrl + '/v2/op/update',
      method: 'POST',
      headers: headers,
      json: {
        "actionType": "append",
        "entities": entities
      }
  };
    
  request(options, function (error, response, body) {
    if (error || response.statusCode !== 204)  {
      console.log('error');
    }
  });
}

async function run() {
  let entities = [];

  stationLocation.forEach(station => {
    entities.push({
      id: `urn:ngsi-ld:Station:${station[0]}`,
      type: 'Station',
      name: {
        type: 'Text',
        value: station[0]
      },
      location: {
        type: 'geo:json',
        value: {
          type: 'Point',
          coordinates: [ station[1], station[2] ]
        }
      }
    });
  });
  
  entities.push(trainRoute);
  appendRequest(entities);

  console.log("add station");

  if (trains < 1 || trains > 5) {
      trains = 3;
  }

  while (true) {
    for (let i = 0; i < trainLocation.length; i++) {
      entities= [];
      for (let j = 0; j < trains; j++) {
        let pos = (i + j * Math.floor(trainLocation.length / trains)) % trainLocation.length;
        entities.push({
          id: 'urn:ngsi-ld:Train:Train00' + j ,
          type: 'Train',
          name: {
            type: 'Text',
            value: 'Train00' + j
          },
          location: {
            type: 'geo:json',
            value: {
              type: 'Point',
              coordinates: trainLocation[pos]
            }
          }
        });
      }
      appendRequest(entities);
      await sleep(interval);
    }
  }
}

function sleep(millisec) {
  return new Promise(resolve => setTimeout(resolve, millisec));
}

run();
