import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects-input.component.html',
  styleUrls: ['./objects-input.component.scss']
})
export class ObjectsInputComponent implements OnInit {

  numberOfObjects: number = 30;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  setNumber(value: string) {
    this.sharedService.setNumberOfObjects(+value);
  }

}
