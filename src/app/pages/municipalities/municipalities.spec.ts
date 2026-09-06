import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Municipalities } from './municipalities';

describe('Municipalities', () => {
  let component: Municipalities;
  let fixture: ComponentFixture<Municipalities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Municipalities],
    }).compileComponents();

    fixture = TestBed.createComponent(Municipalities);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
