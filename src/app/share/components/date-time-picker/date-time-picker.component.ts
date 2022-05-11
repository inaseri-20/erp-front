import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as jalali from 'jalali-moment';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {

  hours: any = [];
  minuets: any = [];

  selectedDate!: Date | null;
  selectedTime!: string;

  form!: FormGroup;

  showDatePicker = false;

  today: Date = new Date();

  constructor(public dialogRef: MatDialogRef<DateTimePickerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    for (let i = 1; i <= 24; i++) {
      this.hours.push(i.toString());
    }
    for (let i = 1; i <= 59; i++) {
      this.minuets.push(i.toString());
    }


    this.form = this.formBuilder.group({
      date: [null, []],
      hour: [new Date().getHours().toString(), []],
      minuet: [new Date().getMinutes().toString(), []]
    });

    if (this.data) {
      const date = jalali(this.data, 'HH:mm jYYYY/jMM/jDD');
      const patch = {
        date: new Date(date.toDate()),
        hour: date.toDate().getHours().toString(),
        minuet: date.toDate().getMinutes().toString()
      };
      this.form.patchValue(patch);
    }

    this.showDatePicker = true;
  }

  submit(): void {
    let date = new Date(this.form.value.date);
    date.setHours(this.form.value.hour);
    date.setMinutes(this.form.value.minuet);
    jalali.locale('fa', { useGregorianParser: true });
    let jalaliDate = jalali(date.toISOString()).format('HH:mm YYYY/MM/DD');
    this.dialogRef.close({
      gregorianDate: date,
      jalaliDate: jalaliDate
    });
  }


}
