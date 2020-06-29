import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDisplayProductsComponent } from './admin-display-products.component';

describe('AdminDisplayProductsComponent', () => {
  let component: AdminDisplayProductsComponent;
  let fixture: ComponentFixture<AdminDisplayProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDisplayProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDisplayProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
