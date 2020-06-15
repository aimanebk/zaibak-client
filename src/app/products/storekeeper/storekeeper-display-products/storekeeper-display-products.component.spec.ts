import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorekeeperDisplayProductsComponent } from './storekeeper-display-products.component';

describe('StorekeeperDisplayProductsComponent', () => {
  let component: StorekeeperDisplayProductsComponent;
  let fixture: ComponentFixture<StorekeeperDisplayProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorekeeperDisplayProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorekeeperDisplayProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
