import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PicoYPlacaServiceService } from '../../../services/pico-yplaca-service.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './pico-y-placa.component.html',
  styles: [
  ]
})
export class PicoYPlacaComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public formulario: FormGroup;
  public picoPlacaForm: FormGroup;
  public restriccionForm: FormGroup;
  public mostrarRestriccionForm: boolean = true;
  public mostrarCalendarioForm: boolean = true;
  public numerosString = "";
  public idFecha;
  public restricciones;
  public fechaInicio;
  public fechaFin;

  constructor(
    private picoPlacaService: PicoYPlacaServiceService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private usuarioService: UsuarioService,
  ) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.picoPlacaForm = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      activo: false
    });

    this.restriccionForm = this.fb.group({
      vehiculo: ['', Validators.required],
      dia: ['', Validators.required],
      digito: ['', Validators.required],
      digitoRestriccion: this.fb.array([]),
    });

    this.obtenerFecha();
    this.obtenerRestricciones();
  }

  obtenerFecha() {
    this.picoPlacaService.obtenerPicoPlaca().subscribe(pico => {
      this.idFecha = pico[0].idPicoYPlaca;
      this.fechaInicio = pico[0].fechaInicio;
      this.fechaFin = pico[0].fechaFin;
      if (!pico[0].activo) {
        this.mostrarRestriccionForm = true;
        this.mostrarCalendarioForm = false;
      }
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

  obtenerRestricciones() {
    this.cargando = true;
    this.picoPlacaService.obtenerRestricciones().subscribe(restricciones => {
      this.restricciones = restricciones;
      this.cargando = false;
    });
  }

  guardarFecha() {
    Swal.fire({
      title: '¿Guardar pico y placa?',
      text: `La fecha que va a establecer es desde el ${this.datePipe.transform(this.picoPlacaForm.value.fechaInicio,"dd-MM-yyyy")} 
      hasta el ${this.datePipe.transform(this.picoPlacaForm.value.fechaFin,"dd-MM-yyyy")}, si acepta esta será la fecha establecida para
      todo el semestre y no se podrá cambiar hasta el ${this.datePipe.transform(this.picoPlacaForm.value.fechaFin,"dd-MM-yyyy")}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Establecer'
    }).then((result) => {
      if (result.value) {
        this.picoPlacaService.crearPicoPlaca(this.picoPlacaForm.value).subscribe(fecha => {
          this.obtenerFecha();
          this.mostrarCalendarioForm = false;
          Swal.fire(
            'Pico y placa establecido',
            `El pico y placa desde el ${this.datePipe.transform(this.picoPlacaForm.value.fechaInicio,"dd-MM-yyyy")} hasta el 
            ${this.datePipe.transform(this.picoPlacaForm.value.fechaFin,"dd-MM-yyyy")} fue creado correctamente.`,
            'success'
          );
        }, (error) => {
          Swal.fire(
            'Error',
            'Hubo un error estableciendo la medida.',
            'error'
          );
        });
      }
    })
    
  }

  tratarDigitos(numeros) {
    for (let i=0; i<numeros.length; i++) {
      let guardar = numeros[i].toString();
      this.numerosString = this.numerosString.concat(guardar);
    }
  }

  guardar() {
    this.anadirDigito();
    this.tratarDigitos(this.digitoRestriccion.value.toString());
    let body = {
      tipoVehiculo:  this.restriccionForm.value.vehiculo,
      dia: this.restriccionForm.value.dia,
      digito: this.numerosString,
      fechaPicoPlaca: {
          idPicoYPlaca: this.idFecha
      }
    }
    this.picoPlacaService.crearRestriccionPicoPlaca(body).subscribe(res => {
      Swal.fire(
        'Restricción establecida',
        `Restricción establecida correctamente.`,
        'success'
      );
      this.restriccionForm.reset();
      this.digitoRestriccion.clear();
      this.obtenerRestricciones();
    }, (error) => {
      Swal.fire(
        'Error',
        'Hubo un error estableciendo la medida.',
        'error'
      );
    });
    this.numerosString = "";
  }


  get digitoRestriccion(): FormArray {
    return this.restriccionForm.get('digitoRestriccion') as FormArray;
  }

  anadirDigito() {
    const digito = this.fb.array([
      new FormControl(this.restriccionForm.value.digito.toString()),
    ]);
    this.digitoRestriccion.push(new FormControl(Number(digito.value.toString())));
  }

  borrar(indice: number) {
    this.digitoRestriccion.removeAt(indice);
  }
}
