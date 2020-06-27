import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicacionComponent} from './publicacion.component';
import {RouterModule} from '@angular/router';

describe('PublicacionComponent', () => {
  let component: PublicacionComponent;
  let fixture: ComponentFixture<PublicacionComponent>;
  let app;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, RouterModule.forRoot([])],
      declarations: [PublicacionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionComponent);
    component = fixture.componentInstance;
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render app-wrapper', () => {
    expect(compiled.querySelector('img').textContent).toBeDefined();
  });
});
