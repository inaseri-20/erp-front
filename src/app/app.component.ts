import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddToHomeScreenComponent } from './share/components/add-to-home-screen/add-to-home-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'منتورینگ آنلاین';
  screenWidth: any;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getScreenSize();
    if (!window.matchMedia('(display-mode: standalone)').matches && this.screenWidth < 600) {
      this.dialog.open(AddToHomeScreenComponent, {
        minWidth: '100%',
        height: '100%'
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
  }
}
