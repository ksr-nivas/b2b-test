import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SharedService {
    constructor() { }
    
    private timer = new Subject<number>();
    timer$ = this.timer.asObservable();

    private numberOfObjects = new Subject<number>();
    numberOfObjects$ = this.numberOfObjects.asObservable();

    setTimer(timerInMSec: number) {
        this.timer.next(timerInMSec);
    }

    setNumberOfObjects(numObjects: number) {
        this.numberOfObjects.next(numObjects);
    }

}