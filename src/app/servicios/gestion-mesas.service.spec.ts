import { TestBed } from '@angular/core/testing';

import { GestionMesasService } from './gestion-mesas.service';

describe('GestionMesasService', () => {
  let service: GestionMesasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionMesasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
