import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  private readonly basePath = 'http://157.245.105.135:8080/apt/';
  private readonly loginPatah = 'admin/login';
  private readonly blocksPath = 'dashboard/getallblocks';

  token = JSON.parse(localStorage.getItem('token') || '');

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X_ACCESS_TOKEN':  `  Bearer ${this.token}`
  });


  options = { headers: this.headers };

  login(email: string, password: string) {
    const credentialBody = {
      email: email,
      password: password,
    };
    this.http
      .post(`${this.basePath}${this.loginPatah}`, credentialBody)
      .subscribe((res: any) => {
        if (res.message === 'Success') {
          localStorage.setItem(
            'token',
            JSON.stringify(res.jwtResponse.X_ACCESS_TOKEN)
          );
          this.router.navigateByUrl('dashboard');
          console.log(localStorage.getItem('token'));
        }
      });
  }

  getAllSociety() {
    return this.http.get(`${this.basePath}${this.blocksPath}`, this.options);
  }
}
