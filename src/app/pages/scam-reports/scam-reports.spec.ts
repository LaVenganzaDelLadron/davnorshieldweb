import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScamReports } from './scam-reports';

describe('ScamReports', () => {
  let component: ScamReports;
  let fixture: ComponentFixture<ScamReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScamReports],
    }).compileComponents();

    fixture = TestBed.createComponent(ScamReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
