import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-confilm',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialog-confilm.component.html',
  styleUrl: './dialog-confilm.component.scss'
})
export class DialogConfilmComponent {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
}
export interface DialogData {
  title: string;
  message: string;
}
