import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesctentangPage } from './desctentang.page';

describe('DesctentangPage', () => {
  let component: DesctentangPage;
  let fixture: ComponentFixture<DesctentangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesctentangPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesctentangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
