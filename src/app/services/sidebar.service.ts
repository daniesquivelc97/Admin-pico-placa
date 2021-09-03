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

  // cargarMenu() {
  //   this.menu = [
  //       {
  //         titulo: 'Dashboard',
  //         icono: 'mdi mdi-gauge',
  //         submenu: [
  //           {titulo: 'Main', url: '/'},
  //           {titulo: 'Graficas', url: 'grafica1'},
  //           {titulo: 'ProgressBar', url: 'progress'},
  //           {titulo: 'Promesas', url: 'promesas'},
  //           {titulo: 'Rxjs', url: 'rxjs'},
  //         ]
  //       },
  //       {
  //         titulo: 'Mantenimiento',
  //         icono: 'mdi mdi-folder-lock-open',
  //         submenu: [
  //           {titulo: 'Usuarios', url: 'usuarios'},
  //           {titulo: 'Hospitales', url: 'hospitales'},
  //           {titulo: 'Medicos', url: 'medicos'},
  //         ]
  //       }
  //     ];
  // }

  // menu: any = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Main', url: '/'},
  //       {titulo: 'Graficas', url: 'grafica1'},
  //       {titulo: 'ProgressBar', url: 'progress'},
  //       {titulo: 'Promesas', url: 'promesas'},
  //       {titulo: 'Rxjs', url: 'rxjs'},
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: 'usuarios'},
  //       {titulo: 'Hospitales', url: 'hospitales'},
  //       {titulo: 'Medicos', url: 'medicos'},
  //     ]
  //   }
  // ]

}
