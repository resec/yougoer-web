var map_styles = [{
    "featureType": "water",
    "stylers": [{
        "saturation": 43
    }, {
        "lightness": -11
    }, {
        "hue": "#0088ff"
    }]
}, {
    "featureType": "road.highway",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi.business",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#fff0c4"
    }]
}, {
    "featureType": "poi.business",
    "elementType": "labels",
    "stylers": [{
        "visibility": "on"
    }, {
        "Weight": 8
    }]
}, {
    "featureType": "poi.school",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "on"
    }, {
        "weight": 8
    }, {
        'hue': '#ff0000'
    }, {
        'saturation': 100
    }]
}, {
    "featureType": "poi.school",
    "elementType": "labels.text",
    "stylers": [{
        "visibility": "on"
    }, {
        "weight": 8
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}];

var map;
var localposition = {
    lat: 39.615638,
    lng: -100.033789,
};
var googleMap = this;

function CenterControl(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(77, 77, 77)';
    controlText.style.fontFamily = 'SimHei,Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '15px';
    controlText.style.paddingRight = '15px';
    controlText.innerHTML = '有果儿';
    controlUI.appendChild(controlText);

    controlUI.addEventListener('click', function() {
        map.setCenter(localposition);
    });
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: localposition,
        zoom: 11,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
    });
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    map.setOptions({
        styles: map_styles
    });
};
