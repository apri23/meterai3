import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntrusksipembayaranPage } from './intrusksipembayaran.page';

describe('IntrusksipembayaranPage', () => {
  let component: IntrusksipembayaranPage;
  let fixture: ComponentFixture<IntrusksipembayaranPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrusksipembayaranPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntrusksipembayaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
