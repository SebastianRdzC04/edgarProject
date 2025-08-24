import { Component, inject, OnInit } from '@angular/core';
import { MaterialResponseAll, MaterialBase } from '../../../models/material.model';
import { MaterialServiceService } from '../../../services/material.service.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-materials-table',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './materials-table.component.html',
  styleUrl: './materials-table.component.css'
})
export class MaterialsTableComponent implements OnInit {
  
  materialsResponse$!: Observable<MaterialResponseAll>;
  
  private materialService = inject(MaterialServiceService);
  
  ngOnInit(): void {
    this.materialsResponse$ = this.materialService.getAllMaterials();
  }
}
