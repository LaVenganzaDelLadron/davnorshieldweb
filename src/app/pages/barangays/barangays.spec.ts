import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Barangays } from './barangays';

describe('Barangays', () => {
  let component: Barangays;
  let fixture: ComponentFixture<Barangays>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Barangays],
    }).compileComponents();

    fixture = TestBed.createComponent(Barangays);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
