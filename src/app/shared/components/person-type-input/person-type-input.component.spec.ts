import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTypeInputComponent } from './person-type-input.component';

describe('PersonTypeInputComponent', () => {
  let component: PersonTypeInputComponent;
  let fixture: ComponentFixture<PersonTypeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonTypeInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonTypeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
