import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RateLimitterService {
  private requestSubject = new Subject<void>();

  // Adjust the throttle time (milliseconds) based on your desired rate limit
  private throttleTime = 2000;

  constructor() {}

  // Emits a value when the next request is allowed
  onRequestAllowed(): Observable<void> {
    return this.requestSubject.pipe(throttleTime(this.throttleTime));
  }

  // Trigger this method when a request is made
  triggerRequest() {
    this.requestSubject.next();
  }
}
