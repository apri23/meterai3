import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesctransaksiPage } from './desctransaksi.page';

describe('DesctransaksiPage', () => {
  let component: DesctransaksiPage;
  let fixture: ComponentFixture<DesctransaksiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesctransaksiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesctransaksiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
