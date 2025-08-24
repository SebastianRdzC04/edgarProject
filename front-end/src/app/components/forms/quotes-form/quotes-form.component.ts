import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { QuoteCreate } from '../../../models/quote.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MaterialBase, MaterialResponseAll } from '../../../models/material.model';
import { MaterialServiceService } from '../../../services/material.service.service';
import { QuoteServiceService } from '../../../services/quote.service.service';

@Component({
  selector: 'app-quotes-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quotes-form.component.html',
  styleUrls: ['./quotes-form.component.css']
})
export class QuotesFormComponent {
  @Output() submitResult = new EventEmitter<{ type: 'success' | 'alert' | 'danger'; title: string; text: string }>();

  private materialService = inject(MaterialServiceService)
  private quoteService = inject(QuoteServiceService);

  fullName = new FormControl('');
  phoneContact = new FormControl('');
  title = new FormControl('');
  text = new FormControl('');
  address = new FormControl('');
  
  // Array para almacenar los IDs de los materiales seleccionados
  selectedMaterials: string[] = [];

  // ahora materialsResponse emite directamente el arreglo de MaterialBase[]
  materialsResponse!: Observable<MaterialBase[]>;

  materials!: MaterialBase[];

  constructor() {
    // mapear la respuesta para quedarnos solo con el arreglo de materials
    this.materialsResponse = this.materialService.getAllMaterials().pipe(
      map((res: MaterialResponseAll) => res.data.materials)
    );

    // si quieres tener el arreglo en la propiedad materials (por ejemplo para usar fuera del template),
    // te suscribes una sola vez (take(1)) y asignas el arreglo limpio
    this.materialsResponse.pipe(take(1)).subscribe(materials => {
      this.materials = materials;
    });
  }

  onSubmit(): void {
    const quoteToCreate: QuoteCreate = {
      fullName: String(this.fullName.value || ''),
      phoneContact: String(this.phoneContact.value || ''),
      title: String(this.title.value || ''),
      text: String(this.text.value || ''),
      address: String(this.address.value || ''),
      materialsList: this.selectedMaterials.length ? [...this.selectedMaterials] : undefined
    };

    // limpiar formulario localmente
    this.fullName.setValue('');
    this.phoneContact.setValue('');
    this.title.setValue('');
    this.text.setValue('');
    this.address.setValue('');
    this.selectedMaterials = [];

    // Por ahora sólo verificamos el objeto creado
    console.log('Quote to create:', quoteToCreate);

    this.quoteService.createQuote(quoteToCreate).subscribe({
      next: (response) => {
        console.log('Quote created successfully:', response);
        // Emitir resultado al padre (IndexComponent) para que cierre modal y muestre toastr
        this.submitResult.emit({
          type: 'success',
          title: 'Cotización enviada',
          text: 'Tu cotización se ha enviado correctamente.'
        });
      },
      error: (error) => {
        console.error('Error creating quote:', error);
        // Emitir error al padre para mostrar toastr de error
        this.submitResult.emit({
          type: 'danger',
          title: 'Error',
          text: 'Ocurrió un error al enviar la cotización. Intenta nuevamente.'
        });
      }
    });
  }



  // Agregar un material seleccionado
  addMaterial(materialId: string): void {
    if (materialId && !this.selectedMaterials.includes(materialId)) {
      this.selectedMaterials.push(materialId);
    }
  }

  // Eliminar un material de la selección
  removeMaterial(materialId: string): void {
    this.selectedMaterials = this.selectedMaterials.filter(id => id !== materialId);
  }

  // Verificar si un material ya está seleccionado
  isSelected(materialId: string): boolean {
    return this.selectedMaterials.includes(materialId);
  }

  // Obtener el nombre de un material por su ID
  getMaterialName(materialId: string): string {
    const material = this.materials.find(m => m.id === materialId);
    return material ? material.name : 'Material desconocido';
  }

}
