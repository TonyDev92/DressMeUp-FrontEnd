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
    })
  }
}
