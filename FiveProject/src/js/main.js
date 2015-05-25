/**
 * Created by Dub4ek on 3/21/15.
 */
var application = application || {};
var MOBILE_VIEW_WIDTH = 768;
var MY_PLACE_DATA = [
    {
        title: 'Theatre',
        position: { lat: 55.656735, lon: 37.540289 }
    },
    {
        title: 'Swimming pool',
        position: { lat: 55.790413, lon: 37.604194 }
    },
    {
        title: 'Football field',
        position: { lat: 55.788657, lon: 37.793652 }
    },
    {
        title: 'Park',
        position: { lat: 55.787360, lon: 37.818736 }
    }
];

function initialize() {
    'use strict';
    var mapOptions = {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        center: new google.maps.LatLng(55.745, 37.660),
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        panControl: false
    };

    application.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    application.insertMyData(MY_PLACE_DATA);

    if (ko) {
        ko.applyBindings(application.viewModel);
    }
}

/**
 * Show error splash screen if Google did not load.
 * Else run init function when DOM loads.
 */
if (window.google === undefined) {
    var errorSplash = document.getElementsByClass('connection-error-splash');

    if (errorSplash) {
        errorSplash.style.display = 'block';
    }

    var navbar = document.getElementsByClass('navbar');

    if (navbar) {
        navbar.style.display = 'none';
    }
} else {
    google.maps.event.addDomListener(window, 'load', initialize);
}

/**
 * Insert my data to the map
 * @param data
 */
application.insertMyData = function (data) {
    'use strict';
    data.forEach(function (item) {
        application.addMarker(item);
    });
};

/**
 * Add marker to the map
 * @param data marker data
 * @param flag special marker flag
 */
application.addMarker = function (data, flag) {
    'use strict';
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.position.lat, data.position.lon),
        map: application.map,
        icon: flag === 'forsquare' ? 'src/img/forsquare.png' : null,
        title: data.title,
        animation: google.maps.Animation.DROP
    });

    if (flag !== undefined) {
        marker.specialFlag = flag;
    }

    google.maps.event.addListener(marker, 'click', function () {
        application.showInfoWindow(marker);
    });

    application.viewModel.places.push(marker);
};
/**
 * Define view model component
 */
application.viewModel = new (function () {
    'use strict';
    var self = this;

    if (!ko) {
        return;
    }

    self.places = ko.observableArray([]);
    self.showMarker = function (data, event) {
        var index = ko.contextFor(event.target).$index();
        var marker = self.places()[index];

        application.map.panTo(marker.getPosition());
        if (self.mobileView()) {
            application.map.panBy(0, -100);
        } else {
            application.map.panBy(150, 0);
        }
        application.showInfoWindow(marker);
    };
    self.searchPhrase = ko.observable('');
    self.searchProcess = function () {
        var searchText = self.searchPhrase();
        var latlon = application.map.getCenter();

        if (searchText) {
            application.getFoursquareResponse(latlon.k, latlon.D, searchText, application.forsquareCallback);
        }
    };

    self.resetData = function () {
        var collection = application.viewModel.places();
        for (var i = 0; i < collection.length; i++) {
            collection[i].setMap(null);
        }
        self.places.removeAll();
        application.insertMyData(MY_PLACE_DATA);
    };

    self.windowWidth = ko.observable(window.innerWidth);
    self.windowHeight = ko.observable(window.innerHeight);

    self.mobileView = ko.computed(function () {
        return self.windowWidth() < MOBILE_VIEW_WIDTH;
    });
})();

/**
 * Show Google street view window
 * @param marker
 */
application.showInfoWindow = function (marker) {
    'use strict';
    var imgDiv = '<img src="http://maps.googleapis.com/maps/api/streetview?size={size}&location={location}" alt="{title}">';

    function getImageSize() {
        if (application.width < MOBILE_VIEW_WIDTH) {
            return '150x120';
        }

        return '320x200';
    }

    imgDiv = imgDiv.replace('{size}', getImageSize());
    imgDiv = imgDiv.replace('{location}', marker.getPosition().toString());
    imgDiv = imgDiv.replace('{title}', marker.title.replace(/"/g, '&quot;'));

    if (application.infoWindow) {
        application.infoWindow.close();
    }

    if (application.currentMarker) {
        application.currentMarker.setAnimation(null);
    }

    application.infoWindow = new google.maps.InfoWindow({
        content: [
            '<div class="infoWindow">',
            imgDiv,
            '<br>',
            marker.title.replace(/"/g, '&quot;'),
            '</div>'].join('')
    });

    google.maps.event.addListener(application.infoWindow, 'closeclick', function () {
        if (application.currentMarker) {
            application.currentMarker.setAnimation(null);
        }
    });

    application.infoWindow.open(application.map, marker);
    application.currentMarker = marker;
    marker.setAnimation(google.maps.Animation.BOUNCE);
};

/**
 * Send request to forsquare site
 * @param lat coordinates
 * @param lon coordinate
 * @param searchTerm search phrase
 * @param callback
 */
application.getFoursquareResponse = function (lat, lon, searchTerm, callback) {
    'use strict';
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var json = JSON.parse(xmlhttp.response);
            if (json.meta.code === 200) {
                callback(json);
            } else {
                console.log("ERROR in app.getFoursquareResponse: " + json.message);
            }
        }
    };
    xmlhttp.addEventListener('error', function () {
        alert('Unable to connect with Foursquare.com.');
    });

    var requestString = [
        'https://api.foursquare.com/v2/venues/explore',
        '?client_id=IZOLIHBJ212PETIENX1EMUT4BGZKLU4TRO1E0Z3LZ023XQLT',
        '&client_secret=CQPVM2BW1Z4ESPDAMMS3X2H00RLRBYZFWP1XNVMOV5TTT5KN',
        '&v=20130815',
        '&ll=' + 55.752 + ',' + 37.615,
        '&radius=8000',
        '&query=' + searchTerm
    ].join('');
    xmlhttp.open('GET', requestString, true);
    xmlhttp.send();
};

/**
 * Parse request from Forsquare site
 * @param response answer from forsquare server
 */
application.forsquareCallback = function (response) {
    'use strict';
    var items = response.response.groups['0'].items;

    removePreviousSearchResults();

    for (var i = 0; i < items.length; i = i + 1) {
        var feature = {
            title: items[i].venue.name,
            icon: 'icons/foursquare.png',
            position: {
                lat: items[i].venue.location.lat,
                lon: items[i].venue.location.lng
            }
        };
        application.addMarker(feature, 'forsquare');
    }


    function removePreviousSearchResults() {
        var marker;
        var collection = application.viewModel.places();

        if (!collection) {
            return;
        }

        for (var i = 0; i < collection.length; i++) {
            marker = collection[i];
            if (marker.specialFlag) {
                marker.setMap(null);
                application.viewModel.places.remove(marker);
            }
        }
    }
};
/**
 * Keep actual curretn window parameters to change loaded image size
 */
window.onresize = function () {
    'use strict';
    application.viewModel.windowWidth(window.innerWidth);
    application.viewModel.windowHeight(window.innerHeight);
    application.width = window.innerWidth;
    application.height = window.innerHeight;
};

application.width = window.innerWidth;
application.height = window.innerHeight;