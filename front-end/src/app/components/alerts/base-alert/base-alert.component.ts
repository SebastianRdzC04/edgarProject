import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-alert.component.html',
  styleUrls: ['./base-alert.component.css']
})
export class BaseAlertComponent {
  @Input() title = '';
  @Input() text = '';
  // input tipo enum que solo se pueda enviar success alert danger
  @Input() type: 'success' | 'alert' | 'danger' = 'success';
}
