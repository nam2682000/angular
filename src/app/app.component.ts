import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogCustomComponent, User } from './component/dialog-custom/dialog-custom.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSelectModule,
    MatCheckbox,
    MatButtonModule,
    DialogCustomComponent,
    MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  user: User = { name: '', age: 0 };
  constructor(public dialog: MatDialog) { }
  openDialog(): void {
    this.user = {name: '', age: 0};
    const modal = this.dialog.open(DialogCustomComponent, {
      data: { name: this.user.name, age: this.user.age },
    });
    console.log('modal',modal)
    modal.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
      }
      console.log('result',result);
    });
  }
  isShowUser: boolean = false;
  togetherUser():void {
    this.isShowUser = !this.isShowUser;
  }

}

