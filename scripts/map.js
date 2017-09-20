///////////////////////MODEL/////////////////////////
var Locations = [{
        name: "World Trade Park",
        lat: 26.8533341,
        lng: 75.802884
    },
    {
        name: "Gorav Tower",
        lat: 26.855516,
        lng: 75.804736
    },
    {
        name: "Pratap Plaza",
        lat: 26.8022738,
        lng: 75.8066552
    },
    {
        name: "Amer fort",
        lat: 26.9854913,
        lng: 75.8491514
    },
    {
        name: "Jaigarh fort",
        lat: 26.9850925,
        lng: 75.8433988
    }
];

let ViewModel = function() {

    this.locNames = ko.observableArray(Locations);

}

ko.applyBindings(new ViewModel());
////////////////////////Map////////////////////////
function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {
            lat: 26.9124,
            lng: 75.7873
        }

    });

    var bounds = new google.maps.LatLngBounds();

    for (let loc of Locations) {

        var myLatLng = new google.maps.LatLng(loc.lat, loc.lng);
        var location = {
            lat: loc.lat,
            lng: loc.lng
        };

        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        bounds.extend(myLatLng);

    }
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });


    map.fitBounds(bounds);

}