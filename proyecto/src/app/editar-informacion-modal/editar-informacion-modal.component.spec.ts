import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInformacionModalComponent } from './editar-informacion-modal.component';

describe('EditarInformacionModalComponent', () => {
  let component: EditarInformacionModalComponent;
  let fixture: ComponentFixture<EditarInformacionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInformacionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInformacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
