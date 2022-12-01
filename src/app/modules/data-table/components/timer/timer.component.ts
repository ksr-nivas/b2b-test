import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  timeInMsec: number = 1000;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  setTimer(value: string) {
    this.sharedService.setTimer(+value);
  }

}
