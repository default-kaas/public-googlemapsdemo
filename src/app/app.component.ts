import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map?: GoogleMap
  @ViewChild('app-toggle-button') input: any; 

  setControlPosition() {
    console.log("Input found");
    console.log(this.input);
    console.log(this.map?.controls);
    const input2 = document.getElementById('app-toggle-button')
    console.log(input2);
    if (this.map && this.input)
      this.map?.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.input);
  }

  traficViewActive = false
  toggleMessage = "Verkeer"
  zoom = 8
  maxZoom = 20
  minZoom = 2
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: this.maxZoom,
    minZoom: this.minZoom,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP,
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
    },
    streetViewControl: false,

  }
  constructor() {
    this.center = { lat: 52.0907, lng: 5.1214 }
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    this.setControlPosition()
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    this.setControlPosition()
  }

  zoomIn() {
    if (this.zoom < this.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.minZoom) this.zoom--
  }
  mapReady(event: any) {
    console.log("Test")
    console.log(event)
  }

  onMapReady(mapInstance: google.maps.Map) {
    let trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(mapInstance);
  }

  receiveToggle($event: any) {
    this.traficViewActive = $event
  }
}
