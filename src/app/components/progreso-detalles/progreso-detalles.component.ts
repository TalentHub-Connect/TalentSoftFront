import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from 'src/app/shared/model/service/empleado.service';
import { Empleado } from 'src/app/shared/model/Entities/empleado';
import { Router } from '@angular/router';

type Stage = 'Notificación' | 'Documentación' | 'Liquidación';

@Component({
  selector: 'app-progreso-detalles',
  templateUrl: './progreso-detalles.component.html',
  styleUrls: ['./progreso-detalles.component.css']
})
export class ProgresoDetallesComponent implements OnInit {
  empleado: Empleado;
  mensajeL: string = '';
  mensajeN: string = '';
  etapasCompletadas: { [key in Stage]: boolean } = {
    'Notificación': false,
    'Documentación': false,
    'Liquidación': false
  };

  constructor(
    private empleadoService: EmpleadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.empleado = new Empleado(0, '', '', '', 0, 0, '', [], '');
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    const fetchedEmpleado = this.empleadoService.getEmpleadoById(id);
    if (fetchedEmpleado) {
      this.empleado = fetchedEmpleado;
      this.initializeEtapasCompletadas();
    } else {
      console.error('Empleado no encontrado con el ID:', id);
    }
  }

  initializeEtapasCompletadas(): void {
    this.etapasCompletadas['Notificación'] = this.empleado.progreso > 25;
    this.etapasCompletadas['Documentación'] = this.empleado.progreso > 50;
    this.etapasCompletadas['Liquidación'] = this.empleado.progreso > 75;
  }

  toggleEtapa(etapa: Stage): void {
    // Alternar el estado de completitud de la etapa
    this.etapasCompletadas[etapa] = !this.etapasCompletadas[etapa];

    if (etapa === 'Notificación') {
      if (this.etapasCompletadas['Notificación']) {
        // Si se marca Notificación como completado, enviar correo
        this.enviarCorreo();
      }
    }

    if (etapa === 'Liquidación') {
      if (this.etapasCompletadas['Liquidación']) {
        // Si se marca Notificación como completado, enviar correo
        this.calcularLiquidacion();
      }
    }

    if (etapa === 'Notificación' && !this.etapasCompletadas['Notificación']) {
      // Si Notificación se marca como incompleto, hacer que las etapas subsiguientes también se marquen como incompletas
      this.etapasCompletadas['Documentación'] = false;
      this.etapasCompletadas['Liquidación'] = false;
      this.empleado.progreso = 25; // Restablecer el progreso a 25%
    }
    if (etapa === 'Documentación' && !this.etapasCompletadas['Documentación']) {
      // Si Notificación se marca como incompleto, hacer que las etapas subsiguientes también se marquen como incompletas
      this.etapasCompletadas['Liquidación'] = false;
      this.empleado.progreso = 50; // Restablecer el progreso a 25%
    }
    else {
      // Si se marca Notificación como completado y las otras etapas estaban previamente completadas, restaurar el progreso
      if (etapa === 'Notificación' && this.etapasCompletadas['Documentación'] && this.etapasCompletadas['Liquidación']) {
        this.empleado.progreso = 100;
      } else {
        // Recalcular el progreso basado en el estado actualizado de las etapas
        this.updateEmpleadoProgress();
      }
    }

    // Actualizar el estado del empleado basado en el último progreso y etapa completada
    const newStatus = this.calculateCurrentStage();
    this.empleado.status = newStatus;
    this.empleadoService.updateStatus(this.empleado.id, newStatus, this.empleado.progreso);
  }


  calculateCurrentStage(): string {
    if (this.etapasCompletadas['Liquidación']) {
      return 'Finalizado';
    } else if (this.etapasCompletadas['Documentación']) {
      return 'Liquidación';
    } else if (this.etapasCompletadas['Notificación']) {
      return 'Documentación';
    }
    return 'Notificación';
  }

  updateEmpleadoProgress(): void {
    const stageOrder = ['Notificación', 'Documentación', 'Liquidación'];
    let newProgress = 0;

    // Determinar el nuevo progreso basado en la etapa más avanzada completada
    if (this.etapasCompletadas['Liquidación']) {
      newProgress = 100;
    } else if (this.etapasCompletadas['Documentación']) {
      newProgress = 75;
    } else if (this.etapasCompletadas['Notificación']) {
      newProgress = 50;
    } else {
      newProgress = 25;  // Ninguna etapa completada significa volver a la primera etapa
    }

    if (newProgress !== this.empleado.progreso) {
      this.empleado.progreso = newProgress;
      this.empleadoService.updateProgress(this.empleado.id, this.empleado.progreso);
    }
  }

  getCurrentStage(): string {
    const stages = ['Notificación', 'Documentación', 'Liquidación', 'Finalizado'];
    let lastCompletedStage = stages.find(stage => this.etapasCompletadas[stage as Stage]);
    return lastCompletedStage || '';
  }

  debeMostrarEtapa(etapa: Stage): boolean {
    const etapaProgress = {
      'Notificación': 25,
      'Documentación': 50,
      'Liquidación': 75
    };

    // Si se marca como incompleto, ocultar todas excepto la primera si ninguna está completa
    if (this.empleado.progreso === 25 && etapa !== 'Notificación') {
      return false;
    }

    return this.empleado.progreso >= etapaProgress[etapa];
  }

  guardarCambios(): void {
    this.router.navigate(['/progreso-salida']);
  }

  enviarCorreo(): void {
    if (this.empleado) {
      this.mensajeN = this.empleadoService.enviarCorreo(this.empleado.id);
    }
  }


  subirDocumento(event: Event): void {
    const element = event.target as HTMLInputElement; // Aseguramos el tipo correcto
    const files = element.files; // Ahora puedes acceder a .files
    if (this.empleado && files && files.length > 0) {
      this.empleadoService.subirDocumento(files, this.empleado.id);
    }
  }

  calcularLiquidacion(): void {
    if (this.empleado) {
      this.mensajeL = this.empleadoService.calcularLiquidacion(this.empleado.id);
    }
  }
}