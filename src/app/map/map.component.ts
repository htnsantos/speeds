import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  loadMapByLatLong(long, lat) {
    var mapProp = {
            center: new google.maps.LatLng(long, lat),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapProp);
         var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        this.geocodeLatLng(geocoder, map, infowindow, lat, long);
  }

  geocodeLatLng(geocoder, map, infowindow, lat, long) {
  
  var latlng = {lat: parseFloat(long), lng: parseFloat(lat)};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(15);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

  ngOnInit() {

  }

}
