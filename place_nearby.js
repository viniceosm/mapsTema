var map;
var infowindow;
var service;
var latAndLng = { lat: -26.504767, lng: -49.0887484 };
var currentLocal;
var typesSearch = new Set();
var radiusNearby = 4000;

// typesSearch.add('night_club');
// typesSearch.add('bar');

window.onload = function () {
	document.getElementById('addType').onclick = function () {
		type = document.getElementById('types').value;
		typesSearch.add(type);

		document.getElementById('listaTypes').innerHTML = '';
		for (t of typesSearch) {
			document.getElementById('listaTypes').innerHTML += t + '<br>';
		}

		pesquisaLugaresPertos();
	}
}

function initMap() {
	var senaiAe = latAndLng;
	currentLocal = senaiAe;

	map = new google.maps.Map(document.getElementById('map'), {
		center: currentLocal,
		zoom: 14
	});

	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);


	pesquisaLugaresPertos();
}

async function pesquisaLugaresPertos() {
	for (type of typesSearch) {
		let [results, status] = await promiseNearbySearch({
			location: currentLocal,
			radius: radiusNearby,
			type: [type]
		});

		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				createMarkerPlaceNearby(results[i]);
			}
		}
	}
}

function promiseNearbySearch (obj) {
	return new Promise((resolve, reject) => {
		service.nearbySearch(obj, function (results, status) {
			resolve([results, status]);
		});
	})
}

function createMarkerPlaceNearby(place) {
	var markerPlaceNearby = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(markerPlaceNearby, 'mouseover', function () {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}