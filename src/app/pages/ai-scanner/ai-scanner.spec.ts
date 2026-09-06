import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiScanner } from './ai-scanner';

describe('AiScanner', () => {
  let component: AiScanner;
  let fixture: ComponentFixture<AiScanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiScanner],
    }).compileComponents();

    fixture = TestBed.createComponent(AiScanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
