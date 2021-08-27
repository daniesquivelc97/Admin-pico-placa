import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

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
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
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
