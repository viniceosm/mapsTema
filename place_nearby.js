var map;
var infowindow;
var service;
var latAndLng = { lat: -26.504767, lng: -49.0887484 };
var currentLocal;
var typesSearch = new Set();
var typesTextSearch = new Set();
var radiusNearby = 1000;
var markersPlaceNearby = [];

window.onload = function () {
	document.getElementById('addType').onclick = function () {
		adicionaTipo();
	}

	document.getElementById('types').onkeyup = function (event) {
		if (event.keyCode == 13) {
			adicionaTipo();
		}
	};

	document.getElementById('myRange').oninput = function () {
		var m = document.getElementById('myRange').value;
		document.getElementById('valueRange').innerHTML = m + ' ' + (m == 1 ? 'metro' : 'metros');
		// pesquisaLugaresPertos()
	}

	function adicionaTipo () {
		type = document.getElementById('types').value;
		text = document.getElementById('types').options[document.getElementById('types').selectedIndex].innerText;

		if (!typesSearch.has(type)) {
			typesSearch.add(type);
			typesTextSearch.add(text);
		} else {
			typesSearch.delete(type);
			typesTextSearch.delete(text);
		}

		document.getElementById('listaTypes').innerHTML = '';
		for (t of typesTextSearch) {
			document.getElementById('listaTypes').innerHTML += '<option>' + t + '</option>';
		}

		for (i in markersPlaceNearby) {
			markersPlaceNearby[i].setMap(null);
		}

		pesquisaLugaresPertos();
	}
}

function initMap() {
	var senaiAe = latAndLng;
	currentLocal = senaiAe;

	map = new google.maps.Map(document.getElementById('map'), {
		center: currentLocal,
		zoom: 15
	});
	console.log('maps ae');

	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);

	pesquisaLugaresPertos();
}

async function pesquisaLugaresPertos() {
	if (typesTextSearch.size > 0) {
		console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

		radiusNearby = document.getElementById('myRange').value;

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
	} else {
		console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvv');
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

	markersPlaceNearby.push(markerPlaceNearby);
	console.log('criou o markeer');

	google.maps.event.addListener(markerPlaceNearby, 'mouseover', function () {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}