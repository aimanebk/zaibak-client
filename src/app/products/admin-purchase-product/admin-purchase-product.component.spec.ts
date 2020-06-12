import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPurchaseProductComponent } from './admin-purchase-product.component';

describe('AdminPurchaseProductComponent', () => {
  let component: AdminPurchaseProductComponent;
  let fixture: ComponentFixture<AdminPurchaseProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPurchaseProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPurchaseProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
