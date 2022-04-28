import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-to-home-screen',
  templateUrl: './add-to-home-screen.component.html',
  styleUrls: ['./add-to-home-screen.component.scss']
})
export class AddToHomeScreenComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddToHomeScreenComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
