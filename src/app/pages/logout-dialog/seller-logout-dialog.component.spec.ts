import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerLogoutDialogComponent } from './seller-logout-dialog.component';

describe('SellerLogoutDialogComponent', () => {
  let component: SellerLogoutDialogComponent;
  let fixture: ComponentFixture<SellerLogoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerLogoutDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerLogoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
