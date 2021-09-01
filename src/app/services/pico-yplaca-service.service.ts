import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const base_pico_placa = environment.base_pico_placa;

@Injectable({
  providedIn: 'root'
})
export class PicoYPlacaServiceService {

  constructor( private http: HttpClient ) { }

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

  obtenerPicoPlaca() {
    const url = `${base_pico_placa}/all`;
    return this.http.get(url, this.headers);
  }

  crearPicoPlaca(picoPlaca: {fechaInico: String, fechaFin: String, activo: boolean}) {
    const url = `${base_pico_placa}/crear`;
    return this.http.post(url, picoPlaca, this.headers);
  }
}
