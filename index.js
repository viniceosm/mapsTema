var styleMap = getStyleMap();

function initMap() {
    var map,
        currentPositionMarker,
        mapCenter = new google.maps.LatLng(14.668626, 121.24295),
        map;

    function initializeMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: mapCenter,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: styleMap
        });
    }

    function locError(error) {
        // tell the user if the current position could not be located
        alert("The current position could not be found!");
    }

    // current position of the user
    function setCurrentPosition(pos) {
        currentPositionMarker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(
                pos.coords.latitude,
                pos.coords.longitude
            ),
            title: "Current Position"
        });
        panTo(pos);
    }

    function displayAndWatch(position) {
        // set current position
        setCurrentPosition(position);

        // watch position
        watchCurrentPosition();
    }

    function watchCurrentPosition() {
        var positionTimer = navigator.geolocation.watchPosition(function (position) {
            setMarkerPosition(
                currentPositionMarker,
                position
            );
        });
    }

    function setMarkerPosition(marker, position) {
        marker.setPosition(
            new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude)
        );
        panTo(position);
    }

    function panTo(position){
        map.panTo(new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
        ));
    }

    function initLocationProcedure() {
        initializeMap();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
        } else {
            // tell the user if a browser doesn't support this amazing API
            alert("Your browser does not support the Geolocation API!");
        }
    }

    window.onload = function(){
        initLocationProcedure();
    };
}

function getStyleMap() {
    return [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#cbcbd0"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#bd1aa8"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "saturation": "32"
                },
                {
                    "lightness": "100"
                },
                {
                    "gamma": "10.00"
                },
                {
                    "weight": "2.30"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#bd1aa8"
                },
                {
                    "weight": "1.02"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#bd1aa8"
                },
                {
                    "visibility": "on"
                },
                {
                    "weight": "1.02"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "weight": "1.02"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#bd1aa8"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "weight": "1.02"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#bd1aa8"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#352384"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ];
}
