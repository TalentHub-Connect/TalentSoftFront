import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoNService } from 'src/app/shared/model/service/empleado-n.service';
import { EmpleadoN } from 'src/app/shared/model/Entities/empleadoN';

@Component({
  selector: 'app-ver-empleado',
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.css']
})
export class VerEmpleadoComponent implements OnInit {
  empleado!: EmpleadoN;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoNService: EmpleadoNService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.empleadoNService.getEmpleadoNById(id).subscribe(empleado => {
      this.empleado = empleado;
    });
  }

  regresar() {
    this.router.navigate(['/lista-nomina']);
  }
}