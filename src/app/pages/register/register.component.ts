import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(private form: FormBuilder, private auth : AuthService , private router : Router){}

  ngOnInit(): void {
      this.registerForm = this.form.group({
        name: [""],
        email: [""],
        password:[""],
        street: [""],
        postalCode: [""],
        city: [""],
        province: [""]
      })
  }


  onSubmit(){
    let user : any = this.registerForm.value;
    console.log(user); 
    this.auth.register(user).subscribe(data => {
      console.log(data);
      this.router.navigate(['/login']);
    });
  }

}
