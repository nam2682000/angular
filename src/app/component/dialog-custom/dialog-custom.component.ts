import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { 
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
 } from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dialog-custom',
  standalone: true,
  templateUrl: './dialog-custom.component.html',
  styleUrl: './dialog-custom.component.scss',
  imports: [FormsModule ,MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCustomComponent {
  user:User = {
    age : 0,
    name : '',
  }

  constructor(
    public dialogRef: MatDialogRef<DialogCustomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.user = data;
  }
  save():void{
    this.dialogRef.close(this.user);
  } 
}

export interface User{
  age:number;
  name:string;
}
