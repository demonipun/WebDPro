import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


// FOR FINDING THE DEFAULT LOCATION OF THE USER, WE CAN USE THE JS NAVIGATOR BUT IF I DON'T WANT IT USE IT AS JS
// I WILL NEED TO DEFINE IT AS AN OBSERVABLE INSIDE THE LOCATION SERVICE.

export class MapComponent implements OnInit {

  // setting latitude and longitude to the current order
  @Input() order!:Order;

  // showing the marker on the screen
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62]; // latitude, longitude

  // Decorator with the name of ViewChild -> responsibility is selecting a tag from the view file(html)
  // and putting it inside the field
  @ViewChild('map', {static:true}) // static: true so that we can use ViewChild inside ngOnInit()
  mapRef!: ElementRef;
  currentMarker!:Marker;

  map!: Map; // of type Leaflet
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() { // initialize the map

    if(this.map) return; // if the map is already initialised then return the value

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false, // not show leaflet in bottom right of the web-page
    }).setView(this.DEFAULT_LATLNG, 1); // zoom level = 1
    // mapRef is a part of Angular but it has native JS property inside it.

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map); // tile layer system of Open-Street Map

    // functionality to move the marker on click event
    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation(){
    this.locationService.getCurrentLocation().subscribe({ // subscribe to the Observable
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latlng)
      }
    })
  }

  setMarker(latlng:LatLngExpression){ // LatLngExpression = LatLng | LatLngLiteral | LatLngTuple
    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker)
    {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    // current marker not available so we generate another one
    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);


    // *****
    this.currentMarker.on('dragend', () => { // when dragging ends
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  // setting and getting latitude and logitude of the order
  set addressLatLng(latlng: LatLng){
    if(!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8)); // toFixed(8) -> done for MongoDb
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }

}
