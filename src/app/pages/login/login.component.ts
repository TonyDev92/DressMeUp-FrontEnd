import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  errorMessage: string = '';
  constructor(private form: FormBuilder,  private auth : AuthService, private router: Router){}
  ngOnInit(): void {
      this.loginForm = this.form.group({
        email: [""],
        password: [""]
      })
  }

  onSubmit(){
    let user : any = this.loginForm.value;

    this.auth.login(user).subscribe((data: any) => {
      document.cookie = `user=${JSON.stringify(data.userData)}: path=/`;
      document.cookie = `token=${data.token}`;
      
      this.router.navigate(['/inicio']);
    } ,(error: any) => {
      if (error.status === 404) {
        const { message } = error.error;
        if (message === 'invalid email address') {
          this.errorMessage = 'Email inválido';
        } else if (message === 'invalid password') {
          this.errorMessage = 'Contraseña incorrecta';
        } else {
          this.errorMessage = 'Error de inicio de sesión';
        }
      }
    } ) 
  }
}
