import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteUpdateFormComponent } from './quote-update-form.component';

describe('QuoteUpdateFormComponent', () => {
  let component: QuoteUpdateFormComponent;
  let fixture: ComponentFixture<QuoteUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
