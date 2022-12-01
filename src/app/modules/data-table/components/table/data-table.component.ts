import { Component, OnDestroy, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { MessageService } from 'primeng/api';
import { debounceTime, Subscription } from 'rxjs';
import { DataObject } from 'src/app/models/data-object.model';
import { WebSocketEvent } from 'src/app/enums/socket.enum';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [MessageService]
})
export class DataTableComponent implements OnInit, OnDestroy{
  worker!: Worker | null;
  timer: number = 1000;
  timer$!: Subscription;
  numberObjects: number = 30;
  numberObjects$!: Subscription;
  dataObjects: any = [];

  constructor(private sharedService: SharedService, 
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.registerTimerObserver();
    this.registerNumberObserver();

    // Load data with default values
    this.getData(this.timer, this.numberObjects);
  }

  registerTimerObserver() {
    this.timer$ = this.sharedService.timer$
      .pipe(
        debounceTime(500)
      )
      .subscribe((time: number) => {
        console.log('timer changed: ', time);
        this.timer = time;
        this.sendMessageToWorker(this.timer, this.numberObjects);
      });
  }

  registerNumberObserver() {
    this.numberObjects$ =  this.sharedService.numberOfObjects$
      .pipe(
        debounceTime(500)
      )
      .subscribe((numObjs: number) => {
        console.log('number of objects changed: ', numObjs);
        this.numberObjects = numObjs;
        this.sendMessageToWorker(this.timer, this.numberObjects);
      });
  }

  sendMessageToWorker(timer: number, numObjs: number) {
    this.worker?.postMessage({ event: WebSocketEvent.MESSAGE, timer, numObjs });
  }

  getData(timer: number, numObjs: number) {
    if (typeof Worker === 'undefined') {
      return;
    }

    this.worker = new Worker(
      new URL('../../data-table.worker', import.meta.url)
    );

    this.openWebSocket(this.worker);
    this.sendMessageToWorker(timer, numObjs);
  }

  openWebSocket(worker: Worker) {
    worker.onmessage = ({ data }) => {
      // console.log('data received', data);
      if (data.message) {
        this.dataObjects = plainToClass(DataObject, data.message, {enableCircularCheck: true});
      }
    };
    worker.postMessage({ event: WebSocketEvent.OPEN });
  }

  closeWebSocket(showMsg: boolean = true) {
    if(showMsg) {
      this.messageService.add({key: 'tr', severity:'success', summary: 'Success', detail: 'Socket connection closed.'})
    }
    this.worker?.postMessage({ event: WebSocketEvent.CLOSE });
  }

  ngOnDestroy(): void {
      this.timer$?.unsubscribe();
      this.numberObjects$?.unsubscribe();
  }
}
