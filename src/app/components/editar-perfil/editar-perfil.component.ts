import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/auth/user';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  editForm!: FormGroup;
  user: User = new User(); // Simula obtener un usuario, reemplazar con tu lógica de servicio

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.editForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      username: new FormControl({ value: this.user.username, disabled: true }),
      password: new FormControl({ value: '', disabled: true }),
      role: new FormControl({ value: this.user.role, disabled: true }),
      emergencyContactName: new FormControl(this.user.emergencyContactName)
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      console.log('Form Data:', this.editForm.value);
      // Agregar código para procesar los datos del formulario y actualizar el usuario
    }
  }
}
