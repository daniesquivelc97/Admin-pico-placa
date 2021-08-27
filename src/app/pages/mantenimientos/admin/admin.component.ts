import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Medico } from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicos',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public admins;
  private imgSubs: Subscription;

  constructor(
    private medicoService: AdminService,
    private modalImagenService: ModalImagenService,
  ) { }

  ngOnDestroy(): void {
    // this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarAdmins();
  }

  cargarAdmins() {
    this.cargando = true;
    this.medicoService.cargarAdmins().subscribe(admins => {
      this.cargando = false;
      this.admins = admins;
      console.log('Admins', this.admins);
    });
  }

  // buscar(termino: string) {
  //   if (termino.length === 0) {
  //     return this.cargarMedicos();
  //   }
  //   this.busquedasService.buscar('medicos', termino).subscribe(resp => {
  //     this.medicos = resp;
  //   });
  // }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }
}
