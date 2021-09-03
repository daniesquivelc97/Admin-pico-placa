import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) { }

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
    this.adminService.crearAdmin(this.adminForm.value).subscribe((admin: any) => {
      Swal.fire('Registro exitoso', `${admin.nombre} creado correctamente`, 'success');
      this.router.navigateByUrl('/dashboard/admins');
    });
  }

}
