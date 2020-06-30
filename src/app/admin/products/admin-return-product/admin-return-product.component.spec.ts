import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReturnProductComponent } from './admin-return-product.component';

describe('AdminReturnProductComponent', () => {
  let component: AdminReturnProductComponent;
  let fixture: ComponentFixture<AdminReturnProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReturnProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReturnProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
