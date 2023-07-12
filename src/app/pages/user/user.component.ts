import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pathRoutes } from 'src/app/models/routPath.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  userId : string = "";
  showModal : boolean = false;
  routesPath: pathRoutes[] = [
    {path: "/usuario/miperfil", name: "Mi perfil"},
    {path: "/usuario/notificaciones" , name: "Notificaciones"},
    {path: "/usuario/configuracion", name: "Configuración"},
    {path: "/usuario/soporte", name: "Soporte"}
  ];
  constructor(private auth: AuthService, private router: Router ,
    public themeService : ThemeService){ }


    ngOnInit(): void {
        this.auth.checkSession().subscribe((res : any) => {
          this.userId = res._id;
          console.log(this.userId);
        })
    }
  logOut(){
    this.auth.logOut();
    this.router.navigate(['/'])
  }

  deleteAcount(){
    this.auth.userDelete(this.userId).subscribe((res : any) => {
      console.log(res);
      this.showModal = false;
      if(res.message === 'Account Delete'){
        this.auth.logOut();
        this.router.navigate(['/']);
      }
    })
  }
  
}
