import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-admin',
  templateUrl: './nuevo-admin.component.html',
  styles: [
  ]
})
export class NuevoAdminComponent implements OnInit {

  public adminForm: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) { }

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

  guardarAdmin() {
    console.log('Prueba admin guardado');
    console.log('Admin a guardar', this.adminForm.value);
    this.adminService.crearAdmin(this.adminForm.value).subscribe((admin: any) => {
      console.log('Resp', admin);
      Swal.fire(`${admin.nombre} Creado creado correctamente`, 'success');
    });
  }

}
