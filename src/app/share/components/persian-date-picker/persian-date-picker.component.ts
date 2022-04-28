import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

interface DatePicker {
  gregorianDate: Date;
  persianDate: string;
}

@Component({
  selector: 'app-persian-date-picker',
  templateUrl: './persian-date-picker.component.html',
  styleUrls: ['./persian-date-picker.component.scss']
})
export class PersianDatePickerComponent implements OnInit {
  @Input('dateControl') _dateControl!:
    | FormControl
    | AbstractControl
    | null
    | undefined;
  get dateControl(): FormControl {
    return this._dateControl as FormControl;
  }

  @Input() datePickerLabel: string = 'روزشمار';
  @Input() datePickerWidth?: string;
  @Input() filteredDays?: number[];
  @Input() minValidDate?: Date;
  @Input() maxValidDate?: Date;

  @Output() selectedDate: EventEmitter<DatePicker> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onDateChange(selectedGregorianDate: Date, persianSelectedDate: string) {
    this.selectedDate.emit({
      gregorianDate: selectedGregorianDate,
      persianDate: persianSelectedDate
    });
  }
}
