import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CompanyProfileComponent } from './company-profile.component';

describe('CompanyProfileComponent', () => {
  let component: CompanyProfileComponent;
  let fixture: ComponentFixture<CompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should be created', () => {
    expect(component).toBeTruthy();
  }); */
});
