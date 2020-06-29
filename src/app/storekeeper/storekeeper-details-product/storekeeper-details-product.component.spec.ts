import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorekeeperDetailsProductComponent } from './storekeeper-details-product.component';

describe('StorekeeperDetailsProductComponent', () => {
  let component: StorekeeperDetailsProductComponent;
  let fixture: ComponentFixture<StorekeeperDetailsProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorekeeperDetailsProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorekeeperDetailsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
