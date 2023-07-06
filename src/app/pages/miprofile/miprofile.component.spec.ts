import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiprofileComponent } from './miprofile.component';

describe('MiprofileComponent', () => {
  let component: MiprofileComponent;
  let fixture: ComponentFixture<MiprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
