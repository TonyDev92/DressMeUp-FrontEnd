import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.scss']
})
export class SoporteComponent implements OnInit{

  user!: string;
  constructor(private auth: AuthService , public theme: ThemeService) {}
  ngOnInit(): void {
      this.auth.checkSession().subscribe((res: any) => {
        this.user  = res.name;
      })
  }
}
