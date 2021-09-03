import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios = 0;
  public usuarios;
  public usuariosTemp;
  public desde = 0;
  public cargando = true;

  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios().subscribe(resp => {
      this.usuarios = resp;
      this.usuariosTemp = resp;
      this.cargando = false;
    }, (error) => {
      if (error.status === 403) {
        Swal.fire(
          'Error',
          'Sesión expirada por inactividad.',
          'error'
        ).then((result) => {
          if (result.value || result.isDismissed) {
            this.usuarioService.logOut();
          }
        });
      }
    });
  }

  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  eliminarUsuario(usuario) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de eliminar a ${usuario.nombre}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario).subscribe(resp => {
          this.cargarUsuarios();
          Swal.fire(
            'Usuario eliminado',
            `${usuario.nombre} fue eliminado correctamente.`,
            'success'
          );
        });
      }
    });
  }

}
