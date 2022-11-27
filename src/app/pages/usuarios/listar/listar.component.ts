import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GestionUsuarios } from '../../../modelos/gestion-usuarios.model';
import { GestionUsuariosService } from '../../../servicios/gestion-usuarios.service';
@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  usuarios : GestionUsuarios[];
  nombresColumnas: string[] = ['seudonimo','email'];
  constructor(private miServicioUsuarios: GestionUsuariosService,
              private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar():void{
    this.miServicioUsuarios.listar().
      subscribe(data => {
        this.usuarios=data;
      });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/usuarios/crear"])
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/usuarios/actualizar/"+id])
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Usuario',
      text: "Está seguro que quiere eliminar el usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioUsuarios.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
}
