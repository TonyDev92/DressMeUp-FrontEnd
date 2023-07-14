import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  privateUrl = "https://dressmeupserver.onrender.com/users";

  constructor(private http: HttpClient, private router: Router ) { }

  register(user: any) {
    return this.http.post(`${this.privateUrl}/register`, user)
  }

  login(user: any) {
    return this.http.post(`${this.privateUrl}/login`, user)
  }

  userUpdate(user : any , id: string) : Observable<any>{
    
    return this.http.put(`${this.privateUrl}/updateuser/${id}`, user)
  }

  getToken() {
    
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('token=')) {

        return cookie.substring('token='.length);
      }
    }
    return '';
  }


  checkSession() {
    return this.http.post(`${this.privateUrl}/checksession`, {})
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    return throwError(error.error.message)
  }

  logOut() {
    // Remove token and user from cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  getUserId(): string | null {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('user=')) {

        const userCookie = cookie.substring('user='.length).trim(); 
        
        try {
          const validJson = userCookie.substring(0, userCookie.indexOf('}') + 1);
          //JSON Validation
          const user = JSON.parse(decodeURIComponent(validJson));
          return user._id
        } catch (error) {
          console.log("error analizando la cadena de texto", error)
        }
      }
    }
    return null;
  }

  userDelete(id: string){
      return this.http.delete(`${this.privateUrl}/delete/${id}`)
  }
}
