import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/auth/user';
import { UserService } from 'src/app/shared/model/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  editForm!: FormGroup;
  user: User = new User(); // Inicializa un nuevo usuario
  userId: number | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID del usuario desde la ruta
    this.loadUser();
  }

  loadUser(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        userData => {
          this.user = userData;
          this.initForm();
        },
        error => {
          console.error('Error al obtener el usuario', error);
        }
      );
    }
  }

  initForm() {
    this.editForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      username: new FormControl({ value: this.user.username, disabled: true }),
      role: new FormControl({ value: this.user.role, disabled: true }),
      emergencyContactName: new FormControl(this.user.emergencyContactName)
    });
  }

  onSubmit() {
    if (this.editForm.valid && this.userId) {
      const updatedUser: User = {
        ...this.user,
        ...this.editForm.value,
        id: this.userId // Asegura que el id esté presente y es un número
      };

      this.userService.updateUser(this.userId, updatedUser).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Perfil actualizado',
            text: 'La información del perfil ha sido actualizada correctamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#4CAF50',
          }).then(() => {
            this.router.navigate(['/profile']); // Redirigir a la página del perfil o donde sea necesario
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar el perfil. Por favor, intenta de nuevo.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#F44336',
          });
        }
      );
    }
  }
}
