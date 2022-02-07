import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay, filter } from 'rxjs/operators';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent implements OnInit {
  ngOnInit(): void {}
  title = 'Task Manager';
  @ViewChild('sidenav')
  sidenav: MatSidenav | undefined;
  constructor(private router: Router, private data: DataService) {
    this.data.openSideNav
      .pipe(
        delay(0),
        filter((status) => status !== null)
      )
      .subscribe((status) => {
        if (status) {
          this.sidenav?.open();
        } else {
          this.sidenav?.close();
        }
      });
  }
  reason = '';

  close(type: string) {
    this.router.navigate(['home', type]);

    // this.reason = reason;
    this.sidenav?.close();
  }
}
