import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from './components/table/data-table.component';
import { TimerComponent } from './components/timer/timer.component';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ObjectsInputComponent } from './components/objects/objects-input.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    DataTableComponent,
    TimerComponent,
    ObjectsInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    ToastModule
  ]
})
export class DataTableModule { }
