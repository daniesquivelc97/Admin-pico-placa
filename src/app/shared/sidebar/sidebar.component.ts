import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario;

  constructor(public sidebarService: SidebarService, private usuarioService: UsuarioService) {
    this.usuario = usuarioService.nombre;
  }

  ngOnInit(): void {
  }

}
