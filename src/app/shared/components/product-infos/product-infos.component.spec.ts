import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfosComponent } from './product-infos.component';

describe('ProductInfosComponent', () => {
  let component: ProductInfosComponent;
  let fixture: ComponentFixture<ProductInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
