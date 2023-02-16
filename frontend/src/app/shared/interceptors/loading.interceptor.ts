import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

// Angular has a great way of intercepting the requests that means staying between the Server and the client AND
// seeing all the requests that goes to the Server.
// We can start loading when there is a request and stop it when all requests get finished.

var pending_requests = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading();
    pending_requests++;

    return next.handle(request).pipe(
      tap({
        next:(event) => { // happy part
          if(event.type === HttpEventType.Response) {
            this.handleLoading();
          }
        },
        error: (_) => {
          this.handleLoading();
        }
      })
    );
  }

  handleLoading() {
    pending_requests--;

    if(pending_requests === 0) {
      this.loadingService.hideLoading();
    }
  }
}
