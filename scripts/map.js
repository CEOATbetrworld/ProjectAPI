var Locations = [{
     name : "Jaipur",
     lat:26.9124,
     lng:75.7873
},
{
     name : "Jaipur",
     lat:26.9124,
     lng:75.7873
},
{
     name : "Jaipur",
     lat:26.9124,
     lng:75.7873
},
{
     name : "Jaipur",
     lat:26.9124,
     lng:75.7873
},
{
     name : "Jaipur",
     lat:26.9124,
     lng:75.7873
}
];


function initMap(){
	var jaipur = {
		lat:26.9124,
		lng:75.7873
	};

var map = new google.maps.Map(document.getElementById('map'),
	{
		zoom: 4,
		center:jaipur
	});
var marker = new google.maps.Marker({
          position: jaipur,
          map: map
        });

}