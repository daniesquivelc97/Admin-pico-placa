import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PicoYPlacaComponent } from './mantenimientos/pico-y-placa/pico-y-placa.component';
import { AdminComponent } from './mantenimientos/admin/admin.component';
import { UsuarioNuevoComponent } from './mantenimientos/usuarios/usuario-nuevo.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { Routes, RouterModule } from '@angular/router';
import { NuevoAdminComponent } from './mantenimientos/admin/nuevo-admin/nuevo-admin.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica #1' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },

  // Mantenimientos
  { path: 'picoyplaca', component: PicoYPlacaComponent, data: { titulo: 'Pico y placa UCO' } },
  { path: 'admins', component: AdminComponent, data: { titulo: 'Administradores del parqueadero' } },
  { path: 'usuario/:id', component: UsuarioNuevoComponent, data: { titulo: 'Crear usuarios' } },
  { path: 'admin/:id', component: NuevoAdminComponent, data: { titulo: 'Crear administradores' } },

  // Rutas de Admin
  { path: 'usuarios', 
  // canActivate: [AdminGuard], 
  component: UsuariosComponent, data: { titulo: 'Usuarios del parqueadero' } },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
