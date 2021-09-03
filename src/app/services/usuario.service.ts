import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

declare const gapi: any;
const base_url = environment.base_url;
const base_usuarios = environment.base_usuarios;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone, public jwtHelper: JwtHelperService) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get nombre(): string {
    return localStorage.getItem('nombres') || '';
  }

  get headers(): {} {
    return {
      headers: {
        'Authorization': this.token,
      }
    };
  }

  googleInit(): Promise<void> {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '766264690680-m9aonr6a1j407o74eehgole4961idud4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  guardarLocalStorage(token: string, nombres: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('nombres', nombres);
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('nombres');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validatAutenticacion(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.nombres);
      })
    );
  }

  obtenerUsuarios() {
    const url = `${base_usuarios}/all`;
    return this.http.get(url, this.headers);
  }

  crearUsuario(usuario: {nombre: string, apellido: string, tipoIdentificacion: string,
    numeroIdentificacion: Number, email: string, idCarnet: string, vehiculo: string, placa: string}) {
    const url = `${base_usuarios}/crearUsuario`;
    return this.http.post(url, usuario, this.headers);
  }

  eliminarUsuario(usuario: any) {
    const url = `${base_usuarios}/${usuario.numeroIdentificacion}`;
    return this.http.delete(url, this.headers);
  }

}
