/*

All metropark lat/long

Indian Springs => 42.70610034334738, -83.48450809070415
Wolcott Mill => 42.77992977336758, -82.93902344902716
Stony Creek => 42.71101305731993, -83.07150606178412
Kensington => 42.54193287126255, -83.64481021084089
Lake St.Clair => 42.575103342596194, -82.79618658953692
Huron Meadows => 42.48297999787095, -83.77363308348825
Hudson Mills => 42.38634340481174, -83.90830248315238
Delhi => 42.33183755074943, -83.80911875907462
Dexter-Huron => 42.33205883032294, -83.86271939565697
Lower Huron => 42.17929628674752, -83.42451033676707
Willow => 42.136908735111845, -83.37494296171913
Oakwoods => 42.108980928421765, -83.34440025541288
Lake Erie => 42.062746857116025, -83.19873038085419

*/


const API_KEY = "replace me with api key :)";

/**
 * Enum for latitude and longitude of Metropark Locations.
 * @readonly
 * @enum {{lat: string, long: string}}
 */
const MetroparkCoords = Object.freeze({

    INDIANSPRINGS: { lat: 42.70610034334738, long: -83.48450809070415},
    WOLCOTTMILL: { lat: 42.77992977336758, long: -82.93902344902716},
    STONEYCREEK: { lat: 42.71101305731993, long: -83.07150606178412},
    KENSINGTON: { lat: 42.54193287126255, long: -83.64481021084089},
    STCLAIR: { lat: 42.575103342596194, long: -82.79618658953692},
    HURONMEADOWS: { lat: 42.48297999787095, long: -83.77363308348825},
    HUDSONMILLS: { lat: 42.38634340481174, long: -83.90830248315238},
    DELHI: { lat: 42.33183755074943, long: -83.80911875907462},
    DEXTERHURON: { lat: 42.33205883032294, long: -83.86271939565697},
    LOWERHURON: { lat: 42.17929628674752, long: -83.42451033676707},
    WILLOW: { lat: 42.136908735111845, long: -83.37494296171913},
    OAKWOODS: { lat: 42.108980928421765, long: -83.34440025541288},
    LAKEERIE: { lat: 42.062746857116025, long: -83.19873038085419}

});

let urlArr = [];

for (const key in MetroparkCoords) {
    if (Object.hasOwnProperty.call(MetroparkCoords, key)) {
        const element = MetroparkCoords[key];

        // construct URL

        urlArr.push("api.openweathermap.org/data/2.5/forecast/daily?lat=" + element.lat + "&lon=" + element.long + "&cnt=7&appid=" + API_KEY);
        
        console.log(key, " ", element); // TODO remove debug statement
    }
}

console.log(urlArr); // TODO remove debug statement