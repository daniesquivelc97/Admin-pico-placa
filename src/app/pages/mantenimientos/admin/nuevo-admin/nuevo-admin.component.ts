import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-admin',
  templateUrl: './nuevo-admin.component.html',
  styles: [
  ]
})
export class NuevoAdminComponent implements OnInit {

  public adminForm: FormGroup;

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  guardarAdmin() {console.log('Hola');}

}
