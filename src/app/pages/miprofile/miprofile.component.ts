import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-miprofile',
  templateUrl: './miprofile.component.html',
  styleUrls: ['./miprofile.component.scss']
})
export class MiprofileComponent implements OnInit{


  constructor(private auth: AuthService , public themeService : ThemeService ) { }

  
  userId: string = "";
  userName : string = "";
  email : string = "";
  street: string = "";
  postal: string = "";
  city: string = "";
  province: string = "";
  created!: any ;
  

    ngOnInit(): void {
        this.auth.checkSession().subscribe((res: any) => {
          
          this.userName = res.name;
          this.email = res.email;
          this.street = res.street;
          this.province = res.province;
          this.created = new Date(res.createdAt)
          this.city = res.city;
          this.postal = res.postalCode;
          const key = Object.keys(res)
        })
    }


}
