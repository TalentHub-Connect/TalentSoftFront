import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService  } from 'src/app/shared/model/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  constructor(private authService: AuthService) {}

  recoverPassword(){
    this.authService.forgotPassword(this.email).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        iconColor: '#AA2535',
        title: 'Correo enviado',
        text: 'Se ha enviado un correo con las instrucciones para recuperar su contraseña',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#AA2535'
      })
    },
    (error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        iconColor: '#AA2535',
        text: 'No se ha podido enviar el correo',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#AA2535'
      })
    })
  }

}
