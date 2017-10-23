import { Chamado } from './../model/chamado';
import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  loadMapByLatLong(chamado) {

    console.log(chamado);

    var locsDestino = chamado.position_destino.split(',');
    //var locsRetirada = chamado.position_retirada.split(',');

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var mapProp = {
      center: new google.maps.LatLng(locsDestino[0], locsDestino[1]),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapProp);
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    directionsDisplay.setMap(map);
    if (chamado.type == "Guincho") {
      this.calculateAndDisplayRoute(directionsService, directionsDisplay, chamado);
    } else {
      var infowindow = new google.maps.InfoWindow;
      this.geocodeLatLng(geocoder, map, infowindow, locsDestino[0], locsDestino[1]);
    }

  }

  calculateAndDisplayRoute(directionsService, directionsDisplay, chamado) {
    directionsService.route({
      origin: chamado.local_retirada,
      destination: chamado.local_destino,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Erro ao traçar rota ' + status);
      }
    });
  }

  geocodeLatLng(geocoder, map, infowindow, lat, long) {

    var latlng = { lat: parseFloat(lat), lng: parseFloat(long) };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
      if (status === 'OK') {
        if (results[1]) {
          map.setZoom(15);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          //infowindow.setContent(results[1].formatted_address);
          //infowindow.open(map, marker);
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
