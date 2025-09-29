import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acompanhamento } from './acompanhamento';

describe('Acompanhamento', () => {
  let component: Acompanhamento;
  let fixture: ComponentFixture<Acompanhamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Acompanhamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Acompanhamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
