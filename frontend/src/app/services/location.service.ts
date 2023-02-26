import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  // We could also use Behavior-Subject but it is good in situations where we want to change the value in different methods

  getCurrentLocation(): Observable<LatLngLiteral>{ // LatLng literal has just latitude and longitude fields inside it
    return new Observable((observer) => { // if anything changes 'observable' informs the 'Observable' object
      if(!navigator.geolocation) return; // if browser supports geolocation

      return navigator.geolocation.getCurrentPosition(
        (pos) => { // success callback
          observer.next({
            lat: pos.coords.latitude, // coming from JS
            lng: pos.coords.longitude
          })
        },
        (error) => {
          observer.error(error);
        }
      )
    })
  }
}
