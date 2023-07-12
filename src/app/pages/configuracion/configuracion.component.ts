import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  showModal: boolean = false;
  modalMessage: string = '';

  updateUserForm!: FormGroup;

  sunOrMoon!: string;
  userId: string = "";
  userName: string = "";
  email: string = "";
  street: string = "";
  postal: string = "";
  city: string = "";
  province: string = "";

  constructor(public themeService: ThemeService, private auth: AuthService, private form: FormBuilder) { }


  ngOnInit(): void {

    this.sunOrMoon = this.getThemeIcon();


    this.auth.checkSession().subscribe((res: any) => {
      this.userId = res._id;
      this.userName = res.name;
      this.email = res.email;
      this.street = res.street;
      this.province = res.province;
      this.city = res.city;
      this.postal = res.postalCode;
    })


    this.updateUserForm = this.form.group({
      name: new FormControl(this.userName, Validators.required),
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      street: new FormControl(this.street, Validators.required),
      province: new FormControl(this.province, Validators.required),
      city: new FormControl(this.city, Validators.required),
      postalCode: new FormControl(this.postal, Validators.required)
    })
  }


  toggleTheme() {
    this.themeService.toggleTheme();
    this.sunOrMoon = this.getThemeIcon();
  }

  openModal(message: string) {
    this.modalMessage = message;
    this.showModal = true;
  }


  onSaveChanges() {
    

    if (this.updateUserForm.invalid) {
      this.openModal('Por favor, complete todos los campos correctamente.');
      return;
    }
    this.auth.userUpdate(this.updateUserForm.value, this.userId).subscribe(res => {
      console.log(res);
      if(res.message === 'User updated succesfully' ){
        this.openModal('Los cambios se realizaron correctamente.')
      }else{
        this.openModal('No se pudieron guardar los cambios. Inténtalo de nuevo.')
      }
    },
    error => {
      this.openModal('Ocurrió un error al guardar los cambios. Inténtalo más tarde.')
    })
    
  }
  getThemeIcon(): string {
    return this.themeService.getCurrentTheme() === 'light' ? 'sun-icon' : 'moon-icon';
  }
}
