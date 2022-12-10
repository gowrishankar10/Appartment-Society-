import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  private readonly basePath = 'http://157.245.105.135:8080/apt/';
  private readonly loginPatah = 'admin/login';
  private readonly blocksPath = 'dashboard/getallblocks';

  loginError = new Subject();

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    X_ACCESS_TOKEN: `  Bearer ${JSON.parse(localStorage.getItem('token') || '')}`,
  });

  options = { headers: this.headers };

  login(email: string, password: string) {
    const credentialBody = {
      email: email,
      password: password,
    };
    return this.http
      .post(`${this.basePath}${this.loginPatah}`, credentialBody)
      .subscribe((res: any) => {
        if (res.message === 'Success') {
          localStorage.setItem(
            'token',
            JSON.stringify(res.jwtResponse.X_ACCESS_TOKEN)
          );
          this.router.navigateByUrl('dashboard');
          console.log(localStorage.getItem('token'));
        } else {
          this.loginError.next(res.message);
        }
      });
  }

  getAllSociety() {
    return this.http.get(`${this.basePath}${this.blocksPath}`, this.options);
  }
}
