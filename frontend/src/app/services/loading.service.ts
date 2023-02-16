import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // will give the methods and observables for watching the loading state and changing the loading state
  private isLoadingSubject = new BehaviorSubject<boolean>(false); // public breaks encapsulation of the class

  // always a good idea to expose methods for the behaviour to be done inside the class.

  constructor() { }

  showLoading() {
    this.isLoadingSubject.next(true);
  }

  hideLoading() {
    this.isLoadingSubject.next(false);
  }

  // getter for isLoading -> type Observable
  // when returning the subject as Observable we can make sure that no one can change its value from outside -> A Read-Only Method

  get isLoading() {
    return this.isLoadingSubject.asObservable();
  }
}
