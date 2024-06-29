import { Component, OnInit, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../Service/api.service';
import { ILogin } from '../../Interface/user-interface';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  _service = inject(ApiService);

  loginForm: FormGroup;
  constructor(private fb: FormBuilder,) {
    this.loginForm = this.fb.group({
      userName: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }
  ngOnInit(): void {
    
  }
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const token = await this.login({userName:this.loginForm.value.userName, password:this.loginForm.value.userName});
      if(token){
        localStorage.setItem('authToken',token);
      }
      console.log('token',token);
    }
  }

  async login(loginForm :ILogin):Promise<string>{
    const token = await lastValueFrom(this._service.login(loginForm));
    return token.token;
  }


  async callApi(): Promise<void> {
    try {
      const result = await lastValueFrom(this._service.GetAllUser());
      console.log('result', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
