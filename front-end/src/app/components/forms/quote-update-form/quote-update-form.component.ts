import { Component, inject, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { QuoteServiceService } from '../../../services/quote.service.service';
import { MaterialServiceService } from '../../../services/material.service.service';
import { QuoteBase } from '../../../models/quote.model';
import { MaterialBase, MaterialResponseAll } from '../../../models/material.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-quote-update-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quote-update-form.component.html',
  styleUrls: ['./quote-update-form.component.css']
})
export class QuoteUpdateFormComponent {
  quoteId = input("")

  private quoteService = inject(QuoteServiceService);
  private materialService = inject(MaterialServiceService);

  fullName = new FormControl('');
  phoneContact = new FormControl('');
  title = new FormControl('');
  text = new FormControl('');
  address = new FormControl('');

  selectedMaterials: string[] = [];
  materialsResponse!: Observable<MaterialBase[]>;
  materials!: MaterialBase[];

  ngOnInit() {
    // Obtener materiales para el select
    this.materialsResponse = this.materialService.getAllMaterials().pipe(
      map((res: MaterialResponseAll) => res.data.materials)
    );
    this.materialsResponse.pipe(take(1)).subscribe(materials => {
      this.materials = materials;
    });

    // Obtener la quote por id y setear los valores iniciales
    if (this.quoteId()) {
      this.quoteService.getQuote(this.quoteId()).pipe(take(1)).subscribe((res) => {
        const quote: QuoteBase = res.data.quote;
        this.fullName.setValue(quote.fullName);
        this.phoneContact.setValue(quote.phoneContact);
        this.title.setValue(quote.title);
        this.text.setValue(quote.text);
        this.address.setValue(quote.address);
        this.selectedMaterials = quote.materials ? quote.materials.map(m => m.id) : [];
      });
    }
  }

  addMaterial(materialId: string): void {
    if (materialId && !this.selectedMaterials.includes(materialId)) {
      this.selectedMaterials.push(materialId);
    }
  }

  removeMaterial(materialId: string): void {
    this.selectedMaterials = this.selectedMaterials.filter(id => id !== materialId);
  }

  isSelected(materialId: string): boolean {
    return this.selectedMaterials.includes(materialId);
  }

  getMaterialName(materialId: string): string {
    const material = this.materials?.find(m => m.id === materialId);
    return material ? material.name : 'Material desconocido';
  }

  // ...agrega aquí tu lógica de submit/update si lo necesitas...
}
