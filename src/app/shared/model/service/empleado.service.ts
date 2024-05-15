import { Injectable } from '@angular/core';
import { Empleado } from '../Entities/empleado';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl = `${environment.NominaURL}/employee`;

  getEmpleadosN(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/getEmployees`);
  }

  getEmpleadoNById(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  deleteEmpleadoNById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteEmployee/${id}`);
  }

  private empleados: Empleado[] = [
    new Empleado(1, 'Juan Pérez', 'Notificación', 'Reducción de personal', 25, 25000, '', [], 'Ana Sánchez'),
    new Empleado(2, 'Ana Gómez', 'Documentación', 'Desempeño insuficiente', 50, 50000, '', [], 'Luis Rodríguez'),
    new Empleado(3, 'Luis Ramos', 'Liquidación', 'Cierre de departamento', 75, 75000, '', [], 'Carmen Ortiz'),
    new Empleado(4, 'Sofía Castillo', 'Finalizado', 'Mutuo acuerdo', 100, 100000, '', [], 'Juan Martín')
  ];

  constructor(private http: HttpClient) { }

  getEmpleados(): Empleado[] {
    return this.empleados;
  }

  filterEmpleados(nombre: string, etapa: string, causal: string): Empleado[] {
    return this.empleados.filter(empleado => {
      return (nombre ? empleado.nombre.toLowerCase().includes(nombre.toLowerCase()) : true)
        && (etapa ? empleado.status === etapa : true)
        && (causal ? empleado.causal === causal : true);
    });
  }

  getEmpleadoById(id: number): Empleado | undefined {
    return this.empleados.find(empleado => empleado.id === id);
  }

  updateRazonDespido(id: number, razon: string): void {
    const empleado = this.getEmpleadoById(id);
    if (empleado) {
      empleado.razonDespido = razon;
    }
  }

  updateDocumentos(id: number, documentos: any[]): void {
    const empleado = this.getEmpleadoById(id);
    if (empleado) {
      empleado.documentos = documentos;
    }
  }

  updateStatus(id: number, status: string, progreso: number): void {
    const empleado = this.getEmpleadoById(id);
    if (empleado) {
      empleado.status = status;
      empleado.progreso = progreso; // Actualizar el progreso junto con el estado
    }
  }

  updateProgress(id: number, progreso: number): void {
    const empleado = this.getEmpleadoById(id);
    if (empleado) {
      empleado.progreso = progreso;
    }
  }

  getProgressWidth(status: string): string {
    switch (status) {
      case 'Notificación':
        return '25%';
      case 'Documentación':
        return '50%';
      case 'Liquidación':
        return '75%';
      case 'Finalizado':
        return '100%';
      default:
        return '0%';
    }
  }

  getProgressColor(status: string): string {
    switch (status) {
      case 'Notificación':
        return 'bg-notification';
      case 'Documentación':
        return 'bg-documentacion';
      case 'Liquidación':
        return 'bg-liquidacion';
      case 'Finalizado':
        return 'bg-finalizado';
      default:
        return '';
    }
  }

  getProgressValue(status: string): string {
    return this.getProgressWidth(status); // Assuming same logic as width for simplicity
  }

  puedeEditarEtapa(empleado: Empleado | undefined, etapa: string): boolean {
    if (!empleado) return false;
    const etapas = ['Notificación', 'Documentación', 'Liquidación', 'Finalizado'];
    const currentIndex = etapas.indexOf(empleado.status);
    const etapaIndex = etapas.indexOf(etapa);
    return etapaIndex === currentIndex + 1 || (etapa === empleado.status);
  }

  debeMostrarEtapa(empleado: Empleado | undefined, etapa: string): boolean {
    if (!empleado) return false;
    const etapasOrdenadas = ['Notificación', 'Documentación', 'Liquidación', 'Finalizado'];
    let indexEtapaActual = etapasOrdenadas.indexOf(empleado.status);
    let index = etapasOrdenadas.indexOf(etapa);
    return index <= indexEtapaActual + 1; // Show only the current stage and the immediate next stage
  }

  deleteEmpleadoById(id: number): void {
    this.empleados = this.empleados.filter(empleado => empleado.id !== id);
  }

  addEmpleado(empleado: Empleado): void {
    this.empleados.push(empleado);
  }

  enviarCorreo(id: number): string {
    const empleado = this.getEmpleadoById(id);
    if (empleado) {
      return `Correo enviado a ${empleado.nombre} con motivo: ${empleado.razonDespido}`;
    }
    return 'Error: Empleado no encontrado';
  }

  subirDocumento(files: FileList, empleadoId: number): void {
    const empleado = this.getEmpleadoById(empleadoId);
    if (empleado && files.length > 0) {
      if (!empleado.documentos) {
        empleado.documentos = [];
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        empleado.documentos.push({ nombre: file.name, url: 'http://localhost/fake-url/' + file.name });
      }
    }
  }


  calcularLiquidacion(id: number): string {
    const empleado = this.getEmpleadoById(id);
    if (empleado) {
      let liquidacion = empleado.salario * 33.5; // Cálculo simplificado de la liquidación
      return `Liquidación calculada para ${empleado.nombre}: $${liquidacion}`;
    }
    return 'Error: Empleado no encontrado';
  }

}
