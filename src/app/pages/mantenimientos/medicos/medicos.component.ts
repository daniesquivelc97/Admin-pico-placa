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
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public admins;
  private imgSubs: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarAdmins();
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe(img => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = false;
    this.medicoService.cargarMedicos().subscribe(medicos => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  cargarAdmins() {
    this.cargando = false;
    this.medicoService.cargarAdmins().subscribe(admins => {
      this.cargando = false;
      this.admins = admins;
      console.log('Admins', this.admins);
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }
    this.busquedasService.buscar('medicos', termino).subscribe(resp => {
      this.medicos = resp;
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Eliminar médico?',
      text: `Está a punto de eliminar a ${medico.nombre}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.medicoService.eliminarMedico(medico._id).subscribe(resp => {
          this.cargarMedicos();
          Swal.fire(
            'Médico eliminado',
            `${medico.nombre} fue eliminado correctamente.`,
            'success'
          );
        });
      }
    });
  }
}
