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


const API_KEY = "";

/**
 * Enum for latitude and longitude of Metropark Locations.
 * @readonly
 * @enum {{lat: string, long: string}}
 */
const MetroparkCoords = Object.freeze({

    INDIANSPRINGS: { lat: "42.70610034334738", long: "-83.48450809070415"},
    WOLCOTTMILL: { lat: "42.77992977336758", long: "-82.93902344902716"},
    STONEYCREEK: { lat: "42.71101305731993", long: "-83.07150606178412"},
    KENSINGTON: { lat: "42.54193287126255", long: "-83.64481021084089"},
    STCLAIR: { lat: "42.575103342596194", long: "-82.79618658953692"},
    HURONMEADOWS: { lat: "42.48297999787095", long: "-83.77363308348825"},
    HUDSONMILLS: { lat: "42.38634340481174", long: "-83.90830248315238"},
    DELHI: { lat: "42.33183755074943", long: "-83.80911875907462"},
    DEXTERHURON: { lat: "42.33205883032294", long: "-83.86271939565697"},
    LOWERHURON: { lat: "42.17929628674752", long: "-83.42451033676707"},
    WILLOW: { lat: "42.136908735111845", long: "-83.37494296171913"},
    OAKWOODS: { lat: "42.108980928421765", long: "-83.34440025541288"},
    LAKEERIE: { lat: "42.062746857116025", long: "-83.19873038085419"}

});

const MetroparkResults = {
    INDIANSPRINGS: { temps: [] },
    WOLCOTTMILL: { temps: [] },
    STONEYCREEK: { temps: [] },
    KENSINGTON: { temps: [] },
    STCLAIR: { temps: [] },
    HURONMEADOWS: { temps: [] },
    HUDSONMILLS: { temps: [] },
    DELHI: { temps: [] },
    DEXTERHURON: { temps: [] },
    LOWERHURON: { temps: [] },
    WILLOW: { temps: [] },
    OAKWOODS: { temps: [] },
    LAKEERIE: { temps: [] }
};

let lastOpenedKey = "";
let urls = [];
let promises = [];
let results = [];
let WeatherData = {
    
};

for (const key in MetroparkCoords) {
    if (Object.hasOwnProperty.call(MetroparkCoords, key)) {
        const element = MetroparkCoords[key];

        // construct URL

        urls.push("https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + element.lat + "&lon=" + element.long + "&cnt=7&appid=" + API_KEY + "&units=imperial");
        
        console.log(key, " ", element); // TODO remove debug statement
    }
}

for (const url of urls) {

    promises.push(axios.get(url));

}

Promise.all([...promises])
    .then(function (output) {
        for (const result of output) {
            results.push(result);
        }
    })
    .finally(function () {
        console.log(results);
        parseWeatherData(results);
    });


function parseWeatherData(results) {
    let i = 0;
    for(const key in MetroparkResults) {
        for(let j = 0; j < 7; j++) {
            const high = results[i].data.list[j].temp.max;
            const low = results[i].data.list[j].temp.min;
            const weather = results[i].data.list[j].weather;
            MetroparkResults[key].temps.push({high: high, low: low, weather: weather});
        }
        i++;
    }
}

function insertWeatherImages(element, weather) {
    for(const weatherData of weather) {
        let img = new Image(50, 50);
        img.src = 'http://openweathermap.org/img/wn/' + weatherData.icon + '.png';
        img.alt = weatherData.description;
        img.classList.add("weatherIcon");
        element.appendChild(img);
    }
}

function popUp(key){
    var popUp = document.getElementById("popUp");
    popUp.innerHTML = "";

    let weatherList = document.createElement('ul');
    weatherList.classList.add("weatherList");

    for (let index = 0; index < 7; index++) {

        //assemble structure of row element
        let weatherRow = document.createElement('li');
        weatherRow.classList.add("weatherRow");
        let high = document.createElement("p");
        high.classList.add("weatherHigh");
        let low = document.createElement("p");
        low.classList.add("weatherLow");

        //get data      
        const day = MetroparkResults[key].temps[index];

        //configure images and temperatures
        insertWeatherImages(weatherRow, day.weather);
        high.innerText = "" + day.high + "℉";
        low.innerText = "" + day.low + "℉";

        //add text to row
        weatherRow.appendChild(high);
        weatherRow.appendChild(low);

        //add row to list
        weatherList.appendChild(weatherRow);
    }

    popUp.appendChild(weatherList);

    if (popUp.style.display === "none"){
        popUp.style.display = "block";
    }
    else {
        if(lastOpenedKey === key) popUp.style.display = "none";
    }

    lastOpenedKey = key;
}