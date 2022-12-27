import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { user_login_url } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user Subject and user Observable to expose the user data to outside of the user service
  // Behavior Subject has read and write mode inside it
  private userSubject = new BehaviorSubject<User>(new User());

  // we don't want anything outside of the user service to write anything inside of the user Subject - public Observable
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    // userObservable is the read only version of userSubject
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> { // I => Interface
    // the main difference between an interface and a class is that a new instance of an interface cannot be created

    // return this.http.post<User>(user_login_url, userLogin);

    // we cannot use subscribe to get the value from the server, the return type will be Subscription and not Observable
    // we have piped the Observable with the tap function (rxjs)
    return this.http.post<User>(user_login_url, userLogin).pipe(
      tap({
        next: (user) => { // happy message OR toast message --> ngx-toastr (3 things to do)
          this.userSubject.next(user);

          this.toastrService.success(
            'Login Success!!!',
            `Welcome to Food Junction ${user.name}`
          )
        },
        error: (errorResponse) => {
          // unhappy message
          this.toastrService.error(errorResponse.error, 'LoginFailed');
        }
      })
    )
  }
}
