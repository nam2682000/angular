import { MatSelectModule } from '@angular/material/select';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogCustomComponent, User } from './component/dialog-custom/dialog-custom.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
}

