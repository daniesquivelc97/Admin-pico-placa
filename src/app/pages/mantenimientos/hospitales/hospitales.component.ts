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
  public siguienteForm: boolean = false;
  flag: boolean = false;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
    private fb: FormBuilder,
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
      inicio: ['', Validators.required],
      fin: ['', Validators.required]
    });

    this.restriccionForm = this.fb.group({
      vehiculo: ['', Validators.required],
      dia: ['', Validators.required],
      digito: ['', Validators.required],
      digito2: ['', Validators.required],
      digitoRestriccion: this.fb.array([]),
    })

    this.crearFormulario();
  }

  guardar() {
    this.anadirDigito();
    console.log('Valor', this.picoPlacaForm.value);
    console.log('Valor res', this.restriccionForm.value);
    this.siguienteForm = true;
    this.restriccionForm.reset();
    this.digitoRestriccion.clear();
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
    const digito = this.fb.group({
      digito: this.restriccionForm.value.digito,
    });
    console.log('digito', digito);
  
    this.digitoRestriccion.push(digito);
    console.log('otro', this.digitoRestriccion.value);

    console.log('tamaño', this.digitoRestriccion.length);
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
