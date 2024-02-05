import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCountComponent } from './character-count.component';

describe('CharacterCountComponent', () => {
  let component: CharacterCountComponent;
  let fixture: ComponentFixture<CharacterCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
