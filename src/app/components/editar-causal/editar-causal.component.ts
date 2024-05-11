import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reason } from 'src/app/shared/model/Entities/reason';
import { ReasonService } from 'src/app/shared/model/service/reason.service';
import { AuthService } from 'src/app/shared/model/service/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-editar-causal',
  templateUrl: './editar-causal.component.html',
  styleUrls: ['./editar-causal.component.css']
})
export class EditarCausalComponent implements OnInit {
  causal: Reason = new Reason(0, '', '', ''); // Inicializar con valores vacíos
  usuarioActual: string = 'Admin'; // Inicializar con el usuario actual

  constructor(private route: ActivatedRoute, private router: Router, private causalService: ReasonService, private authService: AuthService) { }

  ngOnInit(): void {
    //this.usuarioActual = this.authService.getUsuarioActual(); // Obtener el usuario actual

    const idCausal = Number(this.route.snapshot.paramMap.get('id'));
    this.causalService.obtenerReasonPorId(idCausal).subscribe({
      next: (data) => {
        this.causal = data;
      },
      error: (err) => {
        console.error(`No se encontró ninguna causal con el ID ${idCausal}`);
        this.router.navigate(['/lista-causales']); // Asegúrate de tener esta ruta configurada
      }
    });
  }

  guardarCambios(): void {
    this.causal.createForUser = this.usuarioActual; // Actualiza el creador con el usuario actual
    this.causalService.editarReason(this.causal).subscribe({
      next: (data) => {
        console.log('Causal actualizada correctamente:', data);
        this.router.navigate(['/causales-despido']); // Asegúrate de tener esta ruta configurada
      },
      error: (err) => {
        console.error('Error al actualizar la causal:', err);
      }
    });
  }
}
