import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { GestionarCuentaComponent } from './components/gestionar-cuenta/gestionar-cuenta.component';
import { CambiarMPComponent } from './components/cambiar-mp/cambiar-mp.component';
import { CambiarPlanComponent } from './components/cambiar-plan/cambiar-plan.component';
import { RegistrarHojaComponent } from './components/registrar-hoja/registrar-hoja.component';
import { ListaNominaComponent } from './components/lista-nomina/lista-nomina.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { CuponComponent } from './components/cupon/cupon.component';
import { TarjetaVisaComponent } from './components/tarjeta-visa/tarjeta-visa.component';
import { CommonModule } from '@angular/common';
import { CausalesDespidoComponent } from './components/causales-despido/causales-despido.component';
import { ProgresoSalidaComponent } from './components/progreso-salida/progreso-salida.component';
import { EditarEmpresaComponent } from './components/editar-empresa/editar-empresa.component';
import { SlidebarComponent } from './components/slidebar/slidebar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AgregarAspirantesComponent } from './components/agregar-aspirantes/agregar-aspirantes.component';
import { MaterialModule } from './material.module';
import { DetallesAspiranteComponent } from './components/detalles-aspirante/detalles-aspirante.component';
import { EditarAspiranteComponent } from './components/editar-aspirante/editar-aspirante.component';
import { WorkingComponent } from './components/working/working.component';
import { ProgresoDetallesComponent } from './components/progreso-detalles/progreso-detalles.component';
import { RegistrarCausalComponent } from './components/registrar-causal/registrar-causal.component';
import { EditarCausalComponent } from './components/editar-causal/editar-causal.component';
import { RegistrarDespidoComponent } from './components/registrar-despido/registrar-despido.component';
import { AgregarConvocatoriaComponent } from './components/agregar-convocatoria/agregar-convocatoria.component';
import { DetallesConvocatoriaComponent } from './components/detalles-convocatoria/detalles-convocatoria.component';
import { EditarConvocatoriaComponent } from './components/editar-convocatoria/editar-convocatoria.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { DateFormatPipe } from 'src/app/date-format.pipe';
import { ConvocatoriaComponent } from './components/convocatoria/convocatoria.component';
import { AspirantesComponent } from './components/aspirantes/aspirantes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    UsersComponent,
    PaymentsComponent,
    GestionarCuentaComponent,
    CambiarMPComponent,
    CambiarPlanComponent,
    RegistrarHojaComponent,
    ListaNominaComponent,
    CrearUsuarioComponent,
    CuponComponent,
    TarjetaVisaComponent,
    CausalesDespidoComponent,
    ProgresoSalidaComponent,
    EditarEmpresaComponent,
    SlidebarComponent,
    AgregarAspirantesComponent,
    DetallesAspiranteComponent,
    EditarAspiranteComponent,
    ProgresoDetallesComponent,
    RegistrarCausalComponent,
    EditarCausalComponent,
    RegistrarDespidoComponent,
    AgregarConvocatoriaComponent,
    DetallesConvocatoriaComponent,
    EditarConvocatoriaComponent,
    WorkingComponent,
    EditarPerfilComponent,
    ConvocatoriaComponent,
    DateFormatPipe,
    AspirantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxPaginationModule,
  ],
  providers: [
    provideAnimationsAsync(),
    DateFormatPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
