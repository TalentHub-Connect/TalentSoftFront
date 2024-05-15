import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoNService } from 'src/app/shared/model/service/empleado-n.service';

@Component({
  selector: 'app-agregar-novedad',
  templateUrl: './agregar-novedad.component.html',
  styleUrls: ['./agregar-novedad.component.css']
})
export class AgregarNovedadComponent implements OnInit {
  empleadoId!: number;
  novedad = {
    nombre: '',
    descripcion: '',
    cantidad: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoNService: EmpleadoNService
  ) { }

  ngOnInit(): void {
    this.empleadoId = +this.route.snapshot.paramMap.get('id')!;
  }

  agregarNovedad(): void {
    // Lógica para agregar la novedad (por ejemplo, enviar los datos al servidor)
    console.log('Novedad agregada:', this.novedad);

    // Redirigir de vuelta a la lista de empleados después de agregar la novedad
    this.router.navigate(['/lista-nomina']);
  }

  regresar(): void {
    this.router.navigate(['/lista-nomina']);
  }
}
