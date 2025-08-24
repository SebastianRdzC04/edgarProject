import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesFormComponent } from './quotes-form.component';

describe('QuotesFormComponent', () => {
  let component: QuotesFormComponent;
  let fixture: ComponentFixture<QuotesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
