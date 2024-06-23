import { ApiService } from './../../../../Service/api.service';
import { UserInterface } from './../../../Interface/user-interface';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  payload!: UserInterface;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _service: ApiService,
    private _snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      address: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required]),
      website: this.fb.control('', [Validators.required]),
      company: this.fb.control('', [Validators.required]),
    })
  }

  ngOnInit() {
  }

  openSnackBar(content: string) {
    this._snackBar.open(content, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  async onSubmit() {
    if (this.userForm.valid) {
      this.payload = {
        id: 0,
        name: this.userForm.value.username,
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        address: {
          street: this.userForm.value.address,
          suite: 'Apt 4',
          city: 'Anytown',
          zipcode: '12345',
          geo: {
            lat: 40.7128,
            lng: -74.0060
          }
        },
        phone: this.userForm.value.phone,
        website: this.userForm.value.website,
        company: {
          name: this.userForm.value.company,
          catchPhrase: 'Excellence and Innovation',
          bs: 'business stuff'
        }
      };
      console.log('userForm', this.userForm.value);
      console.log('payload', this.payload);
      try {
        const isAdded = await this.addUser(this.payload);
        if (isAdded) {
          this.openSnackBar('User created successfully');
          // Navigate to the user list if needed
          // this.router.navigate(['/user-list']);
        } else {
          this.openSnackBar('Failed to create user');
        }
      } catch (error) {
        console.error('Error occurred while creating user', error);
        this.openSnackBar('An error occurred while creating user');
      }
    } else {
      console.log('Form is invalid');
    }
  }


  async addUser(user: UserInterface): Promise<boolean> {
    try {
      const result = await lastValueFrom(this._service.addUser(user));
      return !!result;
    } catch (err) {
      console.error('Error creating user', err);
      return false;
    }
  }
  updateErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    control?.invalid
    if (control?.hasError('required')) {
      return 'This field is required';
    } else if (control?.hasError('email')) {
      return 'Invalid email address';
    }
    return '';
  }

  navigateToList() {
    this.router.navigate(['/user']);
  }

}
