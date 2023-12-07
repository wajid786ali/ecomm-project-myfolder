import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSellerProductComponent } from './update-seller-product.component';

describe('UpdateSellerProductComponent', () => {
  let component: UpdateSellerProductComponent;
  let fixture: ComponentFixture<UpdateSellerProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSellerProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSellerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
