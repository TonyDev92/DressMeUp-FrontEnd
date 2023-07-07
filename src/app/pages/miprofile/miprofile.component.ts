import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-miprofile',
  templateUrl: './miprofile.component.html',
  styleUrls: ['./miprofile.component.scss']
})
export class MiprofileComponent implements OnInit{
  userId: string = "";
    constructor(private auth: AuthService  ) { }
  userName : string = "";
  email : string = "";
  street: string = "";
  postal: string = "";
  city: string = "";
  province: string = "";
  created!: any ;
  

    ngOnInit(): void {
        this.auth.checkSession().subscribe((res: any) => {
          console.log(res);
          
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
