import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GestionUsuarios } from '../modelos/gestion-usuarios.model';
import { Usuario } from '../modelos/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  constructor(private http: HttpClient) { }
  
  listar(): Observable<GestionUsuarios[]> {
    console.log("Test");
      return this.http.get<GestionUsuarios[]>(`${environment.url_gateway}/usuarios`);  

  }
  eliminar(id:string){
    return this.http.delete<GestionUsuarios>(`${environment.url_gateway}/usuarios/${id}`,
);
  }
  getUsuarios(id: string): Observable<GestionUsuarios> {
    return this.http.get<GestionUsuarios>(`${environment.url_gateway}/usuarios/${id}`);
  }
  crear(elUsuario: GestionUsuarios) {
    return this.http.post(`${environment.url_gateway}/usuarios`, elUsuario);
  }

  editar(id:string,elUsuario: GestionUsuarios) {
    return this.http.put(`${environment.url_gateway}/usuarios/${id}`, elUsuario);
  }
}

