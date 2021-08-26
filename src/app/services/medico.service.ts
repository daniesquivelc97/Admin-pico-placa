import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;
const base_usuarios = environment.base_usuarios;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  cargarMedicos() {
    const url = `${base_url}/medicos`;
    return this.http.get(url, this.headers).pipe(
      map((resp: {ok: true, medicos: Medico[]}) => resp.medicos)
    );
  }

  cargarAdmins() {
    const url = `${base_url}/all`;
    return this.http.get(url, this.headers);
  }

  obtenerMedicoPorId(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: {ok: boolean, medico: Medico}) => resp.medico)
    );
  }

  crearMedico(medico: {nombre: string, hospital: string}) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);
  }

  crearUsuario(usuario: {nombre: string, apellido: string, tipoIdentificacion: string,
    numeroIdentificacion: Number, email: string, idCarnet: string, vehiculo: string, placa: string}) {
    const url = `${base_usuarios}/crearUsuario`;
    return this.http.post(url, usuario, this.headers);
  }

  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  eliminarMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
