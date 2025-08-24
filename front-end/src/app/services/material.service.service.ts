import { inject, Injectable } from '@angular/core';
import { MaterialBase, MaterialRequest, MaterialResponse, MaterialResponseAll } from '../models/material.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialServiceService {
  private http = inject(HttpClient)

  getAllMaterials(): Observable<MaterialResponseAll> {
    return this.http.get<MaterialResponseAll>(`${environment.apiUrl}/materials`);
  }

  createMaterial(material: MaterialRequest): Observable<MaterialResponse> {
    return this.http.post<MaterialResponse>(`${environment.apiUrl}/materials`, material);
  }

}
