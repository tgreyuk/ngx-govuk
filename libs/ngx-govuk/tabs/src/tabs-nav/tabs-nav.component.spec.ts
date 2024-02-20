import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsNavComponent } from './tabs-nav.component';

describe('TabsNavComponent', () => {
  let component: TabsNavComponent;
  let fixture: ComponentFixture<TabsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
