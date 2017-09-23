///////////////////////MODEL/////////////////////////
var Locations = [{
    id: 0,
    name: "World Trade Park",
    lat: 26.8533341,
    lng: 75.802884
}, {
    id: 1,
    name: "Gorav Tower",
    lat: 26.855516,
    lng: 75.804736
}, {
    id: 2,
    name: "Pratap Plaza",
    lat: 26.8022738,
    lng: 75.8066552
}, {
    id: 3,
    name: "Amer fort",
    lat: 26.9854913,
    lng: 75.8491514
}, {
    id: 4,
    name: "Jaigarh fort",
    lat: 26.9850925,
    lng: 75.8433988
}, {
    id: 5,
    name: "Hawa Mahal",
    lat: 26.9239411,
    lng: 75.8245498
}, {
    id: 6,
    name: "Jantar Mantar",
    lat: 26.9247668,
    lng: 75.822366
}, {
    id: 7,
    name: "Birla Mandir",
    lat: 26.8921657,
    lng: 75.8133356
}];

var ViewModel = function() {

    locNames = ko.observableArray(Locations);
    showit = function(lc) {
        show(lc);
    };
};

ko.applyBindings(new ViewModel());

///////////////ERROR HANDLING FOR MAP API////////////////

var loadFailed = function() {
    alert("Failed to load Google Maps API without this, this web app is powerless :(");
};

////////////////////////Map////////////////////////
function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {
            lat: 26.9124,
            lng: 75.7873
        }

    });

    var markers = [];
    var bounds = new google.maps.LatLngBounds();


    for (let loc of Locations) {

        var myLatLng = new google.maps.LatLng(loc.lat, loc.lng);
        var location = {
            lat: loc.lat,
            lng: loc.lng
        };

        var marker = new google.maps.Marker({
            position: location,
            map: map,
            animation: google.maps.Animation.DROP,
            title: loc.name
        });
        markers.push(marker);
        bounds.extend(myLatLng);

        var infoWindow = new google.maps.InfoWindow({

        });

    }

    google.maps.event.addDomListener(window, 'resize', function() {
  map.fitBounds(bounds); // `bounds` is a `LatLngBounds` object
});

    map.fitBounds(bounds);

    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }



    var callBack = function(marker, lc) {
        google.maps.event.addListener(marker, "click", function(e) {
            //Wraped the content inside an HTML DIV in order to set height and width of InfoWindow.
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 3000);
            }
            fetch('https://api.foursquare.com/v2/venues/search?client_id=' +
                    'PVIQJ5PWWLE3UMRRNDZ3X1SWVFEHIXNRH12HCXEF0D0J5GOQ&' +
                    '&client_secret=YJ0TST4PGCM41UPONGMIEW2ZKOP04XAX2SJS' +
                    'MXGYI3DYMTEU&v=20161209' + '&ll=' + Locations[lc].lat + ',' +
                    Locations[lc].lng + '&query=\'' + Locations[lc].name + '\'&limit=1')
                .then(
                    function(response) {
                        if (response.status !== 200) {
                            alert('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        // Examine the text in the response  
                        response.json().then(function(data) {

                            if (data.response.venues[0].location.formattedAddress !== undefined) {
                                infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + '<h6>' + "Address:" + '</h6>' + data.response.venues[0].location.formattedAddress.join() + "</div>");
                                infoWindow.open(map, marker);
                            } else {
                                infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + '<h6>' + "Address:" + '</h6>' + "Address not available." + "</div>");
                                infoWindow.open(map, marker);

                            }
                        });

                    }
                ).catch(function(error) {
                    alert('There has been a problem with your fetch operation: ' + error.message);
                });

        });
        this.show = function(lc) {
            google.maps.event.trigger(markers[lc], 'click');
        };
    };

    for (var i = 0; i < markers.length; i++) {
        callBack(markers[i], i);
    }

}