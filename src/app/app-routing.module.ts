import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path:"" , loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingModule)},
  {path:"login", loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  {path:"register", loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},
  {path:"inicio", loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  {path:"productos", loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule)},
  {path:"productos/:class", loadChildren: () => import('./pages/class/class.module').then(m => m.ClassModule)},
  {path:"carrito", loadChildren: ()=> import('./pages/cart/cart.module').then(m => m.CartModule)},
  {path:"usuario", loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]},
  {path:"usuario/miperfil", loadChildren: () => import('./pages/miprofile/miprofile.module').then(m => m.MiprofileModule), canActivate: [AuthGuard]},
  {path:"usuario/notificaciones", loadChildren: () => import('./pages/notificaciones/notificaciones.module').then(m => m.NotificacionesModule), canActivate: [AuthGuard]},
  {path:"usuario/configuracion", loadChildren: () => import('./pages/configuracion/configuracion.module').then(m => m.ConfiguracionModule), canActivate: [AuthGuard]},
  {path:"usuario/soporte", loadChildren: () => import('./pages/soporte/soporte.module').then(m => m.SoporteModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
