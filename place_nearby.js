var map;
var infowindow;
var service;
var latAndLngInit = { lat: -26.504767, lng: -49.0887484 };
var typesToSearch = {
	value: new Set(),
	text: new Set()
};
var currentLocal;
var radiusNearbyToSearch = 1000;
var markers = {
	placeNearby: []
};

var opTypes = getOpTypes();

var keyAPI = `AIzaSyARUAyY2s-UFWXLCQj-wsGeb0_Ogv4jKBE`;
var urlGeocode = `https://maps.googleapis.com/maps/api/geocode/json?key=${keyAPI}&address=`;

window.onload = function () {
	document.getElementById('addType').onclick = function () {
		adicionaTipo();
	}

	document.getElementById('types').onkeyup = function (event) {
		if (event.keyCode == 13) {
			adicionaTipo();
		}
	};

	for (op of opTypes) {
		document.getElementById('types').innerHTML += `<option value="${ op.value }">${ op.text }</option>`;
	}

	if (opTypes !== undefined && opTypes.findIndex((o) => o.value == 'night_club') > -1) {
		document.getElementById('types').value = 'night_club';
	}


	document.getElementById('myRange').oninput = function () {
		var m = document.getElementById('myRange').value;
		document.getElementById('valueRange').innerHTML = `${m} ${(m == 1 ? 'metro' : 'metros')}`;
		// pesquisaLugaresPertos()
	}

	function adicionaTipo () {
		type = document.getElementById('types').value;
		text = document.getElementById('types').options[document.getElementById('types').selectedIndex].innerText;

		if (!typesToSearch.value.has(type)) {
			typesToSearch.value.add(type);
			typesToSearch.text.add(text);
		} else {
			typesToSearch.value.delete(type);
			typesToSearch.text.delete(text);
		}

		document.getElementById('listaTypes').innerHTML = '';
		for (t of typesToSearch.text) {
			document.getElementById('listaTypes').innerHTML += `<option>${t}</option>`;
		}

		for (i in markers.placeNearby) {
			markers.placeNearby[i].setMap(null);
		}

		pesquisaLugaresPertos();
	}
}

function initMap() {
	currentLocal = latAndLngInit;

	map = new google.maps.Map(document.getElementById('map'), {
		center: currentLocal,
		zoom: 15
	});

	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);

	pesquisaLugaresPertos();
}

async function pesquisaLugaresPertos() {
	if (typesToSearch.text.size > 0) {
		radiusNearbyToSearch = document.getElementById('myRange').value;

		for (type of typesToSearch.value) {
			let [results, status] = await promiseNearbySearch({
				location: currentLocal,
				radius: radiusNearbyToSearch,
				type: [type]
			});

			if (status === google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					createMarkerPlaceNearby(results[i]);
				}
			}
		}
	}
}

function promiseNearbySearch (obj) {
	return new Promise((resolve, reject) => {
		service.nearbySearch(obj, (results, status) => {
			resolve([results, status]);
		});
	})
}

function createMarkerPlaceNearby(place) {
	var markerPlaceNearby = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	markers.placeNearby.push(markerPlaceNearby);

	google.maps.event.addListener(markerPlaceNearby, 'mouseover', function () {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}

function getOpTypes () {
	return [{ "value": "accounting", "text": "contabilidade" }, { "value": "airport", "text": "aeroporto" }, { "value": "amusement_park", "text": "parque de diversões" }, { "value": "aquarium", "text": "aquário" }, { "value": "art_gallery", "text": "galeria de arte" }, { "value": "atm", "text": "atm" }, { "value": "bakery", "text": "padaria" }, { "value": "bank", "text": "banco" }, { "value": "bar", "text": "bar" }, { "value": "beauty_salon", "text": "salão de beleza" }, { "value": "bicycle_store", "text": "loja de bicicletas" }, { "value": "book_store", "text": "loja de livro" }, { "value": "bowling_alley", "text": "boliche" }, { "value": "bus_station", "text": "estação de onibus" }, { "value": "cafe", "text": "café" }, { "value": "campground", "text": "área de camping" }, { "value": "car_dealer", "text": "vendedor de carros" }, { "value": "car_rental", "text": "aluguer de carros" }, { "value": "car_repair", "text": "reparo de carro" }, { "value": "car_wash", "text": "lavação de carro" }, { "value": "casino", "text": "casino" }, { "value": "cemetery", "text": "cemiterio" }, { "value": "church", "text": "igreja" }, { "value": "city_hall", "text": "prefeitura" }, { "value": "clothing_store", "text": "loja de roupas" }, { "value": "convenience_store", "text": "loja de conveniencia" }, { "value": "courthouse", "text": "tribunal" }, { "value": "dentist", "text": "dentista" }, { "value": "department_store", "text": "loja de departamento" }, { "value": "doctor", "text": "doutor" }, { "value": "electrician", "text": "eletricista" }, { "value": "electronics_store", "text": "lojas eletronicas" }, { "value": "embassy", "text": "embaixada" }, { "value": "fire_station", "text": "corpo de bombeiros" }, { "value": "florist", "text": "florista" }, { "value": "funeral_home", "text": "funeraria" }, { "value": "furniture_store", "text": "loja de moveis" }, { "value": "gas_station", "text": "posto de gasolina" }, { "value": "gym", "text": "academia" }, { "value": "hair_care", "text": "cuidado capilar" }, { "value": "hardware_store", "text": "loja de hardware" }, { "value": "hindu_temple", "text": "templo hindu" }, { "value": "home_goods_store", "text": "loja de artigos para o lar" }, { "value": "hospital", "text": "hospital" }, { "value": "insurance_agency", "text": "agência de seguros" }, { "value": "jewelry_store", "text": "joalheria" }, { "value": "laundry", "text": "lavanderia" }, { "value": "lawyer", "text": "advogado" }, { "value": "library", "text": "biblioteca" }, { "value": "liquor_store", "text": "loja de bebidas" }, { "value": "local_government_office", "text": "secretaria do governo local" }, { "value": "locksmith", "text": "chaveiro" }, { "value": "lodging", "text": "alojamento" }, { "value": "meal_delivery", "text": "entrega de refeições" }, { "value": "meal_takeaway", "text": "drive thru" }, { "value": "movie_rental", "text": "aluguel de filmes" }, { "value": "movie_theater", "text": "cinema" }, { "value": "moving_company", "text": "companhia movente" }, { "value": "museum", "text": "museu" }, { "value": "night_club", "text": "night club" }, { "value": "painter", "text": "pintor" }, { "value": "park", "text": "park" }, { "value": "parking", "text": "parking" }, { "value": "pet_store", "text": "loja de animais" }, { "value": "pharmacy", "text": "farmacia" }, { "value": "physiotherapist", "text": "Fisioterapeuta" }, { "value": "plumber", "text": "encanador" }, { "value": "police", "text": "policia" }, { "value": "post_office", "text": "agencia de correios" }, { "value": "real_estate_agency", "text": "agencia imobiliaria" }, { "value": "restaurant", "text": "restaurante" }, { "value": "roofing_contractor", "text": "empreiteiro de coberturas" }, { "value": "rv_park", "text": "rv park" }, { "value": "school", "text": "escola" }, { "value": "shoe_store", "text": "loja de tenis" }, { "value": "shopping_mall", "text": "shopping" }, { "value": "spa", "text": "spa" }, { "value": "stadium", "text": "estadio" }, { "value": "storage", "text": "armazenam" }, { "value": "store", "text": "loja" }, { "value": "subway_station", "text": "estação de metrô" }, { "value": "supermarket", "text": "super mercado" }, { "value": "synagogue", "text": "sinagoga" }, { "value": "taxi_stand", "text": "ponto de taxi" }, { "value": "train_station", "text": "estação de trem" }, { "value": "transit_station", "text": "estação de transito" }, { "value": "travel_agency", "text": "agencia de viagem" }, { "value": "veterinary_care", "text": "veterinario" }, { "value": "zoo", "text": "zoo" }];
}