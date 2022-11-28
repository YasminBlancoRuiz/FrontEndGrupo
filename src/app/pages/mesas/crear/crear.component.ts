import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GestionMesas } from '../../../modelos/gestion-mesas.model';
import { GestionMesasService } from '../../../servicios/gestion-mesas.service';
@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  modoCreacion: boolean = true;
  id_mesa: string = "";
  intentoEnvio: boolean = false;
  laMesa: GestionMesas = {
    Numero_mesa: "",
    Cedulas_inscritas: ""
}
constructor(private miServicioMesas: GestionMesasService,
  private rutaActiva: ActivatedRoute,
  private router: Router) { }

ngOnInit(): void {
  if (this.rutaActiva.snapshot.params.id_mesa) {
    this.modoCreacion = false;
    this.id_mesa = this.rutaActiva.snapshot.params.id_mesa;
    this.getMesa(this.id_mesa)
    } else {
    this.modoCreacion = true;
    }
  }
getMesa(id: string) {
  this.miServicioMesas.getMesa(id).
    subscribe(data => {
      this.laMesa = data;
  });
}
agregar(): void {
  if (this.validarDatosCompletos()) {
    this.intentoEnvio = true;
    this.miServicioMesas.crear(this.laMesa).
      subscribe(data => {
        Swal.fire(
        'Creado',
        'La mesa ha sido creado correctamente',
        'success'
      )
      this.router.navigate(["pages/mesas/listar"]);
    });
  }
}
editar(): void {
  if (this.validarDatosCompletos()) {
    this.miServicioMesas.editar(this.laMesa._id,
    this.laMesa).
      subscribe(data => {
      Swal.fire(
      'Actualizado',
      'La mesa ha sido actualizada correctamente',
      'success'
      )
this.router.navigate(["pages/mesas/listar"]);
});
}
}
validarDatosCompletos():boolean{
  this.intentoEnvio=true;
  if(this.laMesa.Numero_mesa=="" ||
    this.laMesa.Cedulas_inscritas=="" ){
    
      return false;
  }else{
    return true;
  }
  }
}