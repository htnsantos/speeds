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

    var locsDestino = chamado.position_destino.split(',');
    var locsRetirada = chamado.position_retirada.split(',');

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
        this.calculateAndDisplayRoute(directionsService, directionsDisplay, chamado);
        
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay, chamado) {
        directionsService.route({
          origin: chamado.local_retirada,
          destination: chamado.local_destino,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

  ngOnInit() {

  }

}
