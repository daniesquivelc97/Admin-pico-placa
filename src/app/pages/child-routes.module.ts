import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PicoYPlacaComponent } from './mantenimientos/pico-y-placa/pico-y-placa.component';
import { AdminComponent } from './mantenimientos/admin/admin.component';
import { UsuarioNuevoComponent } from './mantenimientos/usuarios/usuario-nuevo.component';
import { AdminGuard } from '../guards/admin.guard';
import { Routes, RouterModule } from '@angular/router';
import { NuevoAdminComponent } from './mantenimientos/admin/nuevo-admin/nuevo-admin.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },

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
