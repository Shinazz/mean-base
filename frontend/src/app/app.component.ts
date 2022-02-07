import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Sample Customer App';
  @ViewChild('sidenav')
  sidenav: MatSidenav | undefined;

  reason = '';
  constructor(private data: DataService) {}
  close(reason: string) {
    this.reason = reason;
    this.sidenav?.close();
  }
  open() {
    this.data.openSideNav.next(!this.data.openSideNav.value);
  }
}
