import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu() {
    this.menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            {titulo: 'Inicio', url: '/'},
          ]
        },
        {
          titulo: 'Opciones',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            {titulo: 'Usuarios', url: 'usuarios'},
            {titulo: 'Pico y placa', url: 'picoyplaca'},
            {titulo: 'Administradores', url: 'admins'},
          ]
        }
      ];
  }
}
