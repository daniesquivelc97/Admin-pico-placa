import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): {} {
    return {
      headers: {
        'Authorization': this.token,
      }
    };
  }

  cargarAdmins() {
    const url = `${base_url}/all`;
    return this.http.get(url, this.headers);
  }

  crearAdmin(admin: {nombre: string, apellido: string, tipoIdentificacion: string,
    numeroIdentificacion: Number, email: string, password: string}) {
    const url = `${base_url}/crear`;
    return this.http.post(url, admin, this.headers);
  }

}
