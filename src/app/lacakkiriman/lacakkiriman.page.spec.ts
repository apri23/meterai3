import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LacakkirimanPage } from './lacakkiriman.page';

describe('LacakkirimanPage', () => {
  let component: LacakkirimanPage;
  let fixture: ComponentFixture<LacakkirimanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LacakkirimanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LacakkirimanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
