import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { user_login_url, user_register_url } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { User } from '../shared/models/user';

const USER_KEY='User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user Subject and user Observable to expose the user data to outside of the user service
  // Behavior Subject has read and write mode inside it
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());

  // we don't want anything outside of the user service to write anything inside of the user Subject - public Observable
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    // userObservable is the read only version of userSubject
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User { // the latest value of the user BehaviourSubject
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> { // I => Interface
    // the main difference between an interface and a class is that a new instance of an interface cannot be created

    // return this.http.post<User>(user_login_url, userLogin);

    // we cannot use subscribe to get the value from the server, the return type will be Subscription and not Observable
    // we have piped the Observable with the tap function (rxjs)
    return this.http.post<User>(user_login_url, userLogin).pipe(
      tap({
        next: (user) => { // happy message OR toast message --> ngx-toastr (3 things to do)
          this.setUserToLocalStorage(user); // set user after successful login

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

  // Register functionality
  register(userRegiser:IUserRegister): Observable<User>{
    return this.http.post<User>(user_register_url, userRegiser).pipe(
      tap({
        next: (user) => { // happy part -> have a new user
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to the FoodJunction ${user.name}`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Register Failed')
        }
      })
    )
  }

  // LogOut functionality
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    // refresh the page
    window.location.reload();
  }

  // the User is not saved anywhere it is inside the RAM, we need to save the user inside the Local Storage,
  // so we do not have to login again if we press the Login button - setter&getter
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);

    // parse JSON and convert to User Object
    if(userJson) {
      return JSON.parse(userJson) as User;
    }
    return new User(); // new empty user
  }
}
