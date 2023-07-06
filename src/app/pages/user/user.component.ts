import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { pathRoutes } from 'src/app/models/routPath.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  routesPath: pathRoutes[] = [
    {path: "/usuario/miperfil", name: "Mi perfil"},
    {path: "/usuario/notificaciones" , name: "Notificaciones"},
    {path: "/usuario/configuracion", name: "Configuración"},
    {path: "/usuario/soporte", name: "Soporte"}
  ];
  constructor(private auth: AuthService, private router: Router){ }
  logOut(){
    this.auth.logOut();
    this.router.navigate(['/'])
  }
  
}
