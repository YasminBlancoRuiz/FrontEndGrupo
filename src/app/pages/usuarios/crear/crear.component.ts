import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GestionUsuarios  } from '../../../modelos/gestion-usuarios.model';
import { GestionUsuariosService } from '../../../servicios/gestion-usuarios.service';
@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  modoCreacion: boolean = true;
  id_usuario: string = "";
  intentoEnvio: boolean = false;
  elUsuario: GestionUsuarios = {
    seudonimo: "",
    email: "",
    contrasena: ""
}
constructor(private miServicioUsuarios: GestionUsuariosService,
  private rutaActiva: ActivatedRoute,
  private router: Router) { }

ngOnInit(): void {
  if (this.rutaActiva.snapshot.params.id_usuario) {
    this.modoCreacion = false;
    this.id_usuario = this.rutaActiva.snapshot.params.id_usuario;
    this.getUsuario(this.id_usuario)
    } else {
    this.modoCreacion = true;
    }
  }
getUsuario(id: string) {
  this.miServicioUsuarios.getUsuarios(id).
    subscribe(data => {
      this.elUsuario = data;
  });
}
agregar(): void {
  if (this.validarDatosCompletos()) {
    this.intentoEnvio = true;
    this.miServicioUsuarios.crear(this.elUsuario).
      subscribe(data => {
        Swal.fire(
        'Creado',
        'El usuario ha sido creado correctamente',
        'success'
      )
      this.router.navigate(["pages/usuarios/listar"]);
    });
  }
}
editar(): void {
  if (this.validarDatosCompletos()) {
    this.miServicioUsuarios.editar(this.elUsuario._id,
    this.elUsuario).
      subscribe(data => {
      Swal.fire(
      'Actualizado',
      'El usuario ha sido actualizado correctamente',
      'success'
      )
this.router.navigate(["pages/usuarios/listar"]);
});
}
}
validarDatosCompletos():boolean{
  this.intentoEnvio=true;
  if(this.elUsuario.seudonimo=="" ||
    this.elUsuario.email=="" ||
    this.elUsuario.contrasena==""){
    
      return false;
  }else{
    return true;
  }
  }
}