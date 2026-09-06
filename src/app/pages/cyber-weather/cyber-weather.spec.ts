import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CyberWeather } from './cyber-weather';

describe('CyberWeather', () => {
  let component: CyberWeather;
  let fixture: ComponentFixture<CyberWeather>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberWeather],
    }).compileComponents();

    fixture = TestBed.createComponent(CyberWeather);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
