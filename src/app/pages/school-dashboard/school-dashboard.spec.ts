import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolDashboard } from './school-dashboard';

describe('SchoolDashboard', () => {
  let component: SchoolDashboard;
  let fixture: ComponentFixture<SchoolDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
