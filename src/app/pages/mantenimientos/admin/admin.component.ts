import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public admins;

  constructor(
    private medicoService: AdminService,
    private usuarioService: UsuarioService
  ) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.cargarAdmins();
  }

  cargarAdmins() {
    this.cargando = true;
    this.medicoService.cargarAdmins().subscribe(admins => {
      this.cargando = false;
      this.admins = admins;
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

}
