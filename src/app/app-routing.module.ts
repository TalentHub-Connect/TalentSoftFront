import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { CambiarPlanComponent } from './components/cambiar-plan/cambiar-plan.component';
import { CambiarMPComponent } from './components/cambiar-mp/cambiar-mp.component';
import { RegistrarHojaComponent } from './components/registrar-hoja/registrar-hoja.component';
import { ListaNominaComponent } from './components/lista-nomina/lista-nomina.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { CuponComponent } from './components/cupon/cupon.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { TarjetaVisaComponent } from './components/tarjeta-visa/tarjeta-visa.component';
import { CausalesDespidoComponent } from './components/causales-despido/causales-despido.component';
import { ProgresoSalidaComponent } from './components/progreso-salida/progreso-salida.component';
import { EditarEmpresaComponent } from './components/editar-empresa/editar-empresa.component';
import { SlidebarComponent } from './components/slidebar/slidebar.component';
import { AspirantesComponent } from './components/aspirantes/aspirantes.component';
import { AgregarAspirantesComponent } from './components/agregar-aspirantes/agregar-aspirantes.component';
import { ProgresoDetallesComponent } from './components/progreso-detalles/progreso-detalles.component';
import { RegistrarCausalComponent } from './components/registrar-causal/registrar-causal.component';
import { EditarCausalComponent } from './components/editar-causal/editar-causal.component';
import { RegistrarDespidoComponent } from './components/registrar-despido/registrar-despido.component';
import { ConvocatoriaComponent } from './components/convocatoria/convocatoria.component';
import { AgregarConvocatoriaComponent } from './components/agregar-convocatoria/agregar-convocatoria.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { WorkingComponent } from './components/working/working.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'working', component: WorkingComponent },
  {
    path: '', // Utiliza una ruta vacía como prefijo para las rutas con Navbar
    component: SlidebarComponent, // Este componente actúa como un layout
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            'ADMIN',
            'SST',
            'NOMINA_ELECTRONICA',
            'DESPIDO',
            'RECLUTAMIENTO',
            'BI',
          ],
        },
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'payment-info',
        component: PaymentInfoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'registrar-hoja',
        component: RegistrarHojaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'RECLUTAMIENTO'] },
      },
      {
        path: 'lista-nomina',
        component: ListaNominaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'NOMINA_ELECTRONICA'] },
      },
      {
        path: 'crear-usuario',
        component: CrearUsuarioComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'cambiar-plan',
        component: CambiarPlanComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'visa',
        component: TarjetaVisaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'causales-despido',
        component: CausalesDespidoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'DESPIDO'] },
      },
      {
        path: 'progreso-salida',
        component: ProgresoSalidaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'DESPIDO'] },
      },
      {
        path: 'editar-empresa',
        component: EditarEmpresaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'aspirante',
        component: AspirantesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'RECLUTAMIENTO'] },
      },
      {
        path: 'progreso-detalles/:id',
        component: ProgresoDetallesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'DESPIDO'] },
      },
      {
        path: 'registrar-causal',
        component: RegistrarCausalComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'DESPIDO'] },
      },
      {
        path: 'editar-causal/:id',
        component: EditarCausalComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'DESPIDO'] },
      },
      {
        path: 'registrar-despido',
        component: RegistrarDespidoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'DESPIDO'] },
      },
      {
        path: 'agregar-aspirante',
        component: AgregarAspirantesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'RECLUTAMIENTO'] },
      },
      {
        path: 'convocatoria',
        component: ConvocatoriaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'RECLUTAMIENTO'] },
      },
      {
        path: 'agregar-convocatoria',
        component: AgregarConvocatoriaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'RECLUTAMIENTO'] },
      },
      {
        path: 'cambiar-mp',
        component: CambiarMPComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'cupon',
        component: CuponComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'editar-perfil',
        component: EditarPerfilComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [
            'ADMIN',
            'SST',
            'NOMINA_ELECTRONICA',
            'DESPIDO',
            'RECLUTAMIENTO',
            'BI',
          ],
        },
      },

      // Ruta hija
      // Puedes añadir más rutas hijas que requieran Navbar aquí
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
