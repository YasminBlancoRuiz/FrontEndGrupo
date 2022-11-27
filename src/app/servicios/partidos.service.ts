import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Partidos } from '../modelos/partidos.model';
import { Usuario } from '../modelos/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private http: HttpClient) { }
  
  listar(): Observable<Partidos[]> {
    console.log("Test");
      return this.http.get<Partidos[]>(`${environment.url_gateway}/partido`);  

  }
  eliminar(id:string){
    return this.http.delete<Partidos>(`${environment.url_gateway}/partido/${id}`,
);
  }
  getPartido(id: string): Observable<Partidos> {
    return this.http.get<Partidos>(`${environment.url_gateway}/partido/${id}`);
  }
  crear(elPartido: Partidos) {
    return this.http.post(`${environment.url_gateway}/partido`, elPartido);
  }

  editar(id:string,elPartido: Partidos) {
    return this.http.put(`${environment.url_gateway}/partido/${id}`, elPartido);
  }
}

