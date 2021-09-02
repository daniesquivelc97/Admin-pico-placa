import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PicoYPlacaServiceService } from '../../../services/pico-yplaca-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;
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
    private hospitalService: HospitalService,
    private picoPlacaService: PicoYPlacaServiceService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnDestroy(): void {
    // this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    // this.cargarHospitales();
    // this.imgSubs = this.modalImagenService.nuevaImagen
    // .pipe(delay(100))
    // .subscribe(img => this.cargarHospitales());

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

    this.crearFormulario();
    this.obtenerFecha();
    this.obtenerRestricciones();
  }

  obtenerFecha() {
    this.picoPlacaService.obtenerPicoPlaca().subscribe(pico => {
      console.log('pico', pico);
      console.log('Pico y placa', pico[0].activo);
      this.idFecha = pico[0].idPicoYPlaca;
      this.fechaInicio = pico[0].fechaInicio;
      this.fechaFin = pico[0].fechaFin;
      console.log('ID', this.idFecha);
      if (!pico[0].activo) {
        console.log('HOla');
        this.mostrarRestriccionForm = true;
        this.mostrarCalendarioForm = false;
      }
    });
  }

  obtenerRestricciones() {
    this.cargando = true;
    this.picoPlacaService.obtenerRestricciones().subscribe(restricciones => {
      console.log('Restricciones', restricciones);
      this.restricciones = restricciones;
      this.cargando = false;
    });
  }

  guardarFecha() {
    console.log('Fechas a guardar', this.picoPlacaForm.value);
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
          console.log('Fecha', fecha);
          this.obtenerFecha();
          this.mostrarCalendarioForm = false;
          Swal.fire(
            'Pico y placa establecido',
            `El pico y placa desde el ${this.datePipe.transform(this.picoPlacaForm.value.fechaInicio,"dd-MM-yyyy")} hasta el 
            ${this.datePipe.transform(this.picoPlacaForm.value.fechaFin,"dd-MM-yyyy")} fue creado correctamente.`,
            'success'
          );
        }, (error) => {
          console.log('Error', error);
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
    console.log('Final', this.numerosString);
  }

  guardar() {
    this.anadirDigito();
    console.log('Valor res', this.restriccionForm.value);
    console.log('Digitos a guardar', this.digitoRestriccion.value.toString());
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
      console.log('Respuesta restriccion', res);
      Swal.fire(
        'Restricción establecida',
        `Restricción establecida correctamente.`,
        'success'
      );
      this.restriccionForm.reset();
      this.digitoRestriccion.clear();
      this.obtenerRestricciones();
    }, (error) => {
      console.log('Error', error);
      Swal.fire(
        'Error',
        'Hubo un error estableciendo la medida.',
        'error'
      );
    });
    
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      vehiculo: ['', Validators.required],
      experienciaLaboral: this.fb.array([])
    });
  }

  get digitoRestriccion(): FormArray {
    return this.restriccionForm.get('digitoRestriccion') as FormArray;
  }

  get experienciaLaboral(): FormArray {
    return this.formulario.get('experienciaLaboral') as FormArray;
  }

  anadirDigito() {
    console.log('a guardar', this.restriccionForm.value.digito);
    const digito = this.fb.array([
      new FormControl(this.restriccionForm.value.digito.toString()),
    ]);
    this.digitoRestriccion.push(new FormControl(Number(digito.value.toString())));
  }

  // confirmar() {
  //   this.anadirDigito();
  //   this.borrar(2);
  //   this.flag = true;
  //   console.log('otro 2', this.digitoRestriccion.value);
  //   console.log('flag', this.flag);
  // }

  anadirExperienciaLaboral() {
    const trabajo = this.fb.group({
      empresa: new FormControl(''),
      puesto: new FormControl(''),
      descripcion: new FormControl('')
    });
  
    this.experienciaLaboral.push(trabajo);
    console.log('empleo', this.formulario.getRawValue());
  }

  borrarTrabajo(indice: number) {
    this.experienciaLaboral.removeAt(indice);
  }

  borrar(indice: number) {
    this.digitoRestriccion.removeAt(indice);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }
    this.busquedasService.buscar('hospitales', termino).subscribe(resp => {
      this.hospitales = resp;
    });
  }

  cargarHospitales() {
    this.cargando = false;
    this.hospitalService.cargarHospitales().subscribe(hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe(resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success');
    })
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.eliminarHospital(hospital._id).subscribe(resp => {
      this.cargarHospitales();
      Swal.fire('Eliminado', hospital.nombre, 'success');
    })
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })
    
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
      })
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }


}
