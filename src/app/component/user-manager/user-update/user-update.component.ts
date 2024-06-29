import { ApiService } from './../../../../Service/api.service';
import { IUser } from './../../../Interface/user-interface';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatSnackBar} from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})
export class UserUpdateComponent implements OnInit {

  userForm:FormGroup;
  payload!:IUser;
  userId!:number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _service: ApiService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ){
    this.userForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      address: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required]),
      website: this.fb.control('', [Validators.required]),
      company: this.fb.control('', [Validators.required]),
    })
  }
  async ngOnInit(): Promise<void> {
    // Lấy userId từ URL
    this.userId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    console.log('userId', this.userId);

    // Lấy thông tin người dùng bằng ID
    const user = await this.getUserById(this.userId);

    // Cập nhật form với dữ liệu người dùng
    if (user) {
      this.userForm.patchValue({
        username: user.username,
        email: user.email,
        address: user.address.street,
        phone: user.phone,
        website: user.website,
        company: user.company.name
      });
    }
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
        id: this.userId,
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
        const update = await lastValueFrom(this._service.updateUser(this.userId,this.payload));
        console.log('update',update);
        if (update) {
          this.openSnackBar('User update successfully');
          // Navigate to the user list if needed
          // this.router.navigate(['/user-list']);
        } else {
          this.openSnackBar('Failed to update user');
        }
      } catch (error) {
        console.error('Error occurred while creating user', error);
        this.openSnackBar('An error occurred while creating user');
      }
    } else {
      console.log('Form is invalid');
    }
  }


  async getUserById(id:number):Promise<IUser | null> {
    try {
      const result = await lastValueFrom(this._service.getUserById(id));
      return result;
    } catch (err) {
      console.error('Error creating user', err);
      return null;
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
