import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { New } from 'src/app/shared/model/Entities/new';
import { EmpleadoNService } from 'src/app/shared/model/service/empleado-n.service';

@Component({
  selector: 'app-agregar-novedad',
  templateUrl: './agregar-novedad.component.html',
  styleUrls: ['./agregar-novedad.component.css']
})
export class AgregarNovedadComponent implements OnInit {
  empleadoId!: number;
  novedad: New = {
    name: '',
    description: '',
    moneybenefit: 0
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
    this.empleadoNService.agregarNovedad(this.empleadoId, this.novedad).subscribe(() => {
      console.log('Novedad agregada:', this.novedad);
      this.router.navigate(['/lista-nomina']);
    });
  }

  regresar(): void {
    this.router.navigate(['/lista-nomina']);
  }
}