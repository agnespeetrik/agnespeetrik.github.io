(function() {
    "use strict";
    
    //clock
    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
        setInterval(updateClock, 1000);
        
        function updateClock() {
            clock();  
                function clock() {
                var now = new Date();
                var hour = now.getHours();
                var min = now.getMinutes();
                var sec = now.getSeconds();
                var mid = 'am';
                if (hour >= 12) {
                    mid = 'pm';
                    hour = hour - 12;
                } 
                if (hour == 0){ 
                    hour = 12;
                } 
                if (min < 10) {
                    min = "0" + min;
                }
                if (sec < 10) {
                    sec = "0" + sec;
                }      
                document.getElementById('clock').innerHTML =     hour+':'+min+':'+sec +' '+mid ;
                setTimeout(clock, 1000);
                }
          };
    });
    

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    // forms
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    var e = document.getElementById("delivery");
    e.innerHTML = 0 + " &euro;";

    function estimateDelivery(event) {
        let eesnimi = document.getElementById("fname");
        let perenimi = document.getElementById("lname");

        if (eesnimi.value == "") {
            alert("Palun kirjutage eesnimi");
            eesnimi.focus();
        }
        if (hasNumber(eesnimi.value)) {
            alert("Eesnimi ei tohi sisaldada numbreid");
        } 
        if (perenimi.value == "") {
            alert("Palun kirjutage perenimi");
            perenimi.focus();
        }
        if (hasNumber(perenimi.value)) {
            alert("Perenimi ei tohi sisaldada numbreid");
        } 

        let mees = document.getElementById("male");
        let naine = document.getElementById("female");
        let muu = document.getElementById("other");

        if (!mees.checked && !naine.checked && !muu.checked) {
            alert("Palun vali sugu!");
        }

        let summa = 0;
        event.preventDefault();
        let kingitus = document.getElementById("v1");
        let kontaktivaba = document.getElementById("v2");
        var linn = document.getElementById("linn");

        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
        }
        
        if (linn.value === "trt") 
            summa += 2.5;
        if (linn.value === "nrv") 
            summa += 2.5;
        if (linn.value === "prn") 
            summa = 3;
        if (kingitus.checked) 
            summa += 5;
        if (kontaktivaba.checked)
            summa += 1;
        
        e.innerHTML = summa + " &euro;";
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map, infobox;

function GetMap() {

    "use strict";

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location((58.38104+58.888044)/2, (26.71992+25.540484)/2),
        zoom: 8.5,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: false
    });

    var infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });
    
    infobox.setMap(map);

    var tartu = new Microsoft.Maps.Location(58.38104, 26.71992);
    var paide = new Microsoft.Maps.Location(58.888044, 25.540484);
    var loc = [tartu, paide];

    for (var i = 0; i < loc.length; i++) {
        var pin = new Microsoft.Maps.Pushpin(loc[i]);
        var latitude = loc[i].clone().latitude;
        var longitude = loc[i].clone().longitude;

        if (latitude == 58.38104 && longitude == 26.71992) {
            pin.metadata = {
                title: 'Tartu Ülikool',
                description: 'Käin siin'
            };
        }
        if (latitude == 58.888044 && longitude == 25.540484) {
            pin.metadata = {
                title: 'Paide',
                description: 'Siin ei käi'
            };
        }

        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

        map.entities.push(pin);
    }
}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE