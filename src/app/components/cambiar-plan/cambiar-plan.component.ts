import { Component } from '@angular/core';
import { PlanServiceService } from 'src/app/shared/model/service/plan-service.service';

@Component({
  selector: 'app-cambiar-plan',
  templateUrl: './cambiar-plan.component.html',
  styleUrls: ['./cambiar-plan.component.css']
})
export class CambiarPlanComponent {
  planes: any[] = [];

  constructor(private planService: PlanServiceService) { }

  ngOnInit(): void {
    /* this.planService.getPlanes().subscribe(data =>{
       this.planes = data;
   });*/

    //Esto era para pruebas mías, pero cuando vayas a hacer lo del back borra esto y descomenta lo de arriba
    this.planes = [
      { name: 'Plan 1', price: '$30.00', description: 'Perfecto para empresas en fase de exploración. Accede a nuestra plataforma durante 3 meses para implementar y evaluar si TalentSoft se ajusta a tus necesidades.', feature1: 'Característica 1', feature2: 'Característica 2', feature3: 'Característica 3' },
      { name: 'Plan 2', price: '$60.00', description: 'Perfecto para empresas en fase de exploración. Accede a nuestra plataforma durante 3 meses para implementar y evaluar si TalentSoft se ajusta a tus necesidades.', feature1: 'Característica 1', feature2: 'Característica 2', feature3: 'Característica 3' },
      { name: 'Plan 3', price: '$30.00', description: 'Perfecto para empresas en fase de exploración. Accede a nuestra plataforma durante 3 meses para implementar y evaluar si TalentSoft se ajusta a tus necesidades.', feature1: 'Característica 1', feature2: 'Característica 2', feature3: 'Característica 3' },
      { name: 'Plan 4', price: '$60.00', description: 'Perfecto para empresas en fase de exploración. Accede a nuestra plataforma durante 3 meses para implementar y evaluar si TalentSoft se ajusta a tus necesidades.', feature1: 'Característica 1', feature2: 'Característica 2', feature3: 'Característica 3' },
      { name: 'Plan 5', price: '$90.00', description: 'Perfecto para empresas en fase de exploración. Accede a nuestra plataforma durante 3 meses para implementar y evaluar si TalentSoft se ajusta a tus necesidades.', feature1: 'Característica 1', feature2: 'Característica 2', feature3: 'Característica 3' }
    ];
  }
  chunkArray(arr: any[], chunkSize: number): any[] {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }
}
