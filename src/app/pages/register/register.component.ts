import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorEmail : string = '';
  errorPassword : string = '';
  errorCity: string = '';
  errorStreet: string = '';
  errorName: string = '';
  errorProvince: string = '';
  errorPostal: string = '';
  errorMessage: string = '';


  constructor(private form: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.form.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      street: ["", Validators.required],
      postalCode: ["", Validators.required],
      city: ["", Validators.required],
      province: ["", Validators.required],
      terms: ["", Validators.requiredTrue]
    })
  }


  onSubmit() {
    
      let user: any = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        street: this.registerForm.value.street,
        postalCode: this.registerForm.value.postalCode,
        city: this.registerForm.value.city,
        province: this.registerForm.value.province
      };
  
      console.log(user);
      this.auth.register(user).subscribe(data => {
        console.log(data);
        this.router.navigate(['/login']);
      }, (error: any) => {
        if(error.status == 400){
          const {message} = error.error;
          if (message === 'invalid email') {
            this.errorMessage = 'Email inválido';
          } else if (message === 'invalid password') {
            this.errorPassword = 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial. Debe tener al menos 8 caracteres.';
          }else if(message === 'This email is already on use'){
            this.errorEmail = 'Este email ya está en uso.'
          }else if(message === 'Street Required'){
            this.errorStreet = 'Dirección no puede ser un campo vacío'
          }else if(message === 'City Required'){
            this.errorCity = 'Introduce una dirección válida.'
          }else if(message === 'Postal Code Required'){
            this.errorPostal = 'Introduce un código postal.'
          }else if(message === 'Name Required'){
            this.errorName = 'Introduce un nombre de Usuario.'
          }else if(message === 'Province Required'){
            this.errorProvince = 'Provincia es un campo requerido.'
          }else {
            this.errorMessage = 'Error de registro';
          }
        }
      });
    
    }
}
