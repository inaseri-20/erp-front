import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  defaultDuration = 5000;

  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  messageError(msg: string, action?: string): void {
    this.snackBar.open(msg, action, {
      duration: this.defaultDuration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snack-bar-error']
    });
  }

  messageSuccess(msg: string, action?: string): void {
    this.snackBar.open(msg, action, {
      duration: this.defaultDuration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snack-bar-success']
    });
  }

}
