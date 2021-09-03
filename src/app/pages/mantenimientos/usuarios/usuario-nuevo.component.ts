import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-medico',
  templateUrl: './usuario-nuevo.component.html',
  styles: [
  ]
})
export class UsuarioNuevoComponent implements OnInit {

  public medicoForm: FormGroup;
  public usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      email: ['', Validators.required],
      idCarnet: ['', Validators.required],
      vehiculo: ['', Validators.required],
      placa: ['', Validators.required]
    })
  }

  
  guardarUsuario() {
    this.usuarioService.crearUsuario(this.usuarioForm.value).subscribe((resp: any) => {
      Swal.fire('Usuario creado',`${resp.nombre} fue creado correctamente`, 'success');
      this.router.navigateByUrl('/dashboard/usuarios');
    });
  }

}
