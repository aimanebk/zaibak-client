import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductValueComponent } from './product-value.component';

describe('ProductValueComponent', () => {
  let component: ProductValueComponent;
  let fixture: ComponentFixture<ProductValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
