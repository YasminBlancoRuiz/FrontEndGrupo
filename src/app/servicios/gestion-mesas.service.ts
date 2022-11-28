import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GestionMesas } from '../modelos/gestion-mesas.model';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class GestionMesasService {

  constructor(private http: HttpClient) { }
  
  listar(): Observable<GestionMesas[]> {
    console.log("Test");
      return this.http.get<GestionMesas[]>(`${environment.url_gateway}/mesa`);  

  }
  eliminar(id:string){
    return this.http.delete<GestionMesas>(`${environment.url_gateway}/mesa/${id}`,
);
  }
  getMesa(id: string): Observable<GestionMesas> {
    return this.http.get<GestionMesas>(`${environment.url_gateway}/mesa/${id}`);
  }
  crear(laMesa: GestionMesas) {
    return this.http.post(`${environment.url_gateway}/mesa`, laMesa);
  }

  editar(id:string,laMesa: GestionMesas) {
    return this.http.put(`${environment.url_gateway}/mesa/${id}`, laMesa);
  }
}

